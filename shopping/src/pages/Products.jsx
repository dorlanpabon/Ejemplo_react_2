import { useEffect, useState } from 'react'
import { useCart } from '../contexts/CartContext'
import * as api from '../lib/api'
import { useAuth } from '../contexts/AuthContext'

export default function Products() {
  const { add } = useCart()
  const { isAuthenticated } = useAuth()
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let mounted = true
    async function load() {
      try {
        const data = await api.fetchProducts()
        if (!mounted) return
        setProducts(data)
      } catch (err) {
        setError('No se pudieron cargar los productos')
      } finally {
        setLoading(false)
      }
    }
    load()
    return () => { mounted = false }
  }, [])

  if (loading) return <div>Cargando productos…</div>
  if (error) return <div className="text-red-600">{error}</div>

  return (
    <section className="mx-auto max-w-6xl">
      <h2 className="mb-4 text-2xl font-bold">Productos</h2>
      <div className="grid grid-cols-[repeat(auto-fill,minmax(220px,1fr))] gap-4">
        {products.map((p) => (
          <article key={p.id} className="overflow-hidden rounded-xl border bg-white shadow-sm">
            <img src={p.image || `https://picsum.photos/seed/${p.id}/600/400`} alt={p.nombre || p.name} className="h-44 w-full object-cover" />
            <div className="p-4">
              <h3 className="text-lg font-semibold">{p.nombre || p.name}</h3>
              <h3 className="">{p.descripcion }</h3>
              <h3 className="text-sm">Stock: {Number(p.stock || 0)}</h3>
              <p className="mb-3 text-slate-600">${Number(p.precio || p.price || 0).toFixed(2)}</p>
              <button
                className="w-full rounded-lg bg-brand px-4 py-2 font-medium text-white hover:bg-blue-700"
                onClick={() => add({ id: String(p.id), name: p.nombre || p.name, price: Number(p.precio || p.price || 0) }, 1)}
              >
                Agregar al carrito
              </button>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
