import Link from 'next/link';
import SpinningText from './SpinningText';

export default function Hero() {
  // Definimos o raio do círculo aqui para usar no container e garantir o centro perfeito
  const textRadius = 135; 

  return (
    <section id="inicio" className="relative flex flex-col items-center justify-center pt-36 pb-8 px-4 text-center overflow-hidden">
      
      {/* Container Principal do Emblema - ONDE FIZEMOS AS CORREÇÕES MÁGICAS */}
      <div 
        // 1. Damos um tamanho fixo ao container para centralizar os absolutos
        className="relative flex items-center justify-center mb-16" 
        style={{ width: `${textRadius * 2}px`, height: `${textRadius * 2}px` }}
      >
        
        {/* COMPONENTE GIRATÓRIO (Behind, z-10) */}
        <SpinningText 
          radius={textRadius} 
          fontSize="14px"
          // 2. A centralização absoluta definitiva: top/left 1/2 e translate negativo
          className="text-zinc-500 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10" 
          duration={25}
        >
          • A CHAPA BURGER • EST. 2026 • ARTESANAL • BY MOLZ3RA. CORP • POUSO ALEGRE MG • 77
        </SpinningText>

        {/* SEU TÍTULO EMPILHADO (In front, z-20) */}
        <h1 
          // 3. A mesma centralização absoluta definitiva para colar um no outro
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-5xl md:text-6xl font-bold text-amber-500 tracking-tighter z-20 text-center leading-[0.9]"
        >
          A<br/>CHAPA
        </h1>
      </div>

      {/* Subtítulo e Botão (Abaixo do título) */}
      <div className="z-10 text-center mt-4">
        <p className="text-xl md:text-2xl text-zinc-300 mb-8 max-w-lg mx-auto">
          O verdadeiro sabor artesanal, a um clique de distância.
        </p>
        
        <Link 
          href="#cardapio" 
          className="inline-block bg-amber-500 text-zinc-950 font-bold py-4 px-8 rounded-full text-lg hover:bg-amber-400 transition-colors shadow-lg hover:shadow-amber-500/20"
        >
          Ver Cardápio
        </Link>
      </div>
    </section>
  );
}