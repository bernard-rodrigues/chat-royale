import { useState } from "react";
import { PlayersHub } from "./PlayersHub";
import { Vs } from "./Vs";

export const GamePanel = () => {
    const [team1HP, setTeam1HP] = useState(83);
    const [team2HP, setTeam2HP] = useState(112);
    const [team1Members, setTeam1Members] = useState(["Miguelzin", "Gutin"]);
    const [team2Members, setTeam2Members] = useState(["Bernardin", "Thiaguin"]);
    const [maxHP, setMaxHP] = useState(200);
    
    return(
        <div className="h-4/6 bg-blue-300 flex flex-col gap-16 relative p-2">
            <PlayersHub team={1} HP={team1HP} maxHP={maxHP} teamMembers={team1Members}/>
            <Vs />
            <PlayersHub team={2} HP={team2HP} maxHP={maxHP} teamMembers={team2Members}/>
        </div>
    );
}