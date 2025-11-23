import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import * as api from '../lib/api'

export default function Register() {
  const navigate = useNavigate()
  const [form, setForm] = useState({ name: '', email: '', password: '' })
  const [loading, setLoading] = useState(false)

  function handleChange(e) {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setLoading(true)
    try {
      const resText = await api.registerUser({ email: form.email, password: form.password })
      // Backend returns a text message like 'Registration Successful'
      if (typeof resText === 'string' && /success/i.test(resText)) {
        alert('Cuenta creada, ahora inicia sesión')
        navigate('/login')
      } else {
        alert(resText || 'Registro completado')
        navigate('/login')
      }
    } catch (err) {
      console.error('Error en registro', err)
      alert(err.message || 'No se pudo registrar')
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="mx-auto my-8 max-w-md rounded-2xl border bg-white p-6 shadow-sm">
      <h2 className="mb-4 text-center text-2xl font-bold">Crear cuenta</h2>
      <form onSubmit={handleSubmit} className="space-y-3">
        <div>
          <label htmlFor="name" className="mb-1 block text-sm font-medium text-slate-700">Nombre</label>
          <input
            id="name"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Tu nombre"
            required
            className="w-full rounded-lg border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand"
          />
        </div>

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
          {loading ? 'Creando…' : 'Crear cuenta'}
        </button>
      </form>

      <p className="mt-4 text-center text-sm text-slate-600">
        ¿Ya tienes cuenta? <Link className="text-brand hover:underline" to="/login">Inicia sesión</Link>
      </p>
    </section>
  )
}
