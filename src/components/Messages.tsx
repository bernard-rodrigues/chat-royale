import { useGame } from "../contexts/GameContext";

export const Messages = () => {
  const {message, messageIsVisible} = useGame();
  
    return (
        <>
            {messageIsVisible && 
            <div className="fixed bottom-[20%] left-1/2 -translate-x-1/2 w-full max-w-md z-50 px-4 animate-display-message">
                <div className="
                    relative bg-slate-950/90 backdrop-blur-sm
                    border-t-2 border-b-2 border-slate-800 
                    py-3 px-6 shadow-[0_0_20px_rgba(0,0,0,0.8)]
                    before:absolute before:inset-0 before:bg-linear-to-b before:from-white/5 before:to-transparent
                ">
                    {/* Detalhe de Canto (Acento de Jogo de Luta) */}
                    <div className="absolute top-0 left-0 w-2 h-full bg-blue-500 shadow-[0_0_10px_#3b82f6]" />
                    
                        <p className="
                        text-white text-lg font-bold italic tracking-wide uppercase text-center
                        drop-shadow-[0_2px_2px_rgba(0,0,0,1)]
                        ">
                            {message}
                        </p>
                    
                        {/* "Partículas" ou Detalhe Tecnológico */}
                        <div className="absolute bottom-1 right-2 flex gap-1">
                        <div className="w-1 h-1 bg-slate-700 rounded-full" />
                        <div className="w-1 h-1 bg-slate-500 rounded-full" />
                        <div className="w-1 h-1 bg-slate-300 rounded-full animate-pulse" />
                    </div>
                </div>
            </div>}
        </>
    );
};