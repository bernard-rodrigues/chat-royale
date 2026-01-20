import { useGame } from "../contexts/GameContext";
import { DiceContainer } from "./DiceContainer";

export const ActionHub = () => {
    const { actionLog, currentPlayer, team1HP, team2HP, maxHP } = useGame();
    
    const lastAction = actionLog.at(-1);
    const defenseIsVisible = lastAction?.type === "attack" && lastAction.value > 10;

    const healIsVisible = currentPlayer && (
        (currentPlayer.team === 1 && team1HP <= maxHP - 20) || (currentPlayer.team === 2 && team2HP <= maxHP - 20)
    )

    return (
        <div className="bg-amber-300 h-2/6 p-2 flex gap-2">
            {healIsVisible && <DiceContainer dice={6} />}
            <DiceContainer dice={20}/> 
            {defenseIsVisible && <DiceContainer dice={10}/>}
        </div>
    );
}