import { PlayersHub } from "./PlayersHub";
import { Vs } from "./Vs";

export const GamePanel = () => {    
    return(
        <div className="h-4/6 flex flex-col gap-16 relative p-2 animate-appear-from-top">
            <PlayersHub team={1} />
            <Vs />
            <PlayersHub team={2} />
        </div>
    );
}