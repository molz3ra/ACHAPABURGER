export default function Footer() {
  return (
    <footer className="bg-zinc-950 text-zinc-400 py-12 border-t border-zinc-800">
      <div className="max-w-5xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
        
        {/* Coluna 1: Marca */}
        <div>
          <h2 className="text-2xl font-bold text-amber-500 mb-4 tracking-tighter">A CHAPA.</h2>
          <p className="text-sm leading-relaxed">
            Hambúrguer de verdade, sem frescura. Chapa quente, queijo derretido e a melhor experiência de Pouso Alegre.
          </p>
        </div>
        
        {/* Coluna 2: Contato & Endereço */}
        <div>
          <h3 className="text-zinc-50 font-bold mb-4 uppercase tracking-wider text-sm">Onde Estamos</h3>
          <p className="text-sm mb-2 hover:text-amber-500 transition-colors cursor-default">📍 Centro, Pouso Alegre - MG</p>
          <p className="text-sm mb-2 hover:text-amber-500 transition-colors cursor-default">📞 (35) 99999-9999</p>
          <p className="text-sm hover:text-amber-500 transition-colors cursor-default">✉️ contato@achapaburger.com.br</p>
        </div>

        {/* Coluna 3: Horários */}
        <div>
          <h3 className="text-zinc-50 font-bold mb-4 uppercase tracking-wider text-sm">Horário de Funcionamento</h3>
          <p className="text-sm mb-1">Terça a Domingo</p>
          <p className="text-lg text-amber-500 font-bold mb-2">18:00 às 23:30</p>
          <p className="text-sm text-zinc-500">Fechado às Segundas</p>
        </div>
      </div>

      {/* Barra Inferior (Assinatura e Direitos) */}
      <div className="max-w-5xl mx-auto px-4 pt-8 border-t border-zinc-800/50 flex flex-col md:flex-row justify-between items-center gap-4 text-xs">
        <p>© 2026 A Chapa Burger. Todos os direitos reservados.</p>
        <p>
          Desenvolvido com molz3ra💛 por <span className="text-amber-500 font-bold tracking-widest">MOLZ3RA CORP</span>.
        </p>
      </div>
    </footer>
  );
}