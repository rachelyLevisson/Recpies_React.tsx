import { Restaurant, AccessTime } from "@mui/icons-material"
import { Dialog, DialogTitle, DialogContent, DialogContentText, Box, Chip, Typography, Paper, List, ListItem, ListItemText, DialogActions, Button } from "@mui/material"
import { Ingridents } from "../types";
import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";



 export const RecipeDetails = () => {
    const location = useLocation();
    const {recipe} = location.state || null
    const [open, setOpen] = useState(true);
    const navigate = useNavigate();

    const getDifficultyColor = (difficulty: number) => {
        switch (difficulty) {
            case 1:
                return "success"
            case 2:
                return "warning"
            case 3:
                return "error"
            default:
                return "default"
        }
    }
    return (<>

        <Dialog open={open} maxWidth="md" fullWidth scroll="paper" dir="rtl">
            <DialogTitle sx={{ pb: 1 }}>{recipe.Name}</DialogTitle>
            <DialogContent dividers>
                <DialogContentText sx={{ mb: 2 }}>{recipe.Description}</DialogContentText>

                <Box sx={{ display: "flex", gap: 1, mb: 3 }}>
                    <Chip
                        icon={<Restaurant fontSize="small" />}
                        label={recipe.Difficulty}
                        size="small"
                        color={getDifficultyColor(recipe.Difficulty) as "success" | "warning" | "error" | "default"}
                    />
                    <Chip icon={<AccessTime fontSize="small" />} label={`${recipe.Duration} דקות`} size="small" />
                </Box>

                <Box
                    component="img"
                    src={recipe.Img}
                    alt={recipe.Name}
                    sx={{
                        width: "100%",
                        height: 300,
                        objectFit: "cover",
                        borderRadius: 1,
                        mb: 3,
                    }}
                />

                <Typography variant="h6" gutterBottom>
                    מרכיבים:
                </Typography>
                <Paper variant="outlined" sx={{ mb: 3, p: 0 }}>
                    <List dense disablePadding>
                        {recipe.Ingridents.map((ingredient: Ingridents, index: number) => (
                            <ListItem key={index} divider={index < recipe.Ingridents.length - 1}>
                                <ListItemText primary={ingredient.Count + " " + ingredient.Type + " " + ingredient.Name} />
                            </ListItem>
                        ))}
                    </List>
                </Paper>

                <Typography variant="h6" gutterBottom>
                    הוראות הכנה:
                </Typography>
                <Typography variant="body1" paragraph sx={{ whiteSpace: "pre-line" }}>
                    {recipe.Instructions.map((instruction:any, index: number) => `${index + 1}. ${instruction.Name}\n`).join("")}
                </Typography>
            </DialogContent>
            <DialogActions>
                <Button onClick={() => {
                    setOpen(false)
                    navigate(-1)
                    }}>סגור</Button>
            </DialogActions>
        </Dialog>

    </>)
}