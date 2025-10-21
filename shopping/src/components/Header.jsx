import { Link } from 'react-router-dom'
import { useCart } from '../contexts/CartContext'

export default function Header() {
  const { count } = useCart()
  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-brand text-white">
      <div className="mx-auto flex max-w-6xl items-center gap-4 px-4 py-3">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <div className="h-9 w-9 rounded-full bg-white/90 ring-1 ring-white/60" />
          <span className="text-lg font-bold">Shop</span>
        </Link>

        {/* Search */}
        <div className="flex-1">
          <div className="flex overflow-hidden rounded-lg bg-white shadow-sm">
            <input className="w-full px-3 py-2 text-slate-800 outline-none" placeholder="Buscar productos, marcas y más..." />
            <button className="bg-brand-dark px-4 text-white hover:bg-brand">Buscar</button>
          </div>
        </div>

        {/* Links */}
        <nav className="hidden items-center gap-4 text-sm md:flex">
          <Link className="hover:underline" to="/register">Crea tu cuenta</Link>
          <Link className="hover:underline" to="/login">Ingresa</Link>
          <Link className="hover:underline" to="/cart">Mis compras</Link>
          <Link className="relative font-semibold" to="/cart">
            🛒
            {count > 0 && (
              <span className="absolute -right-2 -top-2 inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-white px-1 text-xs font-bold text-brand-dark">
                {count}
              </span>
            )}
          </Link>
        </nav>
      </div>
    </header>
  )
}
