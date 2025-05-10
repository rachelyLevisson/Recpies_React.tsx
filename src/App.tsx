import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { AuthProvider } from './hook/use-auth'
import LoginForm from './components/login-form'
import Home from './app/page'
import AddRecipeForm from './components/add-recipe-form'
import { RecipeDetails } from './components/recipeDetails'
import { RecipesProvider } from './Context/recipesContext'

function App() {
  const route = createBrowserRouter([
    {
      path: "/",
      element: <Home />
    },
    {
      path: "/login",
      element: <LoginForm onClose={() => { }} />
    },
    {
      path: "/register",
      element: <LoginForm onClose={() => { }} />
    },
    {
      path: "/add-recipe",
      element: <AddRecipeForm />
    },
    {
      path: "/edit-recipe",
      element: <AddRecipeForm />
    },
    {
      path: "/my-recipes",
      element: <Home />
    },
    {
      path: "/recpie",
      element: <Home />
    },
    {
      path: "/recpie/:id",
      element: <RecipeDetails />
    }
  ])



  return (
    <>
      {/* <ThemeProvider theme={} children={}> */}
      <RecipesProvider>
        <AuthProvider>
          <RouterProvider router={route} />
        </AuthProvider>
      </RecipesProvider>
      {/* </ThemeProvider> */}
    </>
  )
}

export default App


