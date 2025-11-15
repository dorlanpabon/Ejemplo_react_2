import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

export default function Login() {
  const navigate = useNavigate()
  const [form, setForm] = useState({ email: '', password: '' })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const { login: setAuthToken } = useAuth()

  function handleChange(e) {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setLoading(true)
    setError(null)
    try {
      const myHeaders = new Headers()
      myHeaders.append('Content-Type', 'application/json')

      const raw = JSON.stringify({ email: form.email, password: form.password })

      const requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow',
      }

      const res = await fetch('http://localhost:3000/login', requestOptions)

      if (res.status === 200) {
        // Respuesta OK: parseamos JSON y guardamos token si viene
        const data = await res.json().catch(() => null)
        if (data && data.token) {
          setAuthToken(data.token)
        }
        navigate('/')
        return
      }

      if (res.status === 401) {
        setError('Correo o contraseña incorrectos')
        return
      }

      // Otros códigos de error
      const text = await res.text().catch(() => '')
      setError(text || `Error del servidor (${res.status})`)
    } catch (err) {
      console.error('Error en login', err)
      setError('No se pudo conectar con el servidor')
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="mx-auto my-8 max-w-md rounded-2xl border bg-white p-6 shadow-sm">
      <h2 className="mb-4 text-center text-2xl font-bold">Iniciar sesión</h2>
      <form onSubmit={handleSubmit} className="space-y-3">
        {error && <div className="rounded-md bg-red-50 px-3 py-2 text-sm text-red-700">{error}</div>}
        <div>
          <label htmlFor="email" className="mb-1 block text-sm font-medium text-slate-700">Correo</label>
          <input
            id="email"
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            placeholder="tu@correo.com"
            required
            className="w-full rounded-lg border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand"
          />
        </div>

        <div>
          <label htmlFor="password" className="mb-1 block text-sm font-medium text-slate-700">Contraseña</label>
          <input
            id="password"
            name="password"
            type="password"
            value={form.password}
            onChange={handleChange}
            required
            className="w-full rounded-lg border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand"
          />
        </div>

        <button type="submit" disabled={loading} className="w-full rounded-lg bg-brand px-4 py-2 font-semibold text-white hover:bg-blue-700 disabled:opacity-60">
          {loading ? 'Entrando…' : 'Entrar'}
        </button>
      </form>

      <p className="mt-4 text-center text-sm text-slate-600">
        ¿No tienes cuenta? <Link className="text-brand hover:underline" to="/register">Crear cuenta</Link>
      </p>
    </section>
  )
}
