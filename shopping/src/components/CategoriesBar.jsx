import { Link } from 'react-router-dom'

const categories = ['Categorías', 'Ofertas', 'Cupones', 'Moda', 'Supermercado', 'Ayuda / PQR']

export default function CategoriesBar() {
  return (
    <div className="border-b bg-brand-light/10">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center gap-4 px-4 py-2 text-sm text-slate-700">
        {categories.map((c) => (
          <Link key={c} to="/products" className="hover:text-brand-dark">
            {c}
          </Link>
        ))}
      </div>
    </div>
  )
}
