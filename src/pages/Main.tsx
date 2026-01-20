import { useGame } from "../contexts/GameContext";

export const Main = () => {
    const {handleState} = useGame();
    
    return(
        <div className="h-screen bg-orange-300 flex flex-col gap-16">
            <div className="flex justify-center items-center flex-1 bg-pink-300">
                <h1>Chat Royale</h1>
            </div>
            <div className="flex-1 bg-purple-300 flex flex-col gap-8 justify-center items-center">
                <button 
                    onClick={() => handleState("register")}
                    className="px-8 py-4 bg-red-300"
                >
                    Start
                </button>
                <button 
                    onClick={() => handleState("howtoplay")}
                    className="px-8 py-4 bg-red-300"
                >
                    How to Play
                </button>
            </div>
        </div>
    );
}