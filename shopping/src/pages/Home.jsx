import Hero from '../components/Hero'
import CategoriesBar from '../components/CategoriesBar'
import ShortcutCards from '../components/ShortcutCards'

export default function Home() {
  return (
    <div>
      <Hero />
      <ShortcutCards />
      <CategoriesBar />
      <section className="mx-auto my-8 max-w-6xl px-4">
        <h2 className="mb-3 text-xl font-bold">Funcional para tu casa</h2>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <div className="h-40 rounded-2xl bg-white shadow-sm ring-1 ring-slate-200" />
          <div className="h-40 rounded-2xl bg-white shadow-sm ring-1 ring-slate-200" />
          <div className="h-40 rounded-2xl bg-white shadow-sm ring-1 ring-slate-200" />
        </div>
      </section>
    </div>
  )
}
