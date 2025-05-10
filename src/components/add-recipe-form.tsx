"use client"
import { useEffect } from "react"
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Box,
  IconButton,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Typography,
  List,
  ListItem,
  ListItemText,
} from "@mui/material"
import { Close, Add } from "@mui/icons-material"
import { useForm, useFieldArray, Controller } from "react-hook-form"
import type { Ingridents, Instructions, Recipe } from "../types"
import { useRecipesContext } from "../Context/recipesContext"
import { useLocation, useNavigate } from "react-router-dom"
import { useAuth } from "../hook/use-auth"

export default function AddRecipeForm() {
  const navigate = useNavigate()
  const { categories, selectedRecipe,selectRecipe, addRecipe, updateRecipe } = useRecipesContext()
  const { user } = useAuth()
  

  const loc = useLocation();
  const isEditing = loc.state?.recipe ? true : false;


  useEffect(() => {
    selectRecipe(loc.state?.recipe)
  }, [isEditing, selectRecipe])

 
  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<{
    Name: string
    Description: string
    Ingridents: Ingridents[]
    Instructions: Instructions[]
    Duration: number
    Difficulty: number
    Img: string
    Categoryid: number
  }>({
    defaultValues: {
      Name: "",
      Description: "",
      Ingridents: [{ Id: 0, Name: "", Count: "", Type: "" }],
      Instructions: [{ Id: 0, Name: "" }],
      Duration: 30,
      Difficulty: 1,
      Img: "/placeholder.svg?height=300&width=400",
      Categoryid: 0,
    },
  })


  const { fields, append, remove } = useFieldArray({
    control,
    name: "Ingridents",
  })


  useEffect(() => {
    if (selectedRecipe) {
      setValue("Name", selectedRecipe.Name)
      setValue("Description", selectedRecipe.Description)
      setValue("Duration", selectedRecipe.Duration)
      setValue("Difficulty", selectedRecipe.Difficulty)
      setValue("Img", selectedRecipe.Img)
      setValue("Categoryid", selectedRecipe.Categoryid.valueOf())

      if (selectedRecipe.Ingridents && selectedRecipe.Ingridents.length > 0) {
        const validIngredients = selectedRecipe.Ingridents.filter((ing) => ing && typeof ing === "object")

        if (validIngredients.length > 0) {
          setValue("Ingridents", validIngredients)
        } else {
          setValue("Ingridents", [{ Id: 0, Name: "", Count: "", Type: "" }])
        }
      }
        setValue("Instructions", selectedRecipe.Instructions)
    } else {
      setValue("Name", "")
      setValue("Description", "")
      setValue("Ingridents", [{ Id: 0, Name: "", Count: "", Type: "" }])
      setValue("Instructions", [{ Id: 0, Name: "" }])
      setValue("Duration", 30)
      setValue("Difficulty", 1)
      setValue("Img", "/placeholder.svg?height=300&width=400")
      setValue("Categoryid", 0)
    }
  }, [selectedRecipe, setValue])

  const onSubmit = (data: any) => {
    try {
      const instructionsArray = data.Instructions.split("\n")
        .filter((line: string) => line.trim() !== "")
        .map((line: string, index: number) => ({ Id: index + 1, Name: line.trim() }))

      const newRecipe: Recipe = {
        Id: isEditing ? selectedRecipe?.Id || 0 : 0,
        Name: data.Name,
        UserId: user?.Id || 0,
        Categoryid: data.Categoryid,
        Img: data.Img,
        Duration: data.Duration,
        Difficulty: data.Difficulty,
        Description: data.Description,
        Ingridents: data.Ingridents,
        Instructions: instructionsArray,
        createdAt: isEditing ? data.createdAt : new Date(Date.now()),
        updatedAt: new Date(Date.now()),
      }


      if (isEditing && selectedRecipe) {
        updateRecipe(newRecipe)
      } else {
        addRecipe(newRecipe, user?.Id || 0)
      }

      navigate(-1)
    } catch (err: any) {
      console.error(err.message)
      console.error("Error details:", err)
    }
  }

  return (
    <Dialog open={true} maxWidth="md" fullWidth dir="rtl">
      <DialogTitle>
        {isEditing ? "עריכת מתכון" : "הוספת מתכון חדש"}
        <IconButton
          aria-label="close"
          onClick={() => {
            navigate(-1)
          }}
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
        <form id="recipe-form" onSubmit={handleSubmit(onSubmit)}>
          <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" }, gap: 2, mb: 3 }}>
            <Controller
              name="Name"
              control={control}
              rules={{ required: "שם המתכון נדרש" }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="שם המתכון"
                  fullWidth
                  required
                  error={!!errors.Name}
                  helperText={errors.Name?.message}
                />
              )}
            />
            <Controller
              name="Img"
              control={control}
              render={({ field }) => <TextField {...field} label="תמונה (URL)" fullWidth />}
            />
          </Box>

          <Controller
            name="Description"
            control={control}
            rules={{ required: "תיאור קצר נדרש" }}
            render={({ field }) => (
              <TextField
                {...field}
                label="תיאור קצר"
                fullWidth
                required
                sx={{ mb: 3 }}
                error={!!errors.Description}
                helperText={errors.Description?.message}
              />
            )}
          />

          <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" }, gap: 2, mb: 3 }}>
            <Controller
              name="Duration"
              control={control}
              rules={{ required: "זמן הכנה נדרש", min: { value: 1, message: "זמן הכנה חייב להיות לפחות 1 דקה" } }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="זמן הכנה (דקות)"
                  type="number"
                  fullWidth
                  InputProps={{ inputProps: { min: 1 } }}
                  required
                  error={!!errors.Duration}
                  helperText={errors.Duration?.message}
                />
              )}
            />
            <Controller
              name="Difficulty"
              control={control}
              rules={{ required: "רמת קושי נדרשת" }}
              render={({ field }) => (
                <FormControl fullWidth required error={!!errors.Difficulty}>
                  <InputLabel id="difficulty-label">רמת קושי</InputLabel>
                  <Select {...field} labelId="difficulty-label" label="רמת קושי">
                    <MenuItem value={1}>קל</MenuItem>
                    <MenuItem value={2}>בינוני</MenuItem>
                    <MenuItem value={3}>קשה</MenuItem>
                  </Select>
                </FormControl>
              )}
            />
          </Box>

          <Controller
            name="Categoryid"
            control={control}
            rules={{ required: "קטגוריה נדרשת" }}
            render={({ field }) => (
              <FormControl fullWidth required sx={{ mb: 3 }} error={!!errors.Categoryid}>
                <InputLabel id="category-label">קטגוריה</InputLabel>
                <Select {...field} labelId="category-label" label="קטגוריה">
                  {categories?.map((category) => (
                    <MenuItem key={category.Id} value={category.Id}>
                      {category.Name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            )}
          />

          <Typography variant="h6" gutterBottom>
            מרכיבים
          </Typography>
          <List sx={{ mb: 3 }}>
            {fields.map((field, index) => (
              <ListItem key={field.id} disableGutters sx={{ px: 0 }}>
                <ListItemText
                  primary={
                    <Box display="flex" gap={2}>
                      <Controller
                        name={`Ingridents.${index}.Count`}
                        control={control}
                        render={({ field }) => <TextField {...field} type="text" label="כמות" variant="outlined" />}
                      />
                      <Controller
                        name={`Ingridents.${index}.Type`}
                        control={control}
                        rules={{ required: "סוג נדרש" }}
                        render={({ field }) => (
                          <TextField
                            {...field}
                            label="סוג"
                            variant="outlined"
                            required
                            error={!!errors.Ingridents?.[index]?.Type}
                          />
                        )}
                      />
                      <Controller
                        name={`Ingridents.${index}.Name`}
                        control={control}
                        rules={{ required: "שם מוצר נדרש" }}
                        render={({ field }) => (
                          <TextField
                            {...field}
                            label="שם מוצר"
                            variant="outlined"
                            required
                            error={!!errors.Ingridents?.[index]?.Name}
                          />
                        )}
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
          <Button
            startIcon={<Add />}
            variant="outlined"
            size="small"
            onClick={() => append({ Id: 0, Name: "", Count: "", Type: "" })}
            sx={{ mb: 3 }}
          >
            הוסף מרכיב
          </Button>

          <Controller
            name="Instructions"
            control={control}
            rules={{ required: "הוראות הכנה נדרשות" }}
            render={({ field }) => (
              <TextField
                {...field}
                label="הוראות הכנה"
                multiline
                rows={6}
                fullWidth
                placeholder="כל הוראה בשורה חדשה..."
                required
                helperText="כתוב כל הוראה בשורה נפרדת"
                error={!!errors.Instructions}
              />
            )}
          />
        </form>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={() => {
            navigate(-1)
          }}
        >
          ביטול
        </Button>
        <Button type="submit" form="recipe-form" variant="contained" color="primary">
          {isEditing ? "עדכן מתכון" : "הוסף מתכון"}
        </Button>
      </DialogActions>
    </Dialog>
  )
}
