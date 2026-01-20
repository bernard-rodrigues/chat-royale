import { useGame } from "../contexts/GameContext";
import { PlayerData } from "./PlayerData";

interface PlayersContainerProps{
    team: 1 | 2;
}

export const PlayersContainer = ({ team }: PlayersContainerProps) => {
    const { players } = useGame();

    // Filtramos os jogadores do time antes de renderizar
    const teamPlayers = players.filter(p => p.team === team);

    return (
        <div className={`
            w-full h-2/3 p-2 flex gap-2
            ${team === 2 ? "items-end flex-col" : "items-start flex-col-reverse"}
        `}>
            {teamPlayers.map(player => (
                <PlayerData 
                    key={player.name} 
                    player={player}
                />
            ))}
        </div>
    );
}