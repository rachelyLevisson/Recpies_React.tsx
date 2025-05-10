// "use client"
// import type React from "react"
// import { useEffect, useState } from "react"
// import {
//   Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, Box, IconButton, FormControl, InputLabel, Select, MenuItem, Typography, List, ListItem, ListItemText,
// } from "@mui/material"
// import { Close, Add } from "@mui/icons-material"
// import { Ingridents, Recipe } from "../types"
// import { useRecipesContext } from "../Context/recipesContext"
// import { useLocation, useNavigate } from "react-router-dom"
// import { useAuth } from "../hook/use-auth"

// export default function AddRecipeForm() {

//   const navigate = useNavigate();
//   const { categories, selectedRecipe, selectRecipe,selectedIngredient, addRecipe, updateRecipe } = useRecipesContext();

//   const location = useLocation();
//   const recipeNav = location.state?.recipe;
//   const isEditing = !!recipeNav
// console.log("selectRecipe",selectRecipe);
// console.log("selectedRecipe",selectedRecipe);

//   const { user } = useAuth();
//   const [error, setError] = useState("")
//   const [formData, setFormData] = useState({
//     Name: recipeNav?.Name || "",
//     Description: recipeNav?.Description || "",
//     Ingridents: recipeNav?.Ingridents.map((ingrident: any) => { ingrident.Name, ingrident.Count, ingrident.Type }) || [],
//     Instructions: recipeNav?.Instructions.map((instruction: any) => instruction.Name) || [],
//     Duration: recipeNav?.Duration || 30,
//     Difficulty: recipeNav?.Difficulty || 1,
//     Img: recipeNav?.Img || "/placeholder.svg?height=300&width=400",
//     Categoryid: recipeNav?.Categoryid || 0
//   })

//   const [ingridentsData, setIngridentsData] = useState<Ingridents[]>([{
//     Id: selectedIngredient?.Id || 0,
//     Name: selectedIngredient?.Name || "",
//     Count: selectedIngredient?.Count || "",
//     Type: selectedIngredient?.Type || ""
//   }]);

//   const [instructions, setInstructions] = useState<string>("");

//   useEffect(()=>{
//     if(recipeNav)
//       selectRecipe(recipeNav)
//   },[recipeNav])

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault()
//     // Validate form
//     if (
//       !formData.Name ||
//       !formData.Description ||
//       !instructions ||
//       ingridentsData.some((ing) => !ing.Name || !ing.Type)
//     ) {
//       return
//     }

//     // Create instructions array properly
//     const instructionsArray = instructions.split('\n')
//       .filter(line => line.trim() !== '')
//       .map(line => ({ Name: line.trim() }));

//     const newRecpie: Recipe = {
//       Id: 0,
//       Name: formData.Name,
//       UserId: user?.Id || 0,
//       Categoryid: formData.Categoryid,
//       Img: formData.Img,
//       Duration: formData.Duration,
//       Difficulty: formData.Difficulty,
//       Description: formData.Description,
//       Ingridents: [...ingridentsData],
//       Instructions: instructionsArray.map((name: any, index: number) => ({ Id: index + 1, Name: name })),
//       createdAt: new Date(Date.now()),
//       updatedAt: new Date(Date.now())
//     }

//     try {
//       // Submit the data
//       if (isEditing && selectedRecipe) {
//         updateRecipe({
//           // ...selectedRecipe,
//           ...newRecpie
//         })
//       } else {
//         addRecipe(
//           { ...newRecpie },
//           (user?.Id || 0))
//       }
//     }
//     catch (err: any) {
//       setError(err.message)
//     }
//   }

//   const handleIngredientChange = (index: number, key: string, value: any) => {
//     const newIngredients = [...ingridentsData];
//     newIngredients[index] = { ...newIngredients[index], [key]: value };
//     setIngridentsData(newIngredients);
//   };

//   const removeIngredient = (index: number) => {
//     const newIngredients = [...ingridentsData]
//     newIngredients.splice(index, 1)
//     setIngridentsData(newIngredients)
//   }

//   const addIngredient = () => {
//     setIngridentsData([...ingridentsData, { Id: 0, Name: "", Count: "", Type: "" }]);
//   };

//   // Convert Instructions to string for textarea on component mount
//   useEffect(() => {
//     if (selectedRecipe?.Instructions) {
//       const instructionsText = selectedRecipe.Instructions
//         .map(instruction => instruction.Name)
//         .join('\n');
//       setInstructions(instructionsText);
//     }
//   }, [selectedRecipe]);

//   return (
//     <Dialog open={true} maxWidth="md" fullWidth dir="rtl">
//       <DialogTitle>
//         {isEditing ? "עריכת מתכון" : "הוספת מתכון חדש"}
//         <IconButton
//           aria-label="close"
//           onClick={() => { navigate(-1) }}
//           sx={{
//             position: "absolute",
//             left: 8,
//             top: 8,
//           }}
//         >
//           <Close />
//         </IconButton>
//       </DialogTitle>
//       <DialogContent dividers>
//         <form onSubmit={handleSubmit} id="recipe-form">
//           <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" }, gap: 2, mb: 3 }}>
//             <TextField
//               label="שם המתכון"
//               fullWidth
//               value={formData.Name}
//               onChange={(e) => setFormData({ ...formData, Name: e.target.value })}
//               required
//             />
//             <TextField
//               label="תמונה (URL)"
//               fullWidth
//               value={formData.Img}
//               onChange={(e) => setFormData({ ...formData, Img: e.target.value })}
//             />
//           </Box>

//           <TextField
//             label="תיאור קצר"
//             fullWidth
//             value={formData.Description}
//             onChange={(e) => setFormData({ ...formData, Description: e.target.value })}
//             required
//             sx={{ mb: 3 }}
//           />

//           <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" }, gap: 2, mb: 3 }}>
//             <TextField
//               label="זמן הכנה (דקות)"
//               type="number"
//               fullWidth
//               InputProps={{ inputProps: { min: 1 } }}
//               value={formData.Duration}
//               onChange={(e) => setFormData({ ...formData, Duration: Number.parseInt(e.target.value) || 0 })}
//               required
//             />
//             <FormControl fullWidth required>
//               <InputLabel id="difficulty-label">רמת קושי</InputLabel>
//               <Select
//                 labelId="difficulty-label"
//                 value={formData.Difficulty}
//                 label="רמת קושי"
//                 onChange={(e) => setFormData({ ...formData, Difficulty: Number(e.target.value) })}
//               >
//                 <MenuItem value={1} >קל</MenuItem>
//                 <MenuItem value={2}>בינוני</MenuItem>
//                 <MenuItem value={2}>קשה</MenuItem>
//               </Select>
//             </FormControl>
//           </Box>

//           <FormControl fullWidth required sx={{ mb: 3 }}>
//             <InputLabel id="category-label">קטגוריה</InputLabel>
//             <Select
//               labelId="category-label"
//               label="קטגוריה"
//               name="CategoryId"
//               value={formData.Categoryid}
//               onChange={(e) => setFormData({ ...formData, Categoryid: Number(e.target.value) })}
//             >
//               {categories?.map((category) => (
//                 <MenuItem key={category.Id} value={category.Id}>{category.Name}</MenuItem>
//               ))}
//             </Select>
//           </FormControl>

//           <Typography variant="h6" gutterBottom>
//             מרכיבים
//           </Typography>
//           <List sx={{ mb: 3 }}>
//             {ingridentsData.map((ingred, index) => (
//               <ListItem key={index} disableGutters sx={{ px: 0 }}>
//                 <ListItemText
//                   primary={
//                     <Box display="flex" gap={2}>
//                       <TextField
//                         type="text"
//                         name="Count"
//                         label="כמות"
//                         variant="outlined"
//                         value={ingred.Count}
//                         onChange={(e) => handleIngredientChange(index, "Count", e.target.value)}
//                       />
//                       <TextField
//                         name="Type"
//                         label="סוג"
//                         variant="outlined"
//                         value={ingred.Type}
//                         onChange={(e) => handleIngredientChange(index, "Type", e.target.value)}
//                         required
//                       />
//                       <TextField
//                         name="Name"
//                         label="שם מוצר"
//                         variant="outlined"
//                         value={ingred.Name}
//                         onChange={(e) => handleIngredientChange(index, "Name", e.target.value)}
//                         required
//                       />
//                       {index > 0 && (
//                         <IconButton onClick={() => removeIngredient(index)}>
//                           <Close />
//                         </IconButton>
//                       )}
//                     </Box>
//                   }
//                 />
//               </ListItem>
//             ))}
//           </List>
//           <Button startIcon={<Add />} variant="outlined" size="small" onClick={addIngredient} sx={{ mb: 3 }}>
//             הוסף מרכיב
//           </Button>

//           <TextField
//             label="הוראות הכנה"
//             multiline
//             rows={6}
//             fullWidth
//             value={instructions}
//             onChange={(e) => setInstructions(e.target.value)}
//             placeholder="כל הוראה בשורה חדשה..."
//             required
//             helperText="כתוב כל הוראה בשורה נפרדת"
//           />
//         </form>
//       </DialogContent>
//       {error && (
//         <Typography color="error" variant="body2" sx={{ mt: 2 }}>
//           {error}
//         </Typography>
//       )}
//       <DialogActions>
//         <Button onClick={() => { navigate(-1) }}>ביטול</Button>
//         <Button type="submit" form="recipe-form" variant="contained" color="primary">
//           {isEditing ? "עדכן מתכון" : "הוסף מתכון"}
//         </Button>
//       </DialogActions>
//     </Dialog>
//   )
// }
