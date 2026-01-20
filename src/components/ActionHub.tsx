import { DiceContainer } from "./DiceContainer";

export const ActionHub = () => {
    return(
        <div className="bg-amber-300 h-2/6 p-2 flex gap-2">
            <DiceContainer dice="d6"/>
            <DiceContainer dice="d20"/>
            <DiceContainer dice="d10"/>
        </div>
    );
}