"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import type { User } from "../types"
import axios from "axios"

interface AuthContextType {
  user: User | null
  isAuthenticated: boolean
  login: (username: string, password: string) => void
  register: (user: User) => void
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)

  // Check for saved user on mount
  useEffect(() => {
    const savedUser = localStorage.getItem("user")
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser))
      } catch (error) {
        console.error("Failed to parse saved user:", error)
        localStorage.removeItem("user")
      }
    }
  }, [])

  const login = async (UserName: string, Password: string) => {
    try {
      const response = await axios.post('http://localhost:8080/api/user/login', {
        UserName,
        Password,
      });
      setUser(response.data)
      localStorage.setItem("user", JSON.stringify(response.data))

    } catch (error) {
      console.error('Login failed:', error);
    }

  }

  const register = async (user: User) => {
    try {
      const response = await axios.post('http://localhost:8080/api/user/sighin', {
        UserName: user.UserName,
        Password: user.Password,
        Name: user.Name,
        Phone: user.Phone,
        Email: user.Email,
        Tz: user.Tz
      });
      setUser(response.data)
      localStorage.setItem("user", JSON.stringify(response.data))
    }
    catch (err) {
      console.error("dont add", err);

    }
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("user")
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
