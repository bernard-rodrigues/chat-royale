import { ActionHub } from "./components/ActionHub";
import { GamePanel } from "./components/GamePanel";
import { GameProvider } from "./contexts/GameContext";

export const App = () => {
  return(
    <main className="h-screen">
      <GameProvider>
        <GamePanel/>
        <ActionHub/>
      </GameProvider>
    </main>
  );
}