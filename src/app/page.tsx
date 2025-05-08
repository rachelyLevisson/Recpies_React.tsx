"use client"
import { Container } from "@mui/material"
import { Headers } from "../Home/header.tsx"
import { SearchBar } from "../Home/SearchBar.tsx"
import { RecipeList } from "../Home/RecipeList.tsx"
import { RecipesProvider } from "../Context/recipesContext.tsx" 
import { useAuth } from "../hook/use-auth.tsx"

export default function Home() {

    const {user}= useAuth();
    return (<>
    <h1>hello</h1>
        <RecipesProvider userId={user?.Id}>
            <Container maxWidth="lg" sx={{ py: 4, minHeight: "100vh" }} dir="rtl">
                <Headers />
                <SearchBar />
                <RecipeList />
                {/* <LoginForm onClose={function (): void {
                    throw new Error("Function not implemented.")
                } } /> */}

            </Container>
        </RecipesProvider>
        </>
    )
}