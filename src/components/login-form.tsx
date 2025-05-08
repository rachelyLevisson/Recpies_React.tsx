"use client"

import type React from "react"

import { useState } from "react"
import {
  Dialog, DialogTitle, DialogContent, Button, TextField, Box, Tabs, Tab, Typography, IconButton,
} from "@mui/material"
import { Close } from "@mui/icons-material"
import { useAuth } from '../hook/use-auth'
import { User } from "../types"
import { useNavigate } from "react-router-dom"

interface TabPanelProps {
  children?: React.ReactNode
  index: number
  value: number
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`login-tabpanel-${index}`}
      aria-labelledby={`login-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ pt: 3 }}>{children}</Box>}
    </div>
  )
}

interface LoginFormProps {
  onClose: () => void
}

export default function LoginForm({ onClose }: LoginFormProps) {
  const { login, register } = useAuth()
  const [tabValue, setTabValue] = useState(0)
  const [loginData, setLoginData] = useState({ username: "", password: "" })
  const [registerData, setRegisterData] = useState<User>({
    Id: 0,
    Email: "", UserName: "", Name: "", Phone: "", Password: "", Tz: "",
  });
  const [error, setError] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const navigate = useNavigate()

  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue)
    if(newValue === 1)
      navigate('/register')
    else
      navigate('/login')
    setError("")
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (!loginData.username || !loginData.password) {
      setError("יש למלא את כל השדות")
      return
    }

    try {
      await login(loginData.username, loginData.password)
      navigate('/')
      onClose()

    }
    catch (error: any) {
      setError(error.message);
    }
  }

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (!registerData.Name || !registerData.UserName || !registerData.Password || !registerData.Phone || !registerData.Email || !registerData.Tz || !confirmPassword) {
      setError("יש למלא את כל השדות")
      return
    }

    if (registerData.Password !== confirmPassword) {
      setError("הסיסמאות אינן תואמות")
      return
    }
    try {
      await register(registerData)
      navigate('/')
      onClose()
    }
    catch (error: any) {
      setError(error.message);
    }
  }

  return (
    <Dialog open={true} onClose={onClose} maxWidth="sm" fullWidth dir="rtl">
      <DialogTitle>
        ברוכים הבאים לספר המתכונים
        <IconButton
          aria-label="close"
          onClick={()=>{
            onClose
            navigate('/')}
          }
          sx={{
            position: "absolute",
            left: 8,
            top: 8,
          }}
        >
          <Close />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <Typography variant="body2" color="text.secondary" align="center" sx={{ mb: 2 }}>
          התחבר או הירשם כדי לשתף ולשמור את המתכונים שלך
        </Typography>

        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs value={tabValue} onChange={handleTabChange} variant="fullWidth">
            <Tab label="התחברות" />
            <Tab label="הרשמה" />
          </Tabs>
        </Box>

        <TabPanel value={tabValue} index={0}>
          <form onSubmit={handleLogin}>
            <TextField
              label="שם משתמשי"
              type="text"
              fullWidth
              margin="normal"
              variant="outlined"
              value={loginData.username}
              onChange={(e) => setLoginData({ ...loginData, username: e.target.value })}
              required
            />
            <TextField
              label="סיסמה"
              type="password"
              fullWidth
              margin="normal"
              variant="outlined"
              value={loginData.password}
              onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
              required
            />

            {error && (
              <Typography color="error" variant="body2" sx={{ mt: 2 }}>
                {error}
              </Typography>
            )}

            <Box sx={{ mt: 3 }}>
              <Button type="submit" variant="contained" color="primary" fullWidth>
                התחבר
              </Button>
            </Box>
          </form>
        </TabPanel>

        <TabPanel value={tabValue} index={1}>
          <form onSubmit={handleRegister}>
            <TextField
              label="שם מלא"
              type="text"
              fullWidth
              margin="normal"
              variant="outlined"
              value={registerData.Name}
              onChange={(e) => setRegisterData({ ...registerData, Name: e.target.value })}
              required
            />
            <TextField
              label="שם משתמשי"
              type="text"
              fullWidth
              margin="normal"
              variant="outlined"
              value={registerData.UserName}
              onChange={(e) => setRegisterData({ ...registerData, UserName: e.target.value })}
              required
            />
            <TextField
              label="מספר טלפון"
              type="tel"
              fullWidth
              margin="normal"
              variant="outlined"
              value={registerData.Phone}
              onChange={(e) => setRegisterData({ ...registerData, Phone: e.target.value })}
              required
            />
            <TextField
              label="דואר אלקטרוני"
              type="email"
              fullWidth
              margin="normal"
              variant="outlined"
              value={registerData.Email}
              onChange={(e) => setRegisterData({ ...registerData, Email: e.target.value })}
              required
            />
            <TextField
              label="תעודת זהות"
              type="text"
              fullWidth
              margin="normal"
              variant="outlined"
              value={registerData.Tz}
              onChange={(e) => setRegisterData({ ...registerData, Tz: e.target.value })}
              required
            />
            <TextField
              label="סיסמה"
              type="password"
              fullWidth
              margin="normal"
              variant="outlined"
              value={registerData.Password}
              onChange={(e) => setRegisterData({ ...registerData, Password: e.target.value })}
              required
            />
            <TextField
              label="אימות סיסמה"
              type="password"
              fullWidth
              margin="normal"
              variant="outlined"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value as string)}
              required
            />

            {error && (
              <Typography color="error" variant="body2" sx={{ mt: 2 }}>
                {error}
              </Typography>
            )}

            <Box sx={{ mt: 3 }}>
              <Button type="submit" variant="contained" color="primary" fullWidth>
                הירשם
              </Button>
            </Box>
          </form>
        </TabPanel>
      </DialogContent>
    </Dialog>
  )
}
