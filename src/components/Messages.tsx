import { useGame } from "../contexts/GameContext";

export const Messages = () => {
  const {message, messageIsVisible, preStartRegister, team1HP, team2HP, handleState} = useGame();
  
    return (
        <>
            {messageIsVisible && 
            <div className={`fixed bottom-[20%] left-1/2 -translate-x-1/2 w-full max-w-md z-50 px-4 ${team1HP !== 0 && team2HP !== 0 ? "animate-display-message" : "animate-appear-from-top"}`}>
                <div className="
                    relative bg-slate-950/90 backdrop-blur-sm
                    border-t-2 border-b-2 border-slate-800 
                    py-3 px-6 shadow-[0_0_20px_rgba(0,0,0,0.8)]
                ">
                    {/* Detalhe de Canto (Acento de Jogo de Luta) */}
                    <div className="absolute top-0 left-0 w-2 h-full bg-blue-500 shadow-[0_0_10px_#3b82f6]" />
                    
                        <p 
                            className="
                                text-white text-lg font-bold italic tracking-wide uppercase text-center
                                drop-shadow-[0_2px_2px_rgba(0,0,0,1)]
                            "
                            style={{whiteSpace: 'pre-wrap'}}    
                        >
                            {message}
                        </p>
                    
                        {/* "Partículas" ou Detalhe Tecnológico */}
                        <div className="flex gap-1">
                        <div className="w-1 h-1 bg-slate-700 rounded-full" />
                        <div className="w-1 h-1 bg-slate-500 rounded-full" />
                        <div className="w-1 h-1 bg-slate-300 rounded-full animate-pulse" />
                        
                        <div className={`flex gap-3 ${team1HP !== 0 && team2HP !== 0 ? "hidden" : ""}`}>
                            <button 
                                onClick={() => preStartRegister()}
                                className="mt-4 px-12 py-4 bg-amber-500 hover:bg-amber-400 text-slate-900 font-black rounded-lg uppercase tracking-tighter"
                            >
                                Play again
                            </button>
                            <button 
                                onClick={() => handleState("menu")}
                                className="mt-4 px-12 py-4 bg-amber-500 hover:bg-amber-400 text-slate-900 font-black rounded-lg uppercase tracking-tighter"
                            >
                                Main Menu
                            </button>
                        </div>
                    </div>
                </div>
            </div>}
        </>
    );
};