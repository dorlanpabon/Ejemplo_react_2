const BASE = import.meta.env.VITE_API_BASE || 'http://localhost:3000'

function authHeaders() {
  const token = typeof window !== 'undefined' ? localStorage.getItem('auth_token') : null
  const headers = { 'Content-Type': 'application/json' }
  if (token) headers['Authorization'] = `Bearer ${token}`
  return headers
}

export async function fetchProducts() {
  const res = await fetch(`${BASE}/products`)
  if (!res.ok) throw new Error(`Error fetching products: ${res.status}`)
  return res.json()
}

export async function fetchProduct(id) {
  const res = await fetch(`${BASE}/products/${id}`)
  if (!res.ok) throw new Error(`Error fetching product: ${res.status}`)
  return res.json()
}

export async function getCart() {
  const res = await fetch(`${BASE}/cart`, { headers: authHeaders() })
  if (!res.ok) throw new Error(`Error fetching cart: ${res.status}`)
  return res.json()
}

export async function addCartItem(productId, cantidad = 1) {
  const res = await fetch(`${BASE}/cart/items`, {
    method: 'POST',
    headers: authHeaders(),
    body: JSON.stringify({ producto_id: productId, cantidad }),
  })
  if (!res.ok) throw new Error(`Error adding to cart: ${res.status}`)
  return res.json()
}

export async function removeCartItem(cartItemId) {
  const res = await fetch(`${BASE}/cart/items/${cartItemId}`, {
    method: 'DELETE',
    headers: authHeaders(),
  })
  if (!res.ok) throw new Error(`Error removing cart item: ${res.status}`)
  return res.json()
}

export async function createOrder() {
  const res = await fetch(`${BASE}/orders`, {
    method: 'POST',
    headers: authHeaders(),
  })
  if (!res.ok) throw new Error(`Error creating order: ${res.status}`)
  return res.json()
}

export async function getOrders() {
  const res = await fetch(`${BASE}/orders`, { headers: authHeaders() })
  if (!res.ok) throw new Error(`Error fetching orders: ${res.status}`)
  return res.json()
}

// Admin: fetch all orders (requires admin token)
// Fetch all orders (admin and clients endpoint returns all orders when authorized)
export async function fetchAllOrders() {
  const res = await fetch(`${BASE}/orders`, { headers: authHeaders() })
  if (!res.ok) throw new Error(`Error fetching all orders: ${res.status}`)
  return res.json()
}

// Update order status (PUT /orders/:id)
export async function updateOrderStatus(orderId, estado) {
  const res = await fetch(`${BASE}/orders/${orderId}`, {
    method: 'PUT',
    headers: authHeaders(),
    body: JSON.stringify({ estado }),
  })
  if (!res.ok) throw new Error(`Error updating order status: ${res.status}`)
  return res.json()
}

// Admin product endpoints
export async function createProduct(payload) {
  const res = await fetch(`${BASE}/products`, {
    method: 'POST',
    headers: authHeaders(),
    body: JSON.stringify(payload),
  })
  if (!res.ok) throw new Error(`Error creating product: ${res.status}`)
  return res.json()
}

export async function updateProduct(id, payload) {
  const res = await fetch(`${BASE}/products/${id}`, {
    method: 'PUT',
    headers: authHeaders(),
    body: JSON.stringify(payload),
  })
  if (!res.ok) throw new Error(`Error updating product: ${res.status}`)
  return res.json()
}

export async function deleteProduct(id) {
  const res = await fetch(`${BASE}/products/${id}`, {
    method: 'DELETE',
    headers: authHeaders(),
  })
  if (!res.ok) throw new Error(`Error deleting product: ${res.status}`)
  return res.json()
}
