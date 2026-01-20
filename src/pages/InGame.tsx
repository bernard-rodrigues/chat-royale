import { ActionHub } from "../components/ActionHub";
import { GamePanel } from "../components/GamePanel";

export const InGame = () => {
    return(
        <>
            <GamePanel/>
            <ActionHub/>
        </>
    );
}