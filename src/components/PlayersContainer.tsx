import { useGame } from "../contexts/GameContext";
import { Player } from "./Player";

interface PlayersContainerProps{
    team: 1 | 2;
}

export const PlayersContainer = ({ team }: PlayersContainerProps) => {
    const { players, currentPlayer } = useGame();

    // Filtramos os jogadores do time antes de renderizar
    const teamPlayers = players.filter(p => p.team === team);

    return (
        <div className={`
            w-full h-2/3 bg-lime-300 p-2 flex flex-col gap-2 
            ${team === 2 ? "items-end" : "items-start"}
        `}>
            {teamPlayers.map(player => (
                <Player 
                    key={player.name} 
                    playerName={player.name}
                    isPlaying={player === currentPlayer}
                />
            ))}
        </div>
    );
}