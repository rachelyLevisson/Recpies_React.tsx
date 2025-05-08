import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { AuthProvider } from './hook/use-auth'
import LoginForm from './components/login-form'
import Home from './app/page'
import AddRecipeForm from './components/add-recipe-form'
import RecipeCard from './components/recipe-card'

function App() {

  const route = createBrowserRouter([
    {
      path: "/",
      element: <Home />
    },
    {
      path: "/login",
      element: <LoginForm onClose={function (): void {
        throw new Error('Function not implemented.')
      }} />
    },
    {
      path: "/register",
      element: <LoginForm onClose={function (): void {
        throw new Error('Function not implemented.')
      }} />
    },
    {
      path: "/add-recipe",
      element: <AddRecipeForm onSubmit={() => void {}} onClose={() => void {}} />

    },
    {
      path: "/edit-recipe",
      element: <AddRecipeForm onSubmit={() => void {}} onClose={() => void {}} />
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
      element: <Home/>
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


