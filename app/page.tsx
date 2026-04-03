import Hero from './components/Hero';
import MenuSection from './components/MenuSection';

export default function Home() {
  return (
    <main className="min-h-screen bg-zinc-900 text-zinc-50 font-sans">
      <Hero />
      <MenuSection />
    </main>
  );
}