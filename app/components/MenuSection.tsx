"use client";

import Image from 'next/image';
import { useState } from 'react';

interface CartItem {
  nome: string;
  precoNum: number;
  qtde: number;
}

export default function MenuSection() {
  const [cart, setCart] = useState<CartItem[]>([]);
  // Novo estado para controlar se a janela do carrinho está aberta ou fechada
  const [isCartOpen, setIsCartOpen] = useState(false);

  const parsePreco = (precoStr: string) => parseFloat(precoStr.replace("R$ ", "").replace(",", "."));
  const formatPreco = (precoNum: number) => `R$ ${precoNum.toFixed(2).replace(".", ",")}`;

// Função que roda quando clicamos no botão de adicionar
  const adicionarAoCarrinho = (nome: string, precoStr: string) => {
    const precoNum = parsePreco(precoStr);
    
    setCart(prev => {
      // Verifica se o lanche já tá no carrinho
      const itemExiste = prev.find(item => item.nome === nome);
      
      if (itemExiste) {
        // Se já tem, só aumenta a quantidade
        return prev.map(item => item.nome === nome ? { ...item, qtde: item.qtde + 1 } : item);
      }
      // Se não tem, adiciona ele novo na lista
      return [...prev, { nome, precoNum, qtde: 1 }];
    });
    
    // A linha setIsCartOpen(true) foi removida daqui! 
  };

  // NOVA FUNÇÃO: Aumenta ou diminui a quantidade na sacola
  const alterarQuantidade = (nome: string, delta: number) => {
    setCart(prev => prev.map(item => {
      if (item.nome === nome) {
        return { ...item, qtde: item.qtde + delta };
      }
      return item;
    }).filter(item => item.qtde > 0)); // Se a quantidade chegar a 0, remove da lista
  };

  // NOVA FUNÇÃO: Limpa o carrinho inteiro
  const limparCarrinho = () => {
    setCart([]);
    setIsCartOpen(false); // Fecha a janela também
  };

  const totalCarrinho = cart.reduce((acc, item) => acc + (item.precoNum * item.qtde), 0);
  const qtdeItens = cart.reduce((acc, item) => acc + item.qtde, 0);

  const finalizarPedidoWhatsApp = () => {
    const numeroWhatsApp = "5511999999999"; 
    let mensagem = "Olá! Gostaria de fazer o seguinte pedido:\n\n";
    
    cart.forEach(item => {
      mensagem += `- ${item.qtde}x ${item.nome} (${formatPreco(item.precoNum * item.qtde)})\n`;
    });
    
    mensagem += `\n*Total: ${formatPreco(totalCarrinho)}*`;
    mensagem += `\n\nPodem confirmar o tempo de entrega?`;
    
    const url = `https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(mensagem)}`;
    window.open(url, '_blank');
  };

  return (
    <section id="cardapio" className="scroll-mt-24 pt-8 pb-32 px-4 max-w-5xl mx-auto relative z-10 bg-zinc-900">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-5xl font-bold text-amber-500 mb-4 tracking-tighter">
          Nosso Cardápio
        </h2>
        <p className="text-zinc-400">Os clássicos que todo mundo ama, servidos com perfeição.</p>
      </div>

      {/* --- SEÇÃO: HAMBÚRGUERES --- */}
      <h3 className="text-2xl md:text-3xl font-bold text-zinc-50 mb-8 border-b border-zinc-800 pb-2">
        Hambúrgueres
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
        
        {/* Lanche 1 - X-Burguer */}
        <div className="bg-zinc-800 p-6 rounded-2xl border border-zinc-700 hover:border-amber-500 transition-colors group flex flex-col shadow-lg">
          <div className="relative w-full h-48 mb-6 rounded-xl overflow-hidden bg-zinc-700 p-4 flex items-center justify-center">
            <Image src="/img/X-Burguer.png" alt="X-Burguer" fill sizes="(max-width: 768px) 100vw, 50vw" className="object-contain transition-transform duration-300 -translate-y-4 scale-110 group-hover:scale-125" />
          </div>
          <div className="flex justify-between items-start mb-4">
            <h3 className="text-xl font-bold text-zinc-50 group-hover:text-amber-500 transition-colors">X-Burguer</h3>
            <span className="text-amber-400 font-bold text-lg">R$ 20,00</span>
          </div>
          <p className="text-zinc-400 mb-6 text-sm md:text-base h-16">
            O clássico sem erro: pão macio, hambúrguer artesanal e muito queijo cheddar derretido.
          </p>
          <button onClick={() => adicionarAoCarrinho("X-Burguer", "R$ 20,00")} className="w-full bg-amber-500 hover:bg-amber-400 text-zinc-950 font-bold py-3 rounded-xl transition-all mt-auto shadow-lg hover:shadow-amber-500/20 active:scale-95">
            Adicionar ao Pedido
          </button>
        </div>

        {/* Lanche 2 - X-Salada */}
        <div className="bg-zinc-800 p-6 rounded-2xl border border-zinc-700 hover:border-amber-500 transition-colors group flex flex-col shadow-lg">
          <div className="relative w-full h-48 mb-6 rounded-xl overflow-hidden bg-zinc-700 p-4 flex items-center justify-center">
            <Image src="/img/X-Salada.png" alt="X-Salada" fill sizes="(max-width: 768px) 100vw, 50vw" className="object-contain transition-transform duration-300 group-hover:scale-105" />
          </div>
          <div className="flex justify-between items-start mb-4">
            <h3 className="text-xl font-bold text-zinc-50 group-hover:text-amber-500 transition-colors">X-Salada</h3>
            <span className="text-amber-400 font-bold text-lg">R$ 24,00</span>
          </div>
          <p className="text-zinc-400 mb-6 text-sm md:text-base h-16">
            Pão, hambúrguer artesanal, queijo prato, alface americana fresquinha e rodelas de tomate.
          </p>
          <button onClick={() => adicionarAoCarrinho("X-Salada", "R$ 24,00")} className="w-full bg-amber-500 hover:bg-amber-400 text-zinc-950 font-bold py-3 rounded-xl transition-all mt-auto shadow-lg hover:shadow-amber-500/20 active:scale-95">
            Adicionar ao Pedido
          </button>
        </div>

        {/* Lanche 3 - Duplo Cheeseburguer */}
        <div className="bg-zinc-800 p-6 rounded-2xl border border-zinc-700 hover:border-amber-500 transition-colors group flex flex-col shadow-lg">
          <div className="relative w-full h-48 mb-6 rounded-xl overflow-hidden bg-zinc-700 p-4 flex items-center justify-center">
            <Image src="/img/Duplo-Cheeseburguer.png" alt="Duplo Cheeseburguer" fill sizes="(max-width: 768px) 100vw, 50vw" className="object-contain transition-transform duration-300 group-hover:scale-105" />
          </div>
          <div className="flex justify-between items-start mb-4">
            <h3 className="text-xl font-bold text-zinc-50 group-hover:text-amber-500 transition-colors">Duplo Cheeseburguer</h3>
            <span className="text-amber-400 font-bold text-lg">R$ 32,00</span>
          </div>
          <p className="text-zinc-400 mb-6 text-sm md:text-base h-16">
            Para quem tem muita fome: dois suculentos hambúrgueres artesanais e dobro de queijo cheddar.
          </p>
          <button onClick={() => adicionarAoCarrinho("Duplo Cheeseburguer", "R$ 32,00")} className="w-full bg-amber-500 hover:bg-amber-400 text-zinc-950 font-bold py-3 rounded-xl transition-all mt-auto shadow-lg hover:shadow-amber-500/20 active:scale-95">
            Adicionar ao Pedido
          </button>
        </div>

        {/* Lanche 4 - X-Tudo */}
        <div className="bg-zinc-800 p-6 rounded-2xl border border-zinc-700 hover:border-amber-500 transition-colors group flex flex-col shadow-lg">
          <div className="relative w-full h-48 mb-6 rounded-xl overflow-hidden bg-zinc-700 p-4 flex items-center justify-center">
            <Image src="/img/X-Tudo.png" alt="X-Tudo" fill sizes="(max-width: 768px) 100vw, 50vw" className="object-contain transition-transform duration-300 group-hover:scale-105" />
          </div>
          <div className="flex justify-between items-start mb-4">
            <h3 className="text-xl font-bold text-zinc-50 group-hover:text-amber-500 transition-colors">X-Tudo</h3>
            <span className="text-amber-400 font-bold text-lg">R$ 38,00</span>
          </div>
          <p className="text-zinc-400 mb-6 text-sm md:text-base h-16">
            O gigante da casa! Hambúrguer, queijo, bacon crocante, ovo, presunto, alface e tomate.
          </p>
          <button onClick={() => adicionarAoCarrinho("X-Tudo", "R$ 38,00")} className="w-full bg-amber-500 hover:bg-amber-400 text-zinc-950 font-bold py-3 rounded-xl transition-all mt-auto shadow-lg hover:shadow-amber-500/20 active:scale-95">
            Adicionar ao Pedido
          </button>
        </div>
      </div>

      {/* --- SEÇÃO: ACOMPANHAMENTOS --- */}
      <h3 className="text-2xl md:text-3xl font-bold text-zinc-50 mb-8 border-b border-zinc-800 pb-2">
        Acompanhamentos
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
        
        {/* Acompanhamento 1 - Batata Frita */}
        <div className="bg-zinc-800 p-6 rounded-2xl border border-zinc-700 hover:border-amber-500 transition-colors group flex flex-col shadow-lg">
          <div className="relative w-full h-48 mb-6 rounded-xl overflow-hidden bg-zinc-700 p-4 flex items-center justify-center">
            <Image src="/img/Batata-Frita.png" alt="Batata Frita" fill sizes="(max-width: 768px) 100vw, 50vw" className="object-contain transition-transform duration-300 group-hover:scale-105" />
          </div>
          <div className="flex justify-between items-start mb-4">
            <h3 className="text-xl font-bold text-zinc-50 group-hover:text-amber-500 transition-colors">Batata Frita</h3>
            <span className="text-amber-400 font-bold text-lg">R$ 15,00</span>
          </div>
          <p className="text-zinc-400 mb-6 text-sm md:text-base h-16">
            Porção generosa de batatas fritas sequinhas e crocantes. Acompanha nossa maionese da casa.
          </p>
          <button onClick={() => adicionarAoCarrinho("Porção de Batata Frita", "R$ 15,00")} className="w-full bg-zinc-700 hover:bg-amber-500 hover:text-zinc-950 text-zinc-50 font-bold py-3 rounded-xl transition-all mt-auto active:scale-95">
            Adicionar ao Pedido
          </button>
        </div>

        {/* Acompanhamento 2 - Nuggets */}
        <div className="bg-zinc-800 p-6 rounded-2xl border border-zinc-700 hover:border-amber-500 transition-colors group flex flex-col shadow-lg">
          <div className="relative w-full h-48 mb-6 rounded-xl overflow-hidden bg-zinc-700 p-4 flex items-center justify-center">
            <Image src="/img/Nuggets777.png" alt="Nuggets" fill sizes="(max-width: 768px) 100vw, 50vw" className="object-contain transition-transform duration-300 group-hover:scale-105" />
          </div>
          <div className="flex justify-between items-start mb-4">
            <h3 className="text-xl font-bold text-zinc-50 group-hover:text-amber-500 transition-colors">Nuggets Crocantes</h3>
            <span className="text-amber-400 font-bold text-lg">R$ 18,00</span>
          </div>
          <p className="text-zinc-400 mb-6 text-sm md:text-base h-16">
            10 unidades de nuggets de frango dourados, perfeitos para mergulhar no molho barbecue.
          </p>
          <button onClick={() => adicionarAoCarrinho("Porção de Nuggets", "R$ 18,00")} className="w-full bg-zinc-700 hover:bg-amber-500 hover:text-zinc-950 text-zinc-50 font-bold py-3 rounded-xl transition-all mt-auto active:scale-95">
            Adicionar ao Pedido
          </button>
        </div>
      </div>

      {/* --- SEÇÃO: BEBIDAS --- */}
      <h3 className="text-2xl md:text-3xl font-bold text-zinc-50 mb-8 border-b border-zinc-800 pb-2">
        Bebidas
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* Bebida 1 - Coca-Cola */}
        <div className="bg-zinc-800 p-6 rounded-2xl border border-zinc-700 hover:border-amber-500 transition-colors group flex flex-col shadow-lg">
          <div className="relative w-full h-48 mb-6 rounded-xl overflow-hidden bg-zinc-700 p-4 flex items-center justify-center">
            <Image src="/img/Coca-Cola-Lata777.png" alt="Coca-Cola Lata" fill sizes="(max-width: 768px) 100vw, 50vw" className="object-contain transition-transform duration-300 group-hover:scale-105" />
          </div>
          <div className="flex justify-between items-start mb-4">
            <h3 className="text-xl font-bold text-zinc-50 group-hover:text-amber-500 transition-colors">Coca-Cola Lata</h3>
            <span className="text-amber-400 font-bold text-lg">R$ 6,00</span>
          </div>
          <p className="text-zinc-400 mb-6 text-sm md:text-base h-16">
            Refrigerante em lata 350ml, estupidamente gelado.
          </p>
          <button onClick={() => adicionarAoCarrinho("Coca-Cola Lata", "R$ 6,00")} className="w-full bg-zinc-700 hover:bg-amber-500 hover:text-zinc-950 text-zinc-50 font-bold py-3 rounded-xl transition-all mt-auto active:scale-95">
            Adicionar ao Pedido
          </button>
        </div>

        {/* Bebida 2 - Cerveja Artesanal */}
        <div className="bg-zinc-800 p-6 rounded-2xl border border-zinc-700 hover:border-amber-500 transition-colors group flex flex-col shadow-lg">
          <div className="relative w-full h-48 mb-6 rounded-xl overflow-hidden bg-zinc-700 p-4 flex items-center justify-center">
            <Image src="/img/Cerveja-Artesanal.png" alt="Cerveja Artesanal" fill sizes="(max-width: 768px) 100vw, 50vw" className="object-contain transition-transform duration-300 group-hover:scale-105" />
          </div>
          <div className="flex justify-between items-start mb-4">
            <h3 className="text-xl font-bold text-zinc-50 group-hover:text-amber-500 transition-colors">Cerveja Artesanal</h3>
            <span className="text-amber-400 font-bold text-lg">R$ 16,00</span>
          </div>
          <p className="text-zinc-400 mb-6 text-sm md:text-base h-16">
            Cerveja tipo IPA 500ml, aroma cítrico e amargor perfeito para acompanhar os hambúrgueres.
          </p>
          <button onClick={() => adicionarAoCarrinho("Cerveja Artesanal", "R$ 16,00")} className="w-full bg-zinc-700 hover:bg-amber-500 hover:text-zinc-950 text-zinc-50 font-bold py-3 rounded-xl transition-all mt-auto active:scale-95">
            Adicionar ao Pedido
          </button>
        </div>
      </div>

      {/* --- A BARRA FIXA (Agora abre o Modal em vez de mandar pro Zap) --- */}
      {(cart.length > 0 && !isCartOpen) && (
        <div className="fixed bottom-0 left-0 w-full bg-zinc-950/95 backdrop-blur-md border-t border-zinc-800 p-4 z-[60] flex justify-center shadow-[0_-10px_40px_-15px_rgba(0,0,0,0.5)] animate-in slide-in-from-bottom-10 fade-in duration-300">
          <div className="max-w-5xl w-full flex justify-between items-center px-2">
            <div>
              <p className="text-zinc-400 text-sm font-medium">
                {qtdeItens} {qtdeItens === 1 ? 'item' : 'itens'} no pedido
              </p>
              <p className="text-amber-500 font-bold text-2xl tracking-tight">
                {formatPreco(totalCarrinho)}
              </p>
            </div>
            <button
              onClick={() => setIsCartOpen(true)}
              className="bg-amber-500 text-zinc-950 font-black py-3 px-8 rounded-xl hover:bg-amber-400 transition-all hover:scale-105 active:scale-95 shadow-lg shadow-amber-500/20"
            >
              Ver Sacola
            </button>
          </div>
        </div>
      )}

      {/* --- O MODAL DO CARRINHO (A Janelinha flutuante) --- */}
      {isCartOpen && (
        <div className="fixed inset-0 z-[70] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-zinc-900 w-full max-w-md rounded-2xl p-6 relative flex flex-col max-h-[85vh] border border-zinc-800 shadow-2xl animate-in zoom-in-95 duration-200">
            
            {/* Cabeçalho do Modal */}
            <div className="flex justify-between items-center mb-6 pb-4 border-b border-zinc-800">
              <h3 className="text-2xl font-bold text-zinc-50">Sua Sacola</h3>
              <button onClick={() => setIsCartOpen(false)} className="text-zinc-400 hover:text-white transition-colors text-2xl font-bold p-2 leading-none">
                &times;
              </button>
            </div>

            {/* Lista de Itens (Com Scroll se ficar muito grande) */}
            <div className="flex-1 overflow-y-auto mb-6 pr-2 space-y-6">
              {cart.map(item => (
                <div key={item.nome} className="flex justify-between items-center">
                  <div className="flex-1">
                    <p className="font-bold text-zinc-50">{item.nome}</p>
                    <p className="text-amber-500 text-sm font-medium">{formatPreco(item.precoNum * item.qtde)}</p>
                  </div>
                  
                  {/* Controles de + e - */}
                  <div className="flex items-center gap-3 bg-zinc-800 rounded-lg p-1 border border-zinc-700">
                    <button onClick={() => alterarQuantidade(item.nome, -1)} className="w-8 h-8 rounded-md bg-zinc-700 hover:bg-zinc-600 text-zinc-50 font-bold transition-colors flex items-center justify-center">
                      -
                    </button>
                    <span className="text-zinc-50 font-bold w-4 text-center">{item.qtde}</span>
                    <button onClick={() => alterarQuantidade(item.nome, 1)} className="w-8 h-8 rounded-md bg-amber-500 hover:bg-amber-400 text-zinc-950 font-bold transition-colors flex items-center justify-center">
                      +
                    </button>
                  </div>
                </div>
              ))}
              
              {/* Mensagem se tentar esvaziar pelo botão de "-" e sobrar 0 */}
              {cart.length === 0 && (
                <p className="text-zinc-400 text-center py-8">Sua sacola está vazia.</p>
              )}
            </div>

            {/* Rodapé do Modal (Total e Botões) */}
            {cart.length > 0 && (
              <div className="pt-4 border-t border-zinc-800">
                <div className="flex justify-between items-center mb-6">
                  <span className="text-zinc-400 font-medium">Total do Pedido</span>
                  <span className="text-3xl font-black text-amber-500 tracking-tight">{formatPreco(totalCarrinho)}</span>
                </div>
                
                <div className="flex gap-3">
                  <button onClick={limparCarrinho} className="flex-1 bg-zinc-800 text-zinc-300 py-3 rounded-xl font-bold hover:bg-zinc-700 transition-colors border border-zinc-700">
                    Esvaziar
                  </button>
                  <button onClick={finalizarPedidoWhatsApp} className="flex-[2] bg-[#25D366] text-white py-3 rounded-xl font-bold hover:bg-[#20b858] transition-colors shadow-lg shadow-[#25D366]/20 flex items-center justify-center gap-2">
                    Enviar no WhatsApp
                  </button>
                </div>
              </div>
            )}
            
          </div>
        </div>
      )}

    </section>
  );
}