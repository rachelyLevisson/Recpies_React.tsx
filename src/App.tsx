import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from './app/page'
import { AuthProvider } from './hook/use-auth'

function App() {

  const route = createBrowserRouter([{
    path: "/",
    element: <Home />
  }])



  return (
    <>
      <AuthProvider>
        <RouterProvider router={route} />
      </AuthProvider>
    </>
  )
}

export default App


