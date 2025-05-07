"use client"

import type React from "react"
import { useState } from "react"
import {
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Typography,
  Button,
  Chip,
  Box,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  List,
  ListItem,
  ListItemText,
  Paper,
} from "@mui/material"
import { Edit, Delete, AccessTime, Restaurant, MoreVert } from "@mui/icons-material"
import { Menu, MenuItem } from "@mui/material"
import { Recipe } from "../types"

interface RecipeCardProps {
  recipe: Recipe
  isOwner: boolean
  onEdit: (recipe: Recipe) => void
  onDelete: (recipeId: number) => void
}

export default function RecipeCard({ recipe, isOwner, onEdit, onDelete }: RecipeCardProps) {
  const [showDetails, setShowDetails] = useState(false)
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)

  // const formatDate = (dateString: string) => {
  //   const date = new Date(dateString)
  //   return date.toLocaleDateString("he-IL")
  // }

  const getDifficultyColor = (difficulty: number) => {
    switch (difficulty) {
      case 1:
        return "esey"
      case 2:
        return "warning"
      case 3:
        return "error"
      default:
        return "default"
    }
  }

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  return (
    <>
      <Card
        sx={{
          height: "100%",
          display: "flex",
          flexDirection: "column",
          transition: "0.3s",
          "&:hover": { boxShadow: 6 },
        }}
      >
        <CardMedia component="img" height="200" image={recipe.Img} alt={recipe.Name} />
        <CardContent sx={{ flexGrow: 1, pb: 1 }}>
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", mb: 1 }}>
            <Typography variant="h6" component="h2" gutterBottom={false}>
              {recipe.Name}
            </Typography>
            {isOwner && (
              <IconButton
                aria-label="more"
                id="recipe-button"
                aria-controls={open ? "recipe-menu" : undefined}
                aria-expanded={open ? "true" : undefined}
                aria-haspopup="true"
                onClick={handleClick}
                size="small"
              >
                <MoreVert fontSize="small" />
              </IconButton>
            )}
          </Box>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            {recipe.Description}
          </Typography>
          <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap", mb: 1 }}>
            <Chip
              icon={<Restaurant fontSize="small" />}
              label={recipe.Difficulty}
              size="small"
              color={getDifficultyColor(recipe.Difficulty) as "success" | "warning" | "error" | "default"}
              variant="outlined"
            />
            <Chip
              icon={<AccessTime fontSize="small" />}
              label={`${recipe.Duration} דקות`}
              size="small"
              variant="outlined"
            />
          </Box>
        </CardContent>
        <CardActions sx={{ justifyContent: "space-between", px: 2, pb: 2 }}>
          <Button size="small" onClick={() => setShowDetails(true)}>
            צפה במתכון
          </Button>
          <Typography variant="caption" color="text.secondary">
            {/* @@{formatDate(recipe.createdAt)} */}
          </Typography>
        </CardActions>
      </Card>

      <Menu
        id="recipe-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "recipe-button",
        }}
      >
        <MenuItem
          onClick={() => {
            onEdit(recipe)
            handleClose()
          }}
        >
          <Edit fontSize="small" sx={{ mr: 1 }} /> עריכה
        </MenuItem>
        <MenuItem
          onClick={() => {
            setShowDeleteConfirm(true)
            handleClose()
          }}
        >
          <Delete fontSize="small" sx={{ mr: 1 }} /> מחיקה
        </MenuItem>
      </Menu>

      <Dialog open={showDetails} onClose={() => setShowDetails(false)} maxWidth="md" fullWidth scroll="paper" dir="rtl">
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
            <Typography variant="body2" color="text.secondary">
              {/*@@ מאת: {recipe.authorName} */}
            </Typography>
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
           {recipe.Ingridents.map((ingredient, index) => (
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
            {recipe.Instructions.map((instruction, index) => `${index + 1}. ${instruction.Name}\n`).join("")}
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowDetails(false)}>סגור</Button>
        </DialogActions>
      </Dialog>

      <Dialog open={showDeleteConfirm} onClose={() => setShowDeleteConfirm(false)} dir="rtl">
        <DialogTitle>מחיקת מתכון</DialogTitle>
        <DialogContent>
          <DialogContentText>
            האם אתה בטוח שברצונך למחוק את המתכון "{recipe.Name}"? פעולה זו אינה ניתנת לביטול.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowDeleteConfirm(false)}>ביטול</Button>
          <Button
            onClick={() => {
              onDelete(recipe.Id)
              setShowDeleteConfirm(false)
            }}
            color="error"
            variant="contained"
          >
            מחק
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}
