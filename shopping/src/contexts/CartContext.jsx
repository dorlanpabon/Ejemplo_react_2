import { createContext, useContext, useEffect, useMemo, useState } from 'react'

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

  useEffect(() => {
    try {
      localStorage.setItem('cart:v1', JSON.stringify(items))
    } catch (e) {
      console.warn('No se pudo guardar el carrito en localStorage')
    }
  }, [items])

  function add(product, qty = 1) {
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
    setItems((prev) => prev.filter((p) => p.id !== productId))
  }

  function update(productId, qty) {
    setItems((prev) => prev.map((p) => (p.id === productId ? { ...p, qty: Math.max(1, qty) } : p)))
  }

  function clear() {
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
