// import axios from "axios"
// import AddRecipeForm from "../components/add-recipe-form"
// import { Recipe } from "../types"
// import { useRecipesContext } from "../Context/recipesContext"
// import { useAuth } from "../hook/use-auth"

// export const AddRecipeModal = () => {

//     const { isAuthenticated, user } = useAuth()
//     const {  selectedRecipe, selectIngredient ,addRecipe,updateRecipe, } = useRecipesContext()
//     const handleAddRecipe = async (recipeData: Recipe) => {
//         if (!isAuthenticated || !user) return
//         addRecipe(recipeData, user.Id);
//     }
//     const handleUpdateRecipe = async (updatedRecipe: Recipe) => {
//         if (!isAuthenticated || !user) return
//         updateRecipe(updatedRecipe);
//     }

//     return (<>
//         {showAddRecipeForm && (
//             <AddRecipeForm
//                 recipe={selectedRecipe}
//                 ingredients={selectIngredient}
//                 onSubmit={selectedRecipe ? handleUpdateRecipe : handleAddRecipe}
//                 onClose={() => {
//                     setShowAddRecipeForm(false)
//                     setSelectedRecipe(null)
//                     setSelectedIngredient(null)
//                 }}
//             />
//         )}
//     </>)
// }