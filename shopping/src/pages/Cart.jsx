import { Link } from 'react-router-dom'
import { useCart } from '../contexts/CartContext'

export default function Cart() {
  const { items, update, remove, clear, total } = useCart()

  if (items.length === 0) {
    return (
      <div className="mx-auto my-8 max-w-xl rounded-2xl border bg-white p-6 text-center shadow-sm">
        <p className="text-slate-600">Tu carrito está vacío.</p>
        <Link className="mt-4 inline-flex rounded-lg bg-brand px-4 py-2 font-medium text-white hover:bg-blue-700" to="/products">Ir a productos</Link>
      </div>
    )
  }

  return (
    <section className="mx-auto max-w-5xl">
      <h2 className="mb-4 text-2xl font-bold">Carrito</h2>
      <div className="overflow-hidden rounded-xl border bg-white shadow-sm">
        <table className="w-full border-collapse text-left">
          <thead className="bg-slate-50">
            <tr className="text-sm text-slate-600">
              <th className="p-3">Producto</th>
              <th className="p-3">Precio</th>
              <th className="p-3">Cantidad</th>
              <th className="p-3">Subtotal</th>
              <th className="p-3"></th>
            </tr>
          </thead>
          <tbody>
            {items.map((it) => (
              <tr key={it.id} className="border-t">
                <td className="p-3">{it.name}</td>
                <td className="p-3">${it.price.toFixed(2)}</td>
                <td className="p-3">
                  <input
                    type="number"
                    min={1}
                    value={it.qty}
                    onChange={(e) => update(it.id, Number(e.target.value))}
                    className="w-16 rounded border px-2 py-1"
                  />
                </td>
                <td className="p-3">${(it.price * it.qty).toFixed(2)}</td>
                <td className="p-3 text-right">
                  <button className="rounded border border-red-200 px-3 py-1 text-red-600 hover:bg-red-50" onClick={() => remove(it.id)}>
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-4 flex items-center justify-between">
        <button className="rounded border border-slate-300 px-4 py-2 hover:bg-slate-100" onClick={clear}>Vaciar carrito</button>
        <div className="text-lg font-bold">Total: ${total.toFixed(2)}</div>
      </div>

      <div className="mt-3 text-right">
        <button className="rounded-lg bg-brand px-5 py-2 font-semibold text-white hover:bg-blue-700">Proceder al pago</button>
      </div>
    </section>
  )
}
