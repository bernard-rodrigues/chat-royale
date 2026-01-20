import { useGame } from "../contexts/GameContext";

interface DiceContainerProps{
    dice: 6 | 10 | 20;
}

export const DiceContainer = ({ dice }: DiceContainerProps) => {
    const {rollDice} = useGame()
    
    return(
        <div className="
            bg-cyan-300 h-full flex-1 
            flex flex-col
        ">
            <div className="
                bg-emerald-300 flex-1
                flex justify-center items-center
            ">
                <span className="text-4xl">{dice === 6 ? "✨" : dice === 20 ? "⚔️" : "🛡️"}</span>
            </div>
            <button 
                className="flex-1 text-4xl"
                onClick={() => rollDice(dice)}
            >
                D{dice}
            </button>
        </div>
    );
}