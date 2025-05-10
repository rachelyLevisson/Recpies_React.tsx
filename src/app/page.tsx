"use client"
import { Container } from "@mui/material"
import { Headers } from "../Home/header.tsx"
import { SearchBar } from "../Home/SearchBar.tsx"
import { RecipeList } from "../Home/RecipeList.tsx"
import { RecipesProvider } from "../Context/recipesContext.tsx" 
import { useAuth } from "../hook/use-auth.tsx"
import { RecipeTabs } from "../Home/RecipeTabs.tsx"

export default function Home() {
    const {user}= useAuth();
    return (<>
        <RecipesProvider userId={user?.Id}>
            <Container maxWidth="lg" sx={{ py: 4, minHeight: "100vh" }} dir="rtl">
                <Headers />
                <SearchBar />
                <RecipeTabs/>
                <RecipeList />
            </Container>
        </RecipesProvider>
        </>
    )
}