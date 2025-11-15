import './App.css'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import Products from './pages/Products'
import Cart from './pages/Cart'
import Orders from './pages/Orders'
import AdminProducts from './pages/AdminProducts'
import AdminOrders from './pages/AdminOrders'
import Header from './components/Header'

export default function App() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-800">
      <Header />
      <div className="mx-auto max-w-6xl px-4 py-6">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/admin/products" element={<AdminProducts />} />
          <Route path="/admin/orders" element={<AdminOrders />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="*" element={<div style={{ textAlign: 'center' }}>Página no encontrada</div>} />
        </Routes>
      </div>
    </div>
  )
}
