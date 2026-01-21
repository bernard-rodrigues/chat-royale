import { useGame } from "../contexts/GameContext";

interface HPBarProps {
  team: 1 | 2;
}

export const HPBar = ({ team }: HPBarProps) => {
  const { team1HP, team2HP, maxHP } = useGame();
  
  const currentHP = team === 1 ? team1HP : team2HP;
  const percentage = Math.max(0, (currentHP / maxHP) * 100);
  
  const isTeam1 = team === 1;
  const isCritical = percentage < 25;

  // Cores Temáticas
  const primaryColor = isTeam1 ? "bg-blue-500" : "bg-red-500";
  const glowColor = isTeam1 ? "shadow-blue-500/50" : "shadow-red-500/50";

  return (
    <div className={`w-full group ${isTeam1 ? "pr-8" : "pl-8"}`}>
      <div className="relative h-10 w-full bg-slate-950 rounded-md border-2 border-slate-800 p-1 overflow-hidden shadow-2xl">
        
        {/* BARRA DE RESTORE (Sombra Verde) */}
        {/* Esta barra não tem transição (ou é muito rápida) para que ela "pule" na frente da barra de HP quando curar */}
        <div 
        style={{ width: `${percentage}%` }}
        className={`absolute inset-y-1 ${isTeam1 ? "left-1" : "right-1"} 
            bg-emerald-400 opacity-50 z-0`} // Sem transição de largura para ser instantânea
        />
        
        {/* BARRA DE FUNDO (Dano/Ghost Effect) */}
        {/* Esta barra tem um delay maior para criar o efeito de "rastro" do dano */}
        <div 
          style={{ width: `${percentage}%` }}
          className={`absolute inset-y-1 ${isTeam1 ? "left-1" : "right-1"} 
            bg-white opacity-30 transition-all duration-1000 ease-out`}
        />

        {/* BARRA DE HP PRINCIPAL */}
        <div 
          style={{ width: `${percentage}%` }}
          className={`absolute inset-y-1 ${isTeam1 ? "left-1" : "right-1"} 
            ${primaryColor} ${glowColor} ${isCritical ? "animate-pulse" : ""} 
            transition-all duration-300 ease-out z-10 shadow-[0_0_10px_rgba(0,0,0,0.5)]`}
        >
          {/* Efeito de Brilho Superior (Glossy) */}
          <div className="absolute top-0 left-0 w-full h-1/3 bg-white/20" />
          
          {/* Partículas de "Energia" (Sutil) */}
          <div className={`absolute inset-0 opacity-20 bg-[linear-gradient(90deg,transparent_0%,rgba(255,255,255,0.4)_50%,transparent_100%)] bg-size-[200%_100%] animate-shimmer`} />
        </div>

        {/* TEXTO DO HP */}
        <div className={`absolute inset-0 z-30 flex items-center justify-between px-4`}>
            {/* Nome do Time (Sutil para não poluir) */}
            <span className="text-[10px] font-black uppercase tracking-tighter text-slate-100">
                T{team}
            </span>

            {/* Valor do HP com Sombra de Contorno (Stroke fake) */}
            <span className="text-xl font-black italic text-white drop-shadow-[0_2px_1px_rgba(0,0,0,1)] select-none">
                {currentHP}
                <span className="text-xs ml-1 opacity-70">/ {maxHP}</span>
            </span>
            </div>
      </div>
    </div>
  );
};