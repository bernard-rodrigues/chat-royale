import { PlayersHub } from "./PlayersHub";
import { Vs } from "./Vs";

export const GamePanel = () => {
    return(
        <>
            <PlayersHub />
            <Vs />
            <PlayersHub />
        </>
    );
}