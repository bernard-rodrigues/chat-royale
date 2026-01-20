import { useGame } from "../contexts/GameContext";

export const Main = () => {
    const {handleState} = useGame();
    
    return(
        <div className="h-screen bg-slate-900 flex flex-col gap-16">
            <div className="flex flex-col justify-center items-center flex-1 gap-4">
                <h1 className="text-4xl font-bold text-amber-400">Chat Royale</h1>
                <h2 className="text-3xl">✨⚔️🛡️</h2>
            </div>
            <div className="flex-1 flex flex-col gap-8 justify-center items-center">
                <button 
                    onClick={() => handleState("register")}
                    className="mt-4 px-12 py-4 bg-amber-500 hover:bg-amber-400 text-slate-900 font-black rounded-lg uppercase tracking-tighter"
                >
                    Start
                </button>
                <button 
                    onClick={() => handleState("howtoplay")}
                    className="mt-4 px-12 py-4 bg-amber-500 hover:bg-amber-400 text-slate-900 font-black rounded-lg uppercase tracking-tighter"
                >
                    How to Play
                </button>
            </div>
        </div>
    );
}