import { useGame } from "./contexts/GameContext";
import { HowToPlay } from "./pages/HowToPlay";
import { InGame } from "./pages/InGame";
import { Main } from "./pages/Main";
import { PlayerRegister } from "./pages/PlayerRegister";

export const App = () => {
  const {gameState} = useGame();
  
  return(
    <main className="h-dvh">      
        { gameState === "menu" ? 
        <Main />
        : gameState === "register" ? 
        <PlayerRegister />
        : gameState === "ingame" ?
        <InGame />
        :
        <HowToPlay />
        }
    </main>
  );
}