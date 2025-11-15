import { useEffect, useState } from 'react'
import * as api from '../lib/api'
import { useAuth } from '../contexts/AuthContext'

export default function AdminProducts() {
  const { user, isAuthenticated } = useAuth()
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [editing, setEditing] = useState(null)
  const [form, setForm] = useState({ nombre: '', descripcion: '', precio: '', stock: '' })

  useEffect(() => {
    let mounted = true
    async function load() {
      try {
        const data = await api.fetchProducts()
        if (!mounted) return
        setProducts(data)
      } catch (err) {
        setError('No se pudieron cargar productos')
      } finally {
        setLoading(false)
      }
    }
    if (isAuthenticated && user && user.role === 'admin') load()
    else setError('Acceso denegado')
    return () => { mounted = false }
  }, [isAuthenticated, user])

  function resetForm() {
    setEditing(null)
    setForm({ nombre: '', descripcion: '', precio: '', stock: '' })
  }

  async function handleCreate(e) {
    e.preventDefault()
    try {
      const payload = { nombre: form.nombre, descripcion: form.descripcion, precio: Number(form.precio || 0), stock: Number(form.stock || 0) }
      await api.createProduct(payload)
      const data = await api.fetchProducts()
      setProducts(data)
      resetForm()
    } catch (err) {
      console.error(err)
      setError('No se pudo crear el producto')
    }
  }

  function startEdit(p) {
    setEditing(p.id)
    setForm({ nombre: p.nombre || p.name, descripcion: p.descripcion || '', precio: p.precio || p.price || 0, stock: p.stock || 0 })
  }

  async function handleUpdate(e) {
    e.preventDefault()
    try {
      await api.updateProduct(editing, { nombre: form.nombre, descripcion: form.descripcion, precio: Number(form.precio || 0), stock: Number(form.stock || 0) })
      const data = await api.fetchProducts()
      setProducts(data)
      resetForm()
    } catch (err) {
      console.error(err)
      setError('No se pudo actualizar el producto')
    }
  }

  async function handleDelete(id) {
    if (!confirm('Eliminar producto?')) return
    try {
      await api.deleteProduct(id)
      setProducts((p) => p.filter((x) => x.id !== id))
    } catch (err) {
      console.error(err)
      setError('No se pudo eliminar el producto')
    }
  }

  if (loading) return <div>Cargando…</div>
  if (error) return <div className="text-red-600">{error}</div>

  return (
    <section className="mx-auto max-w-6xl">
      <h2 className="mb-4 text-2xl font-bold">Administrar productos</h2>

      <form onSubmit={editing ? handleUpdate : handleCreate} className="mb-6 grid gap-2 sm:grid-cols-2">
        <input placeholder="Nombre" value={form.nombre} onChange={(e) => setForm({ ...form, nombre: e.target.value })} className="rounded border px-2 py-1" />
        <input placeholder="Precio" value={form.precio} onChange={(e) => setForm({ ...form, precio: e.target.value })} className="rounded border px-2 py-1" />
        <input placeholder="Stock" value={form.stock} onChange={(e) => setForm({ ...form, stock: e.target.value })} className="rounded border px-2 py-1" />
        <input placeholder="Descripción" value={form.descripcion} onChange={(e) => setForm({ ...form, descripcion: e.target.value })} className="rounded border px-2 py-1" />
        <div className="sm:col-span-2">
          <button type="submit" className="rounded bg-brand px-3 py-2 text-white">{editing ? 'Actualizar' : 'Crear producto'}</button>
          {editing && <button type="button" onClick={resetForm} className="ml-2 rounded border px-3 py-2">Cancelar</button>}
        </div>
      </form>

      <div className="grid gap-3">
        {products.map((p) => (
          <div key={p.id} className="flex items-center justify-between rounded border bg-white p-3">
            <div>
              <div className="font-semibold">{p.nombre || p.name}</div>
              <div className="text-sm text-slate-600">${Number(p.precio || p.price || 0).toFixed(2)} — stock: {p.stock || 0}</div>
            </div>
            <div className="flex gap-2">
              <button className="rounded border px-2 py-1" onClick={() => startEdit(p)}>Editar</button>
              <button className="rounded border px-2 py-1 text-red-600" onClick={() => handleDelete(p.id)}>Eliminar</button>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
