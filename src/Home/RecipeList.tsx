import { Box, Typography, Button } from "@mui/material"
import RecipeCard from "../components/recipe-card"
import { useAuth } from "../hook/use-auth"
import {  Recipe } from "../types"
import { useRecipesContext } from "../Context/recipesContext"
import { useNavigate } from "react-router-dom"

export const RecipeList = () => {
    const { user, isAuthenticated } = useAuth()
    const { deleteRecipe ,activeTab,recipes} = useRecipesContext();
    // filteredRecipes = recipes נראה לי שסמו במתכונים את המתכונים המפולטרים.
    const nav = useNavigate();

    //All Recpies

    const handleEditRecipe = (recipe: Recipe) => {
        // setSelectedRecipe(recipe)
        // setShowAddRecipeForm(true)
        console.log(recipe);
        
    }

    const handleDeleteRecipe = async (recipeId: number) => {
        deleteRecipe(recipeId);
    }
    return (<>
        {recipes.length > 0 ? (
            <Box sx={{ flexGrow: 1 }}>
                <Box
                    sx={{
                        display:"grid",
                        gridTemplateColumns: { xs: "1fr", sm: "repeat(2, 1fr)", md: "repeat(3, 1fr)" },
                        gap: 3,
                    }}
                >
                    {recipes.map((recipe) => (
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
                        onClick={() => nav("/add-recipe")}
                    >
                        הוסף את המתכון הראשון שלך
                    </Button>
                )}
            </Box>
        )}

    </>)
}