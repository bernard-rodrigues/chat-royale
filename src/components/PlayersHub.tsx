import { HPBar } from "./HPBar";
import { PlayersContainer } from "./PlayersContainer";

interface PlayersHubProps{
    team: 1 | 2;
}

export const PlayersHub = ({team}: PlayersHubProps) => {
    return(
        <div className={`
            flex-1 bg-fuchsia-300 p-2 flex 
            ${team === 1 ? "flex-col" : "flex-col-reverse"}
        `}>
            <PlayersContainer team={team}/>
            <HPBar team={team}/>
        </div>
    );
}