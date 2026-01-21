import { Messages } from "./components/Messages";
import { useGame } from "./contexts/GameContext";
import { HowToPlay } from "./pages/HowToPlay";
import { InGame } from "./pages/InGame";
import { Main } from "./pages/Main";
import { PlayerRegister } from "./pages/PlayerRegister";

export const App = () => {
  const {gameState} = useGame();
  
  return(
    <main className={`
      h-dvh bg-slate-900 relative
      ${gameState === "register" ? "overflow-x-hidden" : "overflow-y-hidden"}
    `}>
      { gameState === "menu" ? 
      <Main />
      : gameState === "register" ? 
      <PlayerRegister />
      : gameState === "ingame" ?
      <InGame />
      :
      <HowToPlay />
      }
      <Messages />
    </main>
  );
}