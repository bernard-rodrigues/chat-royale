import { ActionHub } from "./components/ActionHub";
import { GamePanel } from "./components/GamePanel";

export const App = () => {
  return(
    <>
      <GamePanel/>
      <ActionHub/>
    </>
  );
}