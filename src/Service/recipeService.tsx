// services/recipe-service.ts
import axios from "axios"
import type { Recipe, Category } from "../types"

const API_URL = "http://localhost:8080/api"

// יצירת מופע axios עם הגדרות בסיסיות
const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
})

// טיפול בשגיאות גלובלי
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // כאן אפשר להוסיף לוגיקה לטיפול בשגיאות כמו ניסיון מחדש, רענון טוקן וכו'
    const errorMessage = error.response?.data?.message || "אירעה שגיאה בתקשורת עם השרת"
    console.error("API Error:", errorMessage)
    return Promise.reject(new Error(errorMessage))
  }
)

export const recipeService = {
  // קבלת כל המתכונים
  getAllRecipes: async (): Promise<Recipe[]> => {
    try {
      const response = await api.get<Recipe[]>("/recipe")
      return response.data
    } catch (error) {
      throw new Error("לא ניתן לטעון את המתכונים")
    }
  },

  // קבלת מתכון לפי מזהה
  getRecipeById: async (id: number): Promise<Recipe> => {
    try {
      const response = await api.get<Recipe>(`/recipe/${id}`)
      return response.data
    } catch (error) {
      throw new Error("לא ניתן לטעון את המתכון המבוקש")
    }
  },

  // קבלת כל הקטגוריות
  getCategories: async (): Promise<Category[]> => {
    try {
      const response = await api.get<Category[]>("/category")
      return response.data
    } catch (error) {
      throw new Error("לא ניתן לטעון את הקטגוריות")
    }
  },

  // הוספת מתכון חדש
  addRecipe: async (recipe: Recipe): Promise<Recipe> => {
    try {
      const response = await api.post<Recipe>("/recipe", recipe)
      return response.data
    } catch (error) {
      throw new Error("לא ניתן להוסיף את המתכון. ייתכן שהמתכון כבר קיים במאגר")
    }
  },

  // עדכון מתכון קיים
  updateRecipe: async (recipe: Recipe): Promise<Recipe> => {
    try {
      const response = await api.post<Recipe>("/recipe/edit", recipe)
      return response.data
    } catch (error) {
      throw new Error("לא ניתן לעדכן את המתכון")
    }
  },

  // מחיקת מתכון
  deleteRecipe: async (id: number): Promise<void> => {
    try {
      await api.post(`/recipe/delete/${id}`)
    } catch (error) {
      throw new Error("לא ניתן למחוק את המתכון")
    }
  }
}