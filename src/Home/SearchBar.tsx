import { Search, FilterList } from "@mui/icons-material"
import { Box, TextField, InputAdornment, FormControl, InputLabel, Select, MenuItem } from "@mui/material"
import { useRecipesContext } from "../Context/recipesContext"

export const SearchBar = () => {
    const { categories,searchQuery,setSearchQuery,selectedCategory,setSelectedCategory} = useRecipesContext();


    return (<>
        <Box sx={{ display: "flex", flexDirection: { xs: "column", md: "row" }, gap: 2, mb: 3 }}>
            <TextField
                fullWidth
                placeholder="חפש מתכונים..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            <Search />
                        </InputAdornment>
                    ),
                }}
                sx={{ flexGrow: 1 }}
            />
            <Box sx={{ display: "flex", alignItems: "center", minWidth: { xs: "100%", md: "200px" } }}>
                <FilterList sx={{ mr: 1 }} />
                <FormControl fullWidth size="small">
                    <InputLabel id="sort-by-label">סנן לפי קטגוריה</InputLabel>
                    <Select
                        labelId="sort-by-label"
                        value={selectedCategory}
                        label="סנן לפי קטגוריה"
                        onChange={(e) => setSelectedCategory(Number(e.target.value))}
                    >
                        {categories.map((category) => (
                            <MenuItem key={category.Id} value={category.Id}>
                                {category.Name}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </Box>
        </Box>
    </>)
}