import { Link } from 'react-router-dom'

export default function Hero() {
  return (
    <section className="bg-gradient-to-r from-brand-dark to-brand text-white">
      <div className="mx-auto max-w-6xl px-4 py-10">
        <div className="grid gap-6 md:grid-cols-2 md:items-center">
          <div>
            <span className="inline-flex items-center rounded-full bg-white/20 px-3 py-1 text-xs font-semibold ring-1 ring-white/30">
              HOT SALE
            </span>
            <h2 className="mt-3 text-4xl font-extrabold leading-tight">Hasta 60% OFF</h2>
            <p className="mt-2 max-w-md text-white/90">Aprovecha las últimas horas de descuentos en miles de productos seleccionados.</p>
            <div className="mt-4 flex gap-3">
              <Link to="/products" className="rounded-lg bg-white px-4 py-2 font-bold text-brand-dark hover:bg-slate-100">Ver ofertas</Link>
              <Link to="/cart" className="rounded-lg border border-white/70 px-4 py-2 font-semibold text-white hover:bg-white/10">Mis compras</Link>
            </div>
          </div>
          <div className="hidden justify-end md:flex">
            <div className="h-48 w-full max-w-md rounded-2xl bg-white/10 ring-1 ring-white/20" />
          </div>
        </div>
      </div>
    </section>
  )
}
