import { useGame } from "../contexts/GameContext";
import { HPBar } from "./HPBar";
import { PlayersContainer } from "./PlayersContainer";

interface PlayersHubProps{
    team: 1 | 2;
}

export const PlayersHub = ({team}: PlayersHubProps) => {
    const {currentPlayer} = useGame()
    
    return(
        <div className={`
            flex-1 p-2 flex 
            ${team === 1 ? "flex-col" : "flex-col-reverse"}
            ${team === currentPlayer?.team ? "bg-amber-400/10" : ""}
            transition-colors duration-1000
        `}>
            {team === currentPlayer?.team && 
            <h3 className={`
                ${currentPlayer?.team === 1 ? "text-center font-bold text-blue-400 top-6" : "text-center font-bold text-red-400 bottom-6"}
                absolute left-1/2 -translate-x-1/2 animate-appear
            `}>Team {team} turn</h3>}
            <PlayersContainer team={team}/>
            <HPBar team={team}/>
        </div>
    );
}