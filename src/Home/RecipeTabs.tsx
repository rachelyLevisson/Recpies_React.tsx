import { Box, Tabs, Tab } from "@mui/material"
import { useAuth } from "../hook/use-auth"
import { useRecipesContext } from "../Context/recipesContext"

export const RecipeTabs = () => {
    const { isAuthenticated } = useAuth()
    const { activeTab, setActiveTab } = useRecipesContext();

    const handleTabChange = () => {
        setActiveTab(activeTab === 0 ? 1 : 0)
    }


    return (<>
        <Box sx={{ mb: 3 }}>
            <Tabs value={activeTab} onChange={handleTabChange} variant="fullWidth">
                <Tab label="כל המתכונים" />
                <Tab label="המתכונים שלי" disabled={!isAuthenticated} />
            </Tabs>
        </Box>
    </>)
}