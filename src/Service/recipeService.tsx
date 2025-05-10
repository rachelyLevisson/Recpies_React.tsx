import axios from "axios"
import type { Recipe, Category } from "../types"

const API_URL = "http://localhost:8080/api"

const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
})

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const errorMessage = error.response?.data?.message || "אירעה שגיאה בתקשורת עם השרת"
    console.error("API Error:", errorMessage)
    return Promise.reject(new Error(errorMessage))
  }
)

export const recipeService = {
  getAllRecipes: async (): Promise<Recipe[]> => {
    try {
      const response = await api.get<Recipe[]>("/recipe")
      return response.data
    } catch (error) {
      throw new Error("לא ניתן לטעון את המתכונים")
    }
  },

  getRecipeById: async (id: number): Promise<Recipe> => {
    try {
      const response = await api.get<Recipe>(`/recipe/${id}`)
      return response.data
    } catch (error) {
      throw new Error("לא ניתן לטעון את המתכון המבוקש")
    }
  },

  getCategories: async (): Promise<Category[]> => {
    try {
      const response = await api.get<Category[]>("/category")
      return response.data
    } catch (error) {
      throw new Error("לא ניתן לטעון את הקטגוריות")
    }
  },

  addRecipe: async (recipe: Recipe): Promise<Recipe> => {
    try {
      const response = await api.post<Recipe>("/recipe", recipe)
      return response.data
    } catch (error) {
      throw new Error("לא ניתן להוסיף את המתכון. ייתכן שהמתכון כבר קיים במאגר")
    }
  },

  updateRecipe: async (recipe: Recipe): Promise<Recipe> => {
    try {
      const response = await api.post<Recipe>("/recipe/edit", recipe)
      return response.data
    } catch (error) {
      throw new Error("לא ניתן לעדכן את המתכון")
    }
  },

  deleteRecipe: async (id: number): Promise<void> => {
    try {
      await api.post(`/recipe/delete/${id}`)
    } catch (error) {
      throw new Error("לא ניתן למחוק את המתכון")
    }
  }
}