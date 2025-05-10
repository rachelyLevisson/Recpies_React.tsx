import React, { createContext, useContext, useState, useEffect } from "react"
import type { Recipe, Category, Ingridents } from "../types"
import { recipeService } from "../Service/recipeService"

interface RecipesContextType {
  recipes: Recipe[]
  filteredRecipes: Recipe[]
  categories: Category[]
  searchQuery: string
  selectedCategory: number
  activeTab: number
  loading: boolean
  error: string | null
  selectedRecipe: Recipe | null
  selectedIngredient: Ingridents | null
  setSearchQuery: (query: string) => void
  setSelectedCategory: (categoryId: number) => void
  setActiveTab: (tab: number) => void
  addRecipe: (recipe: Recipe, userId: number) => Promise<{ success: boolean; error?: string }>
  updateRecipe: (recipe: Recipe) => Promise<{ success: boolean; error?: string }>
  deleteRecipe: (recipeId: number) => Promise<{ success: boolean; error?: string }>
  selectRecipe: (recipe: Recipe | null) => void
  selectIngredient: (ingredient: Ingridents | null) => void
}

const RecipesContext = createContext<RecipesContextType | undefined>(undefined)

export function RecipesProvider({ children, userId }: { children: React.ReactNode; userId?: number }) {
  const [recipes, setRecipes] = useState<Recipe[]>([])
  const [filteredRecipes, setFilteredRecipes] = useState<Recipe[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState(0)
  const [activeTab, setActiveTab] = useState(0)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null)
  const [selectedIngredient, setSelectedIngredient] = useState<Ingridents | null>(null)

  useEffect(() => {
    const fetchRecipes = async () => {
      setLoading(true)
      try {
        const data = await recipeService.getAllRecipes()
        setRecipes(data)
        setFilteredRecipes(data)
        setError(null)
      } catch (err: any) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchRecipes()
  }, [])

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await recipeService.getCategories()
        setCategories(data)
        setError(null)
      } catch (err: any) {
        setError(err.message)
      }
    }

    fetchCategories()
  }, [])

  useEffect(() => {
    let result = [...recipes]

    if (searchQuery) {
      result = result.filter(
        (recipe) =>
          recipe.Name.includes(searchQuery) ||
          recipe.Description.includes(searchQuery) ||
          recipe.Ingridents.some(
            (ing) =>
              ing.Name.includes(searchQuery) || ing.Count.includes(searchQuery) || ing.Type.includes(searchQuery),
          ),
      )
    }

    if (activeTab === 1 && userId) {
      result = result.filter((recipe) => recipe.UserId === userId)
    }

    if (selectedCategory) {
      result = result.filter((recipe) => recipe.Categoryid === selectedCategory)
    }

    setFilteredRecipes(result)
  }, [recipes, searchQuery, selectedCategory, activeTab, userId])

  const addRecipe = async (recipeData: Recipe, userId: number) => {
    try {
      const newRecipe = {
        ...recipeData,
        UserId: userId
      }

      const savedRecipe = await recipeService.addRecipe(newRecipe)
      setRecipes([...recipes, savedRecipe])
      return { success: true }
    } catch (err: any) {
      setError(err.message)
      return { success: false, error: err.message }
    }
  }

  const updateRecipe = async (updatedRecipe: Recipe) => {
    try {
      await recipeService.updateRecipe(updatedRecipe)
      const updatedRecipes = recipes.map((recipe) =>
        recipe.Id === updatedRecipe.Id ? updatedRecipe : recipe
      )
      setRecipes(updatedRecipes)
      return { success: true }
    } catch (err: any) {
      setError(err.message)
      return { success: false, error: err.message }
    }
  }

  const deleteRecipe = async (recipeId: number) => {
    try {
      await recipeService.deleteRecipe(recipeId)
      setRecipes(recipes.filter((recipe) => recipe.Id !== recipeId))
      return { success: true }
    } catch (err: any) {
      setError(err.message)
      return { success: false, error: err.message }
    }
  }

  const selectRecipe = (recipe: Recipe | null) => {
    setSelectedRecipe(recipe)
  }

  const selectIngredient = (ingredient: Ingridents | null) => {
    setSelectedIngredient(ingredient)
  }

  const value = {
    recipes: filteredRecipes,
    filteredRecipes,
    categories,
    searchQuery,
    selectedCategory,
    activeTab,
    loading,
    error,
    selectedRecipe,
    selectedIngredient,
    setSearchQuery,
    setSelectedCategory,
    setActiveTab,
    addRecipe,
    updateRecipe,
    deleteRecipe,
    selectRecipe,
    selectIngredient
  }

  return <RecipesContext.Provider value={value}>{children}</RecipesContext.Provider>
}

export function useRecipesContext() {
  const context = useContext(RecipesContext)
  if (context === undefined) {
    throw new Error("useRecipesContext must be used within a RecipesProvider")
  }
  return context
}