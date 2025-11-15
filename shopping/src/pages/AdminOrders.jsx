import { useEffect, useState } from 'react'
import * as api from '../lib/api'
import { useAuth } from '../contexts/AuthContext'

// Status values expected by backend (example: 'pending')
const STATUSES = [
  'pending',
  'processing',
  'shipped',
  'delivered',
  'cancelled',
]

export default function AdminOrders() {
  const { user, isAuthenticated } = useAuth()
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let mounted = true
    async function load() {
      try {
        const data = await api.fetchAllOrders()
        if (!mounted) return
        setOrders(data)
      } catch (err) {
        console.error(err)
        setError('No se pudieron cargar los pedidos (admin)')
      } finally {
        setLoading(false)
      }
    }
    if (isAuthenticated && user && user.role === 'admin') load()
    else setError('Acceso denegado')
    return () => { mounted = false }
  }, [isAuthenticated, user])

  async function handleChangeStatus(orderId, newStatus) {
    try {
      await api.updateOrderStatus(orderId, newStatus)
      setOrders((prev) => prev.map((o) => (o.id === orderId ? { ...o, estado: newStatus } : o)))
    } catch (err) {
      console.error(err)
      setError('No se pudo actualizar el estado')
    }
  }

  if (loading) return <div>Cargando pedidos (admin)…</div>
  if (error) return <div className="text-red-600">{error}</div>

  return (
    <section className="mx-auto max-w-6xl">
      <h2 className="mb-4 text-2xl font-bold">Gestión de pedidos (Admin)</h2>
      {orders.length === 0 ? (
        <div className="rounded-lg border bg-white p-4">No hay pedidos.</div>
      ) : (
        <ul className="space-y-3">
          {orders.map((o) => (
            <li key={o.id} className="rounded-lg border bg-white p-4">
              <div className="flex flex-col gap-3 sm:flex-row sm:justify-between">
                <div>
                  <div className="font-semibold">Pedido #{o.id}</div>
                  <div className="text-sm text-slate-600">Usuario ID: {o.usuario_id || o.user_id || '—'}</div>
                  <div className="text-sm text-slate-600">Fecha: {o.creado_at || o.created_at || '—'}</div>
                </div>
                <div className="flex flex-col items-start gap-2 text-right sm:items-end">
                  <div className="font-bold">Total: ${Number(o.total || 0).toFixed(2)}</div>
                  <div className="flex items-center gap-2">
                    <label className="text-sm text-slate-600">Estado:</label>
                    <select value={o.estado || o.status || 'pending'} onChange={(e) => handleChangeStatus(o.id, e.target.value)} className="rounded border px-2 py-1">
                      {STATUSES.map((s) => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}
