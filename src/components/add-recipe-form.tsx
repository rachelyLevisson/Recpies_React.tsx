"use client"
import { useEffect, useState } from "react"
import {
  Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, Box, IconButton, FormControl, InputLabel, Select, MenuItem, Typography, List, ListItem, ListItemText,
} from "@mui/material"
import { Close, Add } from "@mui/icons-material"
import { Recipe } from "../types"
import { useRecipesContext } from "../Context/recipesContext"
import { useLocation, useNavigate } from "react-router-dom"
import { useAuth } from "../hook/use-auth"
import { useForm, useFieldArray } from "react-hook-form"

export default function AddRecipeForm() {
  const navigate = useNavigate();
  const { categories, selectedRecipe, selectRecipe, addRecipe, updateRecipe } = useRecipesContext();
  const location = useLocation();
  const recipeNav : Recipe = location.state?.recipe;
  const isEditing = !!recipeNav;
  const { user } = useAuth();
  const [error, setError] = useState("");
  const { register } = useForm();


  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      Name: recipeNav?.Name || "",
      Description: recipeNav?.Description || "",
      Ingridents: recipeNav?.Ingridents || [{ Id: 0, Name: "", Count: "", Type: "" }],
      Instructions: recipeNav?.Instructions.map((instruction: any) => instruction.Name).join('\n') || "",
      Duration: recipeNav?.Duration || 30,
      Difficulty: recipeNav?.Difficulty || 1,
      Img: recipeNav?.Img || "/placeholder.svg?height=300&width=400",
      Categoryid: recipeNav?.Categoryid || 0
    }
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "Ingridents"
  });

useEffect(() => {
    if (isEditing && recipeNav) {
        recipeNav.Ingridents.forEach(ingredient => {
            append(ingredient);
            selectRecipe(recipeNav);
        });
    }
}, [isEditing, recipeNav, append]);

  const onSubmit = (data: any) => {
    const instructionsArray = data.Instructions.split('\n')
      .filter((line: any) => line.trim() !== '')
      .map((line: any) => ({ Name: line.trim() }));

    const newRecipe: Recipe = {
      Id: 0,
      Name: data.Name,
      UserId: user?.Id || 0,
      Categoryid: data.Categoryid,
      Img: data.Img,
      Duration: data.Duration,
      Difficulty: data.Difficulty,
      Description: data.Description,
      Ingridents: data.Ingridents,
      Instructions: instructionsArray.map((name: any, index: number) => ({ Id: index + 1, Name: name })),
      createdAt: new Date(Date.now()),
      updatedAt: new Date(Date.now())
    };

    try {
      if (isEditing && selectedRecipe) {
        updateRecipe(newRecipe);
      } else {
        addRecipe(newRecipe, user?.Id || 0);
      }
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <Dialog open={true} maxWidth="md" fullWidth dir="rtl">
      <DialogTitle>
        {isEditing ? "עריכת מתכון" : "הוספת מתכון חדש"}
        <IconButton
          aria-label="close"
          onClick={() => { navigate(-1) }}
          sx={{
            position: "absolute",
            left: 8,
            top: 8,
          }}
        >
          <Close />
        </IconButton>
      </DialogTitle>
      <DialogContent dividers>
        <form onSubmit={handleSubmit(onSubmit)} id="recipe-form">
          <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" }, gap: 2, mb: 3 }}>
            <TextField
              label="שם המתכון"
              fullWidth
              value={selectedRecipe?.Name}
              {...register("Name", { required: true })}
              error={!!errors.Name}
              helperText={errors.Name ? "שדה חובה" : ""}
            />
            <TextField
              label="תמונה (URL)"
              fullWidth
              {...register("Img")}
              value={selectedRecipe?.Img}
            />
          </Box>

          <TextField
            label="תיאור קצר"
            fullWidth
            {...register("Description", { required: true })}
            error={!!errors.Description}
            helperText={errors.Description ? "שדה חובה" : ""}
            sx={{ mb: 3 }}
          />

          <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" }, gap: 2, mb: 3 }}>
            <TextField
              label="זמן הכנה (דקות)"
              type="number"
              fullWidth
              InputProps={{ inputProps: { min: 1 } }}
              {...register("Duration", { required: true })}
              error={!!errors.Duration}
              helperText={errors.Duration ? "שדה חובה" : ""}
            />
            <FormControl fullWidth required>
              <InputLabel id="difficulty-label">רמת קושי</InputLabel>
              <Select
                labelId="difficulty-label"
                {...register("Difficulty")}
              >
                <MenuItem value={1}>קל</MenuItem>
                <MenuItem value={2}>בינוני</MenuItem>
                <MenuItem value={3}>קשה</MenuItem>
              </Select>
            </FormControl>
          </Box>

          <FormControl fullWidth required sx={{ mb: 3 }}>
            <InputLabel id="category-label">קטגוריה</InputLabel>
            <Select
              labelId="category-label"
              {...register("Categoryid")}
            >
              {categories?.map((category) => (
                <MenuItem key={category.Id} value={category.Id}>{category.Name}</MenuItem>
              ))}
            </Select>
          </FormControl>

          <Typography variant="h6" gutterBottom>
            מרכיבים
          </Typography>
          <List sx={{ mb: 3 }}>
            {fields.map((ingred, index) => (
              <ListItem key={ingred.id} disableGutters sx={{ px: 0 }}>
                <ListItemText
                  primary={
                    <Box display="flex" gap={2}>
                      <TextField
                        type="text"
                        label="כמות"
                        variant="outlined"
                        {...register(`Ingridents.${index}.Count`)}
                      />
                      <TextField
                        label="סוג"
                        variant="outlined"
                        {...register(`Ingridents.${index}.Type`, { required: true })}
                        // error={!!errors.Ingridents?.[index]?.Type}
                        error = {!!errors.Ingridents?.[index]?.Type}
                        helperText={errors.Ingridents?.[index]?.Type ? "שדה חובה" : ""}
                      />
                      <TextField
                        label="שם מוצר"
                        variant="outlined"
                        {...register(`Ingridents.${index}.Name`, { required: true })}
                        error={!!errors.Ingridents?.[index]?.Name}
                        helperText={errors.Ingridents?.[index]?.Name ? "שדה חובה" : ""}
                      />
                      {index > 0 && (
                        <IconButton onClick={() => remove(index)}>
                          <Close />
                        </IconButton>
                      )}
                    </Box>
                  }
                />
              </ListItem>
            ))}
          </List>
          <Button startIcon={<Add />} variant="outlined" size="small" onClick={() => append({ Id: 0, Name: "", Count: "", Type: "" })} sx={{ mb: 3 }}>
            הוסף מרכיב
          </Button>

          <TextField
            label="הוראות הכנה"
            multiline
            rows={6}
            fullWidth
            {...register("Instructions", { required: true })}
            error={!!errors.Instructions}
            helperText={errors.Instructions ? "שדה חובה" : ""}
            placeholder="כל הוראה בשורה חדשה..."
          />
        </form>
      </DialogContent>
      {error && (
        <Typography color="error" variant="body2" sx={{ mt: 2 }}>
          {error}
        </Typography>
      )}
      <DialogActions>
        <Button onClick={() => { navigate(-1) }}>ביטול</Button>
        <Button type="submit" form="recipe-form" variant="contained" color="primary">
          {isEditing ? "עדכן מתכון" : "הוסף מתכון"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
