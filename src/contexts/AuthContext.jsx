import { createContext, useContext, useEffect, useMemo, useState } from 'react'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => {
    try {
      return localStorage.getItem('auth_token')
    } catch (e) {
      return null
    }
  })

  useEffect(() => {
    try {
      if (token) localStorage.setItem('auth_token', token)
      else localStorage.removeItem('auth_token')
    } catch (e) {
      console.warn('No se pudo persistir auth token', e)
    }
  }, [token])

  function login(newToken) {
    setToken(newToken)
  }

  function logout() {
    setToken(null)
  }

  // decode basic JWT payload (no verification) to extract claims like role, email, id
  function decodeToken(t) {
    try {
      if (!t) return null
      const parts = t.split('.')
      if (parts.length < 2) return null
      const payload = parts[1]
      const json = atob(payload.replace(/-/g, '+').replace(/_/g, '/'))
      return JSON.parse(decodeURIComponent(escape(json)))
    } catch (e) {
      try { return JSON.parse(atob(t.split('.')[1])) } catch (e2) { return null }
    }
  }

  const claims = decodeToken(token)
  const user = claims ? { id: claims.id, email: claims.email, role: claims.role } : null
  const isAuthenticated = Boolean(token)

  const value = useMemo(() => ({ token, login, logout, isAuthenticated, user }), [token, isAuthenticated, user])

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth debe usarse dentro de <AuthProvider>')
  return ctx
}
