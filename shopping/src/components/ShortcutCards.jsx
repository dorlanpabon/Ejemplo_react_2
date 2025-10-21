import { Link } from 'react-router-dom'

const items = [
  { title: 'Ingresa a tu cuenta', description: 'Disfruta de ofertas y compra sin límites.', cta: 'Ingresar a tu cuenta', to: '/login' },
  { title: 'Ingresa tu ubicación', description: 'Consulta costos y tiempos de entrega.', cta: 'Ingresar ubicación', to: '/products' },
  { title: 'Medios de pago', description: 'Paga tus compras de forma rápida y segura.', cta: 'Conocer medios de pago', to: '/products' },
  { title: 'Menos de $40.000', description: 'Descubre productos con precios bajos.', cta: 'Mostrar productos', to: '/products' },
  { title: 'Más vendidos', description: 'Explora los productos que son tendencia.', cta: 'Ir a Más vendidos', to: '/products' },
  { title: 'Compra protegida', description: 'Puedes devolver tu compra gratis.', cta: 'Cómo funciona', to: '/products' },
]

export default function ShortcutCards() {
  return (
    <section className="mx-auto -mt-10 max-w-6xl px-4">
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
        {items.map((it) => (
          <article key={it.title} className="rounded-xl border bg-white p-4 shadow-sm">
            <div className="mb-3 h-10 w-10 rounded-lg bg-brand/10 text-brand" />
            <h3 className="font-semibold">{it.title}</h3>
            <p className="mt-1 text-sm text-slate-600">{it.description}</p>
            <Link to={it.to} className="mt-3 inline-flex rounded-lg bg-slate-100 px-3 py-1 text-sm font-medium text-slate-700 hover:bg-slate-200">
              {it.cta}
            </Link>
          </article>
        ))}
      </div>
    </section>
  )
}
