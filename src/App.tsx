import './App.css'
import { createBrowserRouter, RouterProvider, useNavigate } from 'react-router-dom'
import { AuthProvider } from './hook/use-auth'
import LoginForm from './components/login-form'
import Home from './app/page'
import AddRecipeForm from './components/add-recipe-form'
import { RecipeDetails } from './components/recipeDetails'

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
      element: <AddRecipeForm onSubmit={() => void {}} onClose={() => { }} />
    },
    {
      path: "/edit-recipe",
      element: <AddRecipeForm onSubmit={() => void {}} onClose={() => { }} />
    },
    // {
    //   path: "/delete-recipe",
    //   element: <Add-Recpise-Form />
    // },
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
      <AuthProvider>
        <RouterProvider router={route} />
      </AuthProvider>
      {/* </ThemeProvider> */}
    </>
  )
}

export default App


