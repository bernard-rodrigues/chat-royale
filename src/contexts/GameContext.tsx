import { createContext, useContext, useEffect, useRef, useState, type ReactNode } from "react";

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
    preStartRegister: (newPlayers?: Player[], newMaxHP?: HPOptions) => void;
    displayMessage: (content: string) => void;
    message: string;
    messageIsVisible: boolean;
}

const GameContext = createContext<GameContextData>({} as GameContextData);

export const GameProvider = ({ children }: { children: ReactNode }) => {
    const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    useEffect(() => {
        return () => {
            if (timerRef.current) clearTimeout(timerRef.current);
        };
    }, []);
    
    // STATES
    const [gameState, setGameState] = useState<GameState>("menu");
   
    // MAIN MENU
    const [players, setPlayers] = useState<Player[]>([]);
    
    const updateMaxHP = (newMaxHP: HPOptions) => {
        setMaxHP(newMaxHP);
        setTeam1HP(newMaxHP);
        setTeam2HP(newMaxHP);
    };

    const preStartRegister = (newPlayers?: Player[], newMaxHP?: HPOptions) => {
        // 1. Atualiza jogadores e HP
        const currentPlayers = newPlayers ?? players;
        setPlayers(currentPlayers);
        updateMaxHP(newMaxHP ?? maxHP);

        // 2. Limpa estados de jogo anterior
        setActionLog([]);
        setCurrentRound(1);
        setTurnOrder([]);
        setMessageIsVisible(false);

        // 3. NOVO SORTEIO MANUAL (Garante que o jogo recomece imediatamente)
        if (currentPlayers.length > 0) {
            const first = currentPlayers[Math.floor(Math.random() * currentPlayers.length)];
            setCurrentPlayer(first);
            setTurnOrder([first]);
        } else {
            setCurrentPlayer(null);
        }
    }
    
    // IN GAME
    const [currentPlayer, setCurrentPlayer] = useState<Player | null>(null);

    // useEffect(() => {
    //     if (gameState === "ingame" && players.length > 0 && !currentPlayer) {
    //         // 1. Sorteia o primeiro jogador
    //         const first = players[Math.floor(Math.random() * players.length)];
    //         setCurrentPlayer(first);
            
    //         // 2. Já inicia a fila com ele
    //         setTurnOrder([first]);
    //     }
    // }, [gameState, players]);

    const [currentRound, setCurrentRound] = useState(1);
    const [turnOrder, setTurnOrder] = useState<Player[]>([]);
    
    const [maxHP, setMaxHP] = useState<HPOptions>(200);
    const [team1HP, setTeam1HP] = useState(200);
    const [team2HP, setTeam2HP] = useState(200);

    useEffect(() => {
        if(team1HP === 0 || team2HP === 0){
            handleGameOver();
        }
    }, [team1HP, team2HP]);

    const [actionLog, setActionLog] = useState<Action[]>([]);

    const [message, setMessage] = useState("");
    const [messageIsVisible, setMessageIsVisible] = useState(false);

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
                displayMessage(`🎲${result}\n✨ Cura! Time ${currentPlayer.team} ganhou ${healValue}HP!`);
            }else if(dice === 10 && actionLog.length > 0){
                // D10: Last action must be an attack from opponent
                    // 1: Critical miss: take additional damage
                    // Other: Reduce damage taken by dice value
                const lastAction = actionLog.at(-1); 
                if (!lastAction) return;
                
                if(result === 1){
                    const failure = Math.floor(lastAction.value*0.5);
                    if(currentPlayer.team === 1 && team1HP - failure > 0 || currentPlayer.team === 2 && team2HP - failure > 0){
                        displayMessage(`🎲${result}\n❗ Falha crítica! Time ${currentPlayer.team} perdeu ${failure}HP!`);
                    }
                    currentPlayer.team === 1 ? setTeam1HP(prev => Math.max(0, prev - failure)) : setTeam2HP(prev => Math.max(0, prev - failure));
                    setActionLog(prev => [...prev, {player: currentPlayer, type: "defense", value: -failure, round: currentRound}]);
                }else{
                    currentPlayer.team === 1 ? setTeam1HP(prev => Math.min(prev + result, maxHP)) : setTeam2HP(prev => Math.min(prev + result, maxHP));
                    setActionLog(prev => [...prev, {player: currentPlayer, type: "defense", value: result, round: currentRound}]);
                    displayMessage(`🎲${result}\n🛡️ Defesa! Time ${currentPlayer.team} recuperou ${result}HP!`);
                }
            }
            else{
                //D20:
                    // 20: Double damage
                    // Other: Attacks with dice value
                const attackValue = result === 20 ? result*2 : result;
                if(currentPlayer.team === 1 && team2HP - attackValue > 0 || currentPlayer.team === 2 && team1HP - attackValue > 0){
                    displayMessage(`🎲${result}\n⚔️ Ataque${result === 20 ? " Crítico!!" : ""}! Time ${currentPlayer.team === 1 ? 2 : 1} perdeu ${attackValue}HP!`);
                }
                currentPlayer.team === 1 ? setTeam2HP(prev => Math.max(0, prev - attackValue)) : setTeam1HP(prev => Math.max(0, prev - attackValue));
                setActionLog(prev => [...prev, {player: currentPlayer, type: "attack", value: attackValue, round: currentRound}]);
            }
            toggleTurn();
        }else{
            alert("Jogador não definido")
        }
    };

    const handleState = (newState: GameState) => {
        setMessageIsVisible(false);
        setGameState(newState);
    }

    const displayMessage = (content: string, gameOver = false) => {
        // Limpa qualquer timer de mensagem anterior que esteja rodando
        if (timerRef.current) {
            clearTimeout(timerRef.current);
            timerRef.current = null;
        }
        
        setMessage(content);
        setMessageIsVisible(true);

        if(!gameOver){
            timerRef.current = setTimeout(() => {
                setMessageIsVisible(false);
                setMessage("");
            }, 3000);
        }
    }

    const handleGameOver = () => {
        if (timerRef.current) {
            clearTimeout(timerRef.current);
            timerRef.current = null;
        }
        debugger;
        const gameOverMessage = `Game Over!\nTeam ${team1HP === 0 ? 2 : 1} wins!`
        displayMessage(gameOverMessage, true);
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
            preStartRegister,
            displayMessage,
            message,
            messageIsVisible
        }}>
            {children}
        </GameContext.Provider>
    );
};

export const useGame = () => useContext(GameContext);