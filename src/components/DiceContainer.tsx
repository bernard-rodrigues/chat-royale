interface DiceContainerProps{
    dice: "d6" | "d10" | "d20";
}

export const DiceContainer = ({ dice }: DiceContainerProps) => {
    return(
        <div className="
            bg-cyan-300 h-full flex-1 
            flex flex-col
        ">
            <div className="
                bg-emerald-300 flex-1
                flex justify-center items-center
            ">
                <span className="text-4xl">{dice === "d6" ? "✨" : dice === "d20" ? "⚔️" : "🛡️"}</span>
            </div>
            <button className="flex-1 text-4xl">{dice.toUpperCase()}</button>
        </div>
    );
}