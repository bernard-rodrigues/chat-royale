import { HPBar } from "./HPBar";
import { PlayersContainer } from "./PlayersContainer";

interface PlayersHubProps{
    team: 1 | 2;
    teamMembers: string[];
    maxHP: number;
    HP: number;
}

export const PlayersHub = ({team, teamMembers, maxHP, HP}: PlayersHubProps) => {
    return(
        <div className={`
            flex-1 bg-fuchsia-300 p-2 flex 
            ${team === 1 ? "flex-col" : "flex-col-reverse"}
        `}>
            <PlayersContainer players={teamMembers} team={team}/>
            <HPBar maxHP={maxHP} HP={HP} team={team}/>
        </div>
    );
}