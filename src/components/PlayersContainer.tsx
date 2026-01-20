import { Player } from "./Player";

interface PlayersContainerProps{
    players: string[];
    team: 1 | 2;
}

export const PlayersContainer = ({players, team}: PlayersContainerProps) => {
    return(
        <div className={`
            w-full h-2/3 bg-lime-300 p-2
            flex flex-col gap-2 ${team === 2 ? "items-end" : ""}
        `}>
            {players.map(player => (
                <Player key={player} playerName={player}/>
            ))}
        </div>
    );
}