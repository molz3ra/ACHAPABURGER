import Link from 'next/link';

export default function Header() {
  return (
    <header className="fixed top-0 w-full bg-zinc-950/80 backdrop-blur-md border-b border-zinc-800 z-50">
      <div className="max-w-5xl mx-auto px-4 h-20 flex items-center justify-between">
        
        <div className="text-2xl font-black text-amber-500 tracking-tighter">
          A CHAPA<span className="text-zinc-50">.</span>
        </div>

        <nav className="hidden md:flex gap-8 text-zinc-300 font-medium">
          <Link href="#inicio" className="hover:text-amber-500 transition-colors">Início</Link>
          <Link href="#cardapio" className="hover:text-amber-500 transition-colors">Cardápio</Link>
          <Link href="#localizacao" className="hover:text-amber-500 transition-colors">Localização</Link>
        </nav>

        <Link href="#cardapio" className="bg-amber-500 text-zinc-950 px-5 py-2 rounded-lg font-bold hover:bg-amber-400 transition-colors">
          Fazer Pedido
        </Link>
      </div>
    </header>
  );
}