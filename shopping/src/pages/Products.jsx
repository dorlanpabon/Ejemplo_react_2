import { products } from '../data/products'
import { useCart } from '../contexts/CartContext'

export default function Products() {
  const { add } = useCart()

  return (
    <section className="mx-auto max-w-6xl">
      <h2 className="mb-4 text-2xl font-bold">Productos</h2>
      <div className="grid grid-cols-[repeat(auto-fill,minmax(220px,1fr))] gap-4">
        {products.map((p) => (
          <article key={p.id} className="overflow-hidden rounded-xl border bg-white shadow-sm">
            <img src={p.image} alt={p.name} className="h-44 w-full object-cover" />
            <div className="p-4">
              <h3 className="text-lg font-semibold">{p.name}</h3>
              <p className="mb-3 text-slate-600">${p.price.toFixed(2)}</p>
              <button className="w-full rounded-lg bg-brand px-4 py-2 font-medium text-white hover:bg-blue-700" onClick={() => add(p, 1)}>
                Agregar al carrito
              </button>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
