import { useEffect, useState } from 'react'
import * as api from '../lib/api'

export default function Orders() {
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let mounted = true
    async function load() {
      try {
        const data = await api.getOrders()
        if (!mounted) return
        setOrders(data)
      } catch (err) {
        setError('No se pudieron cargar los pedidos')
      } finally {
        setLoading(false)
      }
    }
    load()
    return () => { mounted = false }
  }, [])

  if (loading) return <div>Cargando pedidos…</div>
  if (error) return <div className="text-red-600">{error}</div>

  return (
    <section className="mx-auto max-w-4xl">
      <h2 className="mb-4 text-2xl font-bold">Mis pedidos</h2>
      {orders.length === 0 ? (
        <div className="rounded-lg border bg-white p-4">No hay pedidos.</div>
      ) : (
        <ul className="space-y-3">
          {orders.map((o) => (
            <li key={o.id} className="rounded-lg border bg-white p-4">
              <div className="flex justify-between">
                <div>
                  <div className="font-semibold">Pedido #{o.id}</div>
                  <div className="text-sm text-slate-600">Estado: {o.estado || o.status || '—'}</div>
                </div>
                <div className="text-right">
                  <div className="font-bold">Total: ${Number(o.total || 0).toFixed(2)}</div>
                  <div className="text-sm text-slate-500">Fecha: {o.created_at || o.fecha || o.creado_at || '—'}</div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}
