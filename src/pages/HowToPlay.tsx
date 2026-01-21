import { useGame } from "../contexts/GameContext";

export const HowToPlay = () => {
  const { handleState } = useGame();

  return (
    <div className="min-h-dvh bg-slate-950 p-6 flex flex-col gap-8 animate-appear-from-bottom">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-3xl font-black text-amber-400 uppercase italic tracking-tighter">
          How to Play
        </h1>
        <div className="h-1 w-20 bg-amber-500 mx-auto mt-2 rounded-full" />
      </div>

      {/* Cards Container */}
      <div className="flex flex-col gap-6 max-w-md mx-auto w-full">
        
        {/* Attack Card */}
        <div className="bg-slate-900 border-l-4 border-red-600 p-4 rounded-r-lg shadow-xl">
          <h2 className="text-xl font-bold text-white mb-1 uppercase flex items-center gap-2">
            <span>⚔️</span> Attack
          </h2>
          <p className="text-xs font-bold text-slate-400 mb-2 uppercase tracking-widest">Roll a D20</p>
          <ul className="text-sm text-slate-200 space-y-2">
            <li className="flex gap-2"><b className="text-amber-400">20:</b> Critical hit! 40 HP damage.</li>
            <li className="flex gap-2"><b className="text-slate-400">Any:</b> Damage equal to die result.</li>
          </ul>
        </div>

        {/* Heal Card */}
        <div className="bg-slate-900 border-l-4 border-emerald-500 p-4 rounded-r-lg shadow-xl">
          <h2 className="text-xl font-bold text-white mb-1 uppercase flex items-center gap-2">
            <span>✨</span> Heal
          </h2>
          <p className="text-[10px] text-emerald-400/80 font-bold uppercase mb-2">Req: Lost 20+ HP</p>
          <ul className="text-sm text-slate-200 space-y-1">
            <li><b className="text-amber-400">6:</b> Restore 20 HP</li>
            <li><b className="text-amber-400">5:</b> Restore 10 HP</li>
            <li><b className="text-slate-400">Any:</b> Restore HP equal to die.</li>
          </ul>
        </div>

        {/* Defense Card */}
        <div className="bg-slate-900 border-l-4 border-blue-500 p-4 rounded-r-lg shadow-xl">
          <h2 className="text-xl font-bold text-white mb-1 uppercase flex items-center gap-2">
            <span>🛡️</span> Defense
          </h2>
          <p className="text-[10px] text-blue-400/80 font-bold uppercase mb-2">Req: Last damage &gt; 10</p>
          <ul className="text-sm text-slate-200 space-y-2">
            <li className="leading-tight"><b className="text-red-500">1:</b> Critical Miss! +50% damage.</li>
            <li><b className="text-slate-400">Any:</b> Reduce damage by die result.</li>
          </ul>
        </div>
      </div>

      {/* Action Button */}
      <button 
        onClick={() => handleState("menu")}
        className="mt-auto mx-auto px-8 py-3 border-2 border-amber-500 text-amber-500 font-black uppercase rounded-lg hover:bg-amber-500 hover:text-slate-900 transition-colors"
      >
        Got it!
      </button>
    </div>
  );
};