import { useGame, type Player } from "../contexts/GameContext";

interface PlayerProps{
    player: Player;
}

export const PlayerData = ({player}: PlayerProps) => {
    const {currentPlayer} = useGame();
    
    return(
        <div className={`
            w-fit px-2 py-1
            ${player.team === 1 ? "text-center font-bold text-blue-400" : "text-center font-bold text-red-400"}
            ${player === currentPlayer ? "bg-neutral-500" : "bg-neutral-300"}
        `}>{player.name}</div>
    );
}