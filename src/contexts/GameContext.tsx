import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

export const HP_VALUES = [50, 100, 150, 200, 250] as const;
export type HPOptions = typeof HP_VALUES[number];

type GameState = "menu" | "ingame" | "howtoplay" | "register";

export interface Player{
    name: string;
    team: 1 | 2;
}

interface Action{
    player: Player | null;
    type: "attack" | "defense" | "heal";
    value: number;
    round: number;
}

interface GameContextData {
    players: Player[];
    team1HP: number;
    team2HP: number;
    maxHP: number;
    currentPlayer: Player | null;
    rollDice: (dice: 6 | 10 | 20) => void;
    actionLog: Action[];
    gameState: GameState;
    handleState: (newState: GameState) => void;
    preStartRegister: (newPlayers: Player[], newMaxHP: HPOptions) => void
}

const GameContext = createContext<GameContextData>({} as GameContextData);

export const GameProvider = ({ children }: { children: ReactNode }) => {
    // STATES
    const [gameState, setGameState] = useState<GameState>("menu");
   
    // MAIN MENU
    const [players, setPlayers] = useState<Player[]>([]);
    
    const updateMaxHP = (newMaxHP: HPOptions) => {
        setMaxHP(newMaxHP);
        setTeam1HP(newMaxHP);
        setTeam2HP(newMaxHP);
    };

    const preStartRegister = (newPlayers: Player[], newMaxHP: HPOptions) => {
        setPlayers(newPlayers);
        updateMaxHP(newMaxHP);
        // Limpa estados de jogo anterior
        setActionLog([]);
        setCurrentRound(1);
        setCurrentPlayer(null); 
        setTurnOrder([]);
    }
    
    // IN GAME
    const [currentPlayer, setCurrentPlayer] = useState<Player | null>(null);

    useEffect(() => {
        if (gameState === "ingame" && players.length > 0 && !currentPlayer) {
            // 1. Sorteia o primeiro jogador
            const first = players[Math.floor(Math.random() * players.length)];
            setCurrentPlayer(first);
            
            // 2. Já inicia a fila com ele
            setTurnOrder([first]);
        }
    }, [gameState, players]);

    const [currentRound, setCurrentRound] = useState(1);
    const [turnOrder, setTurnOrder] = useState<Player[]>([]);
    
    const [maxHP, setMaxHP] = useState(200);
    const [team1HP, setTeam1HP] = useState(200);
    const [team2HP, setTeam2HP] = useState(200);

    const [actionLog, setActionLog] = useState<Action[]>([]);

    const toggleTurn = () => {
        if (!currentPlayer || players.length === 0) return;

        // Se ainda estamos no Round 1, precisamos definir a ordem
        if (currentRound === 1) {
            // Adiciona o jogador atual na ordem se ele ainda não estiver lá
            // (Fazemos isso antes de sortear o próximo)
            setTurnOrder(prev => {
                if (prev.find(p => p.name === currentPlayer.name)) return prev;
                return [...prev, currentPlayer];
            });

            const playersWhoPlayed = actionLog.filter(a => a.round === 1).map(a => a.player?.name);
            playersWhoPlayed.push(currentPlayer.name); // Inclui o que acabou de jogar

            if (playersWhoPlayed.length >= players.length) {
                // FIM DO ROUND 1: Sobe o round e a ordem já está salva!
                setCurrentRound(2);
                // O próximo é o primeiro da fila (índice 0)
                setCurrentPlayer(turnOrder[0] || currentPlayer); 
                return;
            }

            // Lógica de sorteio normal para o Round 1 (Alternando times)
            const opponentTeam = currentPlayer.team === 1 ? 2 : 1;
            let availableOpponents = players.filter(p => 
                p.team === opponentTeam && !playersWhoPlayed.includes(p.name)
            );

            if (availableOpponents.length === 0) {
                availableOpponents = players.filter(p => p.team === opponentTeam);
            }

            const randomIndex = Math.floor(Math.random() * availableOpponents.length);
            setCurrentPlayer(availableOpponents[randomIndex]);

        } else {
            // ROUNDS 2, 3, 4... Apenas segue a fila
            const currentIndex = turnOrder.findIndex(p => p.name === currentPlayer.name);
            const nextIndex = (currentIndex + 1) % turnOrder.length;
            
            if (nextIndex === 0) {
                setCurrentRound(prev => prev + 1);
            }
            
            setCurrentPlayer(turnOrder[nextIndex]);
        }
    };
    
    
    const rollDice = (dice: 6 | 10 | 20) => {
        if(currentPlayer){
            const result = Math.floor(Math.random() * dice) + 1;
            if(dice === 6){
                // D6:
                    // 6: Heals 20HP
                    // 5: Heals 10HP
                    // Other: Heals dice value
                const healValue = result === 6 ? 20 : result === 5 ? 10 : result;
                currentPlayer.team === 1 ? setTeam1HP(prev => Math.min(prev + healValue, maxHP)) : setTeam2HP(prev => Math.min(prev + healValue, maxHP));
                setActionLog(prev => [...prev, {player: currentPlayer, type: "heal", value: healValue, round: currentRound}]);
            }else if(dice === 10 && actionLog.length > 0){
                // D10: Last action must be an attack from opponent
                    // 1: Critical miss: take additional damage
                    // Other: Reduce damage taken by dice value
                const lastAction = actionLog.at(-1); 
                if (!lastAction) return;
                
                if(result === 1){
                    const failure = Math.floor(lastAction.value*0.5);
                    currentPlayer.team === 1 ? setTeam1HP(prev => Math.max(0, prev - failure)) : setTeam2HP(prev => Math.max(0, prev - failure));
                    setActionLog(prev => [...prev, {player: currentPlayer, type: "defense", value: -failure, round: currentRound}]);
                }else{
                    currentPlayer.team === 1 ? setTeam1HP(prev => Math.min(prev + result, maxHP)) : setTeam2HP(prev => Math.min(prev + result, maxHP));
                    setActionLog(prev => [...prev, {player: currentPlayer, type: "defense", value: result, round: currentRound}]);
                }
            }
            else{
                //D20:
                    // 20: Double damage
                    // Other: Attacks with dice value
                const attackValue = result === 20 ? result*2 : result;
                currentPlayer.team === 1 ? setTeam2HP(prev => Math.max(0, prev - attackValue)) : setTeam1HP(prev => Math.max(0, prev - attackValue));
                setActionLog(prev => [...prev, {player: currentPlayer, type: "attack", value: attackValue, round: currentRound}]);
            }
            toggleTurn();
        }else{
            alert("Jogador não definido")
        }
    };

    const handleState = (newState: GameState) => {
        setGameState(newState);
    }

    return (
        <GameContext.Provider value={{
            gameState,
            handleState,
            players,
            team1HP,
            team2HP,
            maxHP,
            currentPlayer,
            rollDice,
            actionLog,
            preStartRegister
        }}>
            {children}
        </GameContext.Provider>
    );
};

export const useGame = () => useContext(GameContext);