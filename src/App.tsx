import './App.css'
import { createBrowserRouter, RouterProvider, useNavigate } from 'react-router-dom'
import { AuthProvider } from './hook/use-auth'
import LoginForm from './components/login-form'
import Home from './app/page'
import AddRecipeForm from './components/add-recipe-form'

function App() {
  const navigate = useNavigate()
  const route = createBrowserRouter([
    {
      path: "/",
      element: <Home />
    },
    {
      path: "/login",
      element: <LoginForm onClose={() => { navigate("/") }} />
    },
    {
      path: "/register",
      element: <LoginForm onClose={() => { navigate("/") }} />
    },
    {
      path: "/add-recipe",
      element: <AddRecipeForm onSubmit={() => void {}} onClose={() => { navigate("/") }} />

    },
    {
      path: "/edit-recipe",
      element: <AddRecipeForm onSubmit={() => void {}} onClose={() => { navigate("/") }} />
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
    // {
    //   path: "/recpie/:id",
    //   element: <RecipeCard recipe={} isOwner={false} onEdit={() => void {}} onDelete={() => void {}} />
    // }
  ])



  return (
    <>
      <AuthProvider>
        <RouterProvider router={route} />
      </AuthProvider>
    </>
  )
}

export default App


