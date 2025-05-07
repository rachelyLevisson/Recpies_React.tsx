"use client"
import type React from "react"
import { useState, useEffect } from "react"
import {
    Container, Typography, Button, TextField, Box, Tabs, Tab, InputAdornment, FormControl, InputLabel, Select, MenuItem
} from "@mui/material"
import { Search, Add, FilterList, Logout } from "@mui/icons-material"
import AddRecipeForm from "../components/add-recipe-form"
import LoginForm from "../components/login-form"
import RecipeCard from "../components/recipe-card"
import type { Category, Ingridents, Recipe } from "../types"
import { useAuth } from "../hook/use-auth.tsx"
import axios from "axios"

export default function Home() {
    const { user, isAuthenticated, logout } = useAuth()
    const [recipes, setRecipes] = useState<Recipe[]>([])
    const [filteredRecipes, setFilteredRecipes] = useState<Recipe[]>([])
    const [searchQuery, setSearchQuery] = useState("")
    const [showLoginForm, setShowLoginForm] = useState(false)
    const [showAddRecipeForm, setShowAddRecipeForm] = useState(false)
    const [selectIngredient, setSelectedIngredient] = useState<Ingridents | null>(null)
    const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null)
    const [activeTab, setActiveTab] = useState(0)
    const [category, setCategory] = useState<Category[]>([])
    const [selectedCategory, setSelectedCategory] = useState(0)


    //All Recpies
    useEffect(() => {
        axios.get<Recipe[]>("http://localhost:8080/api/recipe/")
            .then((res) => {
                setRecipes(res.data)
                setFilteredRecipes(res.data)
            })
            .catch((err) => console.log(err, "error"))
    }, [])
    //get Category
    useEffect(() => {
        axios
            .get<Category[]>("http://localhost:8080/api/category")
            .then((res) => {
                setCategory(res.data)
            })
            .catch((err) => console.log(err, "error"))
    }, [])

    //Filter
    useEffect(() => {
        let result = [...recipes]

        // Filter by search query
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

        // Filter by tab
        if (activeTab === 1 && isAuthenticated && user) {
            result = result.filter((recipe) => recipe.UserId === user.Id)
        }

        //Filter to Category
        if (selectedCategory) {
            result = result.filter((recipe) => recipe.Categoryid === selectedCategory)
        }

        setFilteredRecipes(result)
    }, [recipes, searchQuery, selectedCategory, activeTab, isAuthenticated, user])

    const handleAddRecipe = async (recipeData: Recipe) => {
        if (!isAuthenticated || !user) return

        try {
            const newRecipe = {
                Name: recipeData.Name,
                UserId: user.Id,
                Categoryid: recipeData.Categoryid,
                Img: recipeData.Img,
                Duration: recipeData.Duration,
                Difficulty: recipeData.Difficulty,
                Description: recipeData.Description,
                Ingridents: recipeData.Ingridents,
                Instructions: recipeData.Instructions,
            }

            console.log("sending recipe to server:", newRecipe)

            const response = await axios.post("http://localhost:8080/api/recipe", newRecipe, {
                headers: {
                    "Content-Type": "application/json",
                },
            })

            const savedRecipe = response.data
            setRecipes([...recipes, savedRecipe])
            setShowAddRecipeForm(false)
        } catch (err) {
            console.error("Error adding recipe", err)
        }
    }

    const handleUpdateRecipe = async (updatedRecipe: Recipe) => {
        try {
            await axios.post(`http://localhost:8080/api/recipe/edit`, updatedRecipe, {
                headers: {
                    'Content-Type': 'application/json',
                }
            });

            const updatedRecipes = recipes.map((recipe) =>
                recipe.Id === updatedRecipe.Id ? updatedRecipe : recipe
            );

            setRecipes(updatedRecipes);
            setSelectedRecipe(null);
            setShowAddRecipeForm(false);
        } catch (err) {
            console.error("Error updating recipe", err);
        }
    }


    const handleDeleteRecipe = async (recipeId: number) => {
        try {
            const response = await axios.post(`http://localhost:8080/api/recipe/delete/${recipeId}`)
            console.log(response.data)
        } catch (error) {
            console.error("error! ", error)
        }
        setRecipes(recipes.filter((recipe) => recipe.Id !== recipeId))
    }

    const handleEditRecipe = (recipe: Recipe) => {
        setSelectedRecipe(recipe)
        setShowAddRecipeForm(true)
    }

    const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
        setActiveTab(newValue)
    }

    return (
        <Container maxWidth="lg" sx={{ py: 4, minHeight: "100vh" }} dir="rtl">
            <Box
                sx={{
                    display: "flex",
                    flexDirection: { xs: "column", md: "row" },
                    justifyContent: "space-between",
                    alignItems: { xs: "stretch", md: "center" },
                    mb: 4,
                }}
            >
                <Typography variant="h4" component="h1" fontWeight="bold" sx={{ mb: { xs: 2, md: 0 } }}>
                    ספר המתכונים
                </Typography>
                <Box>
                    {isAuthenticated ? (
                        <>
                            <Button
                                variant="contained"
                                color="primary"
                                startIcon={<Add />}
                                onClick={() => {
                                    setSelectedRecipe(null)
                                    // setSelectedIngredient(null)
                                    setShowAddRecipeForm(true)
                                }}
                            >
                                הוסף מתכון
                            </Button>
                            <Button variant="contained" color="secondary" endIcon={<Logout />} onClick={logout}>
                                התנתק
                            </Button>
                        </>
                    ) : (
                        <Button variant="contained" color="primary" onClick={() => setShowLoginForm(true)}>
                            התחבר
                        </Button>
                    )}
                </Box>
            </Box>

            <Box sx={{ display: "flex", flexDirection: { xs: "column", md: "row" }, gap: 2, mb: 3 }}>
                <TextField
                    fullWidth
                    placeholder="חפש מתכונים..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <Search />
                            </InputAdornment>
                        ),
                    }}
                    sx={{ flexGrow: 1 }}
                />
                <Box sx={{ display: "flex", alignItems: "center", minWidth: { xs: "100%", md: "200px" } }}>
                    <FilterList sx={{ mr: 1 }} />
                    <FormControl fullWidth size="small">
                        <InputLabel id="sort-by-label">סנן לפי קטגוריה</InputLabel>
                        <Select
                            labelId="sort-by-label"
                            value={selectedCategory}
                            label="סנן לפי קטגוריה"
                            onChange={(e) => setSelectedCategory(Number(e.target.value))}
                        >
                            {category.map((category) => (
                                <MenuItem key={category.Id} value={category.Id}>
                                    {category.Name}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Box>
            </Box>

            <Box sx={{ mb: 3 }}>
                <Tabs value={activeTab} onChange={handleTabChange} variant="fullWidth">
                    <Tab label="כל המתכונים" />
                    <Tab label="המתכונים שלי" disabled={!isAuthenticated} />
                </Tabs>
            </Box>

            {filteredRecipes.length > 0 ? (
                <Box sx={{ flexGrow: 1 }}>
                    <Box
                        sx={{
                            display: "grid",
                            gridTemplateColumns: { xs: "1fr", sm: "repeat(2, 1fr)", md: "repeat(3, 1fr)" },
                            gap: 3,
                        }}
                    >
                        {filteredRecipes.map((recipe) => (
                            <Box key={recipe.Id}>
                                <RecipeCard
                                    recipe={recipe}
                                    isOwner={isAuthenticated && user?.Id === recipe.UserId}
                                    onEdit={handleEditRecipe}
                                    onDelete={handleDeleteRecipe}
                                />
                            </Box>
                        ))}
                    </Box>
                </Box>
            ) : (
                <Box sx={{ textAlign: "center", py: 6 }}>
                    <Typography variant="h6" color="text.secondary">
                        לא נמצאו מתכונים
                    </Typography>
                    {activeTab === 1 && isAuthenticated && (
                        <Button
                            variant="outlined"
                            sx={{ mt: 2 }}
                            onClick={() => {
                                setSelectedRecipe(null)
                                setSelectedIngredient(null)
                                setShowAddRecipeForm(true)
                            }}
                        >
                            הוסף את המתכון הראשון שלך
                        </Button>
                    )}
                </Box>
            )}

            {showLoginForm && <LoginForm onClose={() => setShowLoginForm(false)} />}

            {showAddRecipeForm && (
                <AddRecipeForm
                    recipe={selectedRecipe}
                    ingredients={selectIngredient}
                    onSubmit={selectedRecipe ? handleUpdateRecipe : handleAddRecipe}
                    onClose={() => {
                        setShowAddRecipeForm(false)
                        setSelectedRecipe(null)
                        setSelectedIngredient(null)
                    }}
                />
            )}
        </Container>
    )
}
