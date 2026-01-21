import { useGame } from "../contexts/GameContext";

interface DiceContainerProps{
    dice: 6 | 10 | 20;
}

export const DiceContainer = ({ dice }: DiceContainerProps) => {
    const {rollDice} = useGame()
    
    return(
        <div className="
            bg-slate-950 h-full flex-1 p-2 rounded
            flex flex-col
        ">
            <div className="
                flex-1 
                flex justify-center items-center
            ">
                <span className="text-4xl">{dice === 6 ? "✨" : dice === 20 ? "⚔️" : "🛡️"}</span>
            </div>
            <button 
                className="flex-1 rounded bg-amber-500 hover:bg-amber-400 text-4xl font-black italic text-white drop-shadow-[0_2px_1px_rgba(0,0,0,1)] select-none"
                onClick={() => rollDice(dice)}
            >
                D{dice}
            </button>
        </div>
    );
}