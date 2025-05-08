import { Add, Logout } from "@mui/icons-material"
import { Box, Typography, Button } from "@mui/material"
import { useAuth } from "../hook/use-auth"
import { useNavigate } from "react-router-dom"

export const Headers = () => {
    const { isAuthenticated, logout } = useAuth()
    const navigate = useNavigate()
    return (
        <>
            <Box
                sx={{
                    display: "flex",
                    flexDirection: { xs: "column", md: "row" },
                    justifyContent: "space-between",
                    alignItems: { xs: "stretch", md: "center" },
                    mb: 4,
                }}
            >
                <Typography variant="h4" component="h1" fontWeight="bold" sx={{ mb: { xs: 2, md: 0 } }}>
                    ספר המתכונים
                </Typography>
                <Box>
                    {isAuthenticated ? (
                        <>
                            <Button
                                variant="contained"
                                color="primary"
                                startIcon={<Add />}
                                onClick={() => { navigate("/add-recipe")}}
                            >
                                הוסף מתכון
                            </Button>
                            <Button variant="contained" color="secondary" endIcon={<Logout />} onClick={logout}>
                                התנתק
                            </Button>
                        </>
                    ) : (
                        <Button variant="contained" color="primary"
                            onClick={() => { navigate("/login")}}>
                            התחבר
                        </Button>
                    )}
                </Box>
            </Box>
        </>
    )
}