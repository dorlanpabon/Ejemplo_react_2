import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { useAuth } from './AuthContext'
import * as api from '../lib/api'

const CartContext = createContext(null)

export function CartProvider({ children }) {
  const [items, setItems] = useState(() => {
    try {
      const raw = localStorage.getItem('cart:v1')
      return raw ? JSON.parse(raw) : []
    } catch (e) {
      console.warn('No se pudo leer el carrito de localStorage')
      return []
    }
  })

  const { isAuthenticated } = useAuth()

  // cuando el usuario está autenticado cargamos el carrito desde el backend
  useEffect(() => {
    let mounted = true
    async function load() {
      if (!isAuthenticated) return
      try {
        const data = await api.getCart()
        if (!mounted) return
        // backend devuelve { id, items: [ { id: ci.id, cantidad, precio_unit, producto_id, nombre } ] }
        const mapped = (data.items || []).map((it) => ({
          id: String(it.producto_id),
          name: it.nombre || it.name || '',
          price: Number(it.precio_unit || it.price || 0),
          qty: Number(it.cantidad || it.qty || 1),
          cart_item_id: it.id,
        }))
        setItems(mapped)
      } catch (err) {
        console.warn('No se pudo cargar carrito desde API', err)
      }
    }
    load()
    return () => { mounted = false }
  }, [isAuthenticated])

  useEffect(() => {
    try {
      localStorage.setItem('cart:v1', JSON.stringify(items))
    } catch (e) {
      console.warn('No se pudo guardar el carrito en localStorage')
    }
  }, [items])

  function add(product, qty = 1) {
    if (isAuthenticated) {
      // llamar al backend y recargar el carrito
      api.addCartItem(product.id, qty).then(() => api.getCart().then((data) => {
        const mapped = (data.items || []).map((it) => ({
          id: String(it.producto_id),
          name: it.nombre || it.name || '',
          price: Number(it.precio_unit || it.price || 0),
          qty: Number(it.cantidad || it.qty || 1),
          cart_item_id: it.id,
        }))
        setItems(mapped)
      })).catch((e) => console.warn('Error addCartItem', e))
      return
    }

    setItems((prev) => {
      const i = prev.findIndex((p) => p.id === product.id)
      if (i >= 0) {
        const copy = [...prev]
        copy[i] = { ...copy[i], qty: copy[i].qty + qty }
        return copy
      }
      return [...prev, { ...product, qty }]
    })
  }

  function remove(productId) {
    if (isAuthenticated) {
      // buscar cart_item_id
      const it = items.find((p) => p.id === String(productId) || p.id === productId)
      if (it && it.cart_item_id) {
        api.removeCartItem(it.cart_item_id).then(() => api.getCart().then((data) => {
          const mapped = (data.items || []).map((it2) => ({
            id: String(it2.producto_id),
            name: it2.nombre || it2.name || '',
            price: Number(it2.precio_unit || it2.price || 0),
            qty: Number(it2.cantidad || it2.qty || 1),
            cart_item_id: it2.id,
          }))
          setItems(mapped)
        })).catch((e) => console.warn('Error removeCartItem', e))
      }
      return
    }

    setItems((prev) => prev.filter((p) => p.id !== productId))
  }

  function update(productId, qty) {
    const safeQty = Math.max(1, qty)
    if (isAuthenticated) {
      const existing = items.find((p) => p.id === String(productId) || p.id === productId)
      const currentQty = existing ? Number(existing.qty || 0) : 0
      const delta = safeQty - currentQty
      // usar POST /cart/items con cantidad = delta (puede ser negativo para reducir)
      api.addCartItem(productId, delta).then(() => api.getCart().then((data) => {
        const mapped = (data.items || []).map((it) => ({
          id: String(it.producto_id),
          name: it.nombre || it.name || '',
          price: Number(it.precio_unit || it.price || 0),
          qty: Number(it.cantidad || it.qty || 1),
          cart_item_id: it.id,
        }))
        setItems(mapped)
      })).catch((e) => console.warn('Error updateCartItem', e))
      return
    }

    setItems((prev) => prev.map((p) => (p.id === productId ? { ...p, qty: safeQty } : p)))
  }

  function clear() {
    if (isAuthenticated) {
      // eliminar todos los items en backend
      const deletes = items.map((it) => it.cart_item_id ? api.removeCartItem(it.cart_item_id).catch(() => { }) : Promise.resolve())
      Promise.all(deletes).then(() => setItems([])).catch(() => setItems([]))
      return
    }
    setItems([])
  }

  const total = useMemo(() => items.reduce((acc, p) => acc + p.price * p.qty, 0), [items])
  const count = useMemo(() => items.reduce((acc, p) => acc + p.qty, 0), [items])

  const value = useMemo(() => ({ items, add, remove, update, clear, total, count }), [items, total, count])

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart debe usarse dentro de <CartProvider>')
  return ctx
}
