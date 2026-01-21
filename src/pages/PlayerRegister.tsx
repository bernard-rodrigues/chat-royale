import { useState, type FormEvent } from "react";
import { HP_VALUES, useGame, type HPOptions, type Player } from "../contexts/GameContext";

export const PlayerRegister = () => {
    const [playersPerTeam, setPlayersPerTeam] = useState(1); // 1, 2 ou 3 jogadores por time
    const [selectedHP, setSelectedHP] = useState<HPOptions>(200);
    const { preStartRegister, handleState } = useGame();

    const handleFormSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        
        const newPlayers: Player[] = [];

        // Captura os jogadores do Time 1
        for (let i = 1; i <= playersPerTeam; i++) {
            const name = formData.get(`t1-p${i}`)?.toString().trim();
            if (name) newPlayers.push({ name, team: 1 });
        }

        // Captura os jogadores do Time 2
        for (let i = 1; i <= playersPerTeam; i++) {
            const name = formData.get(`t2-p${i}`)?.toString().trim();
            if (name) newPlayers.push({ name, team: 2 });
        }

        preStartRegister(newPlayers, selectedHP);
        handleState("ingame");
    };

    return (
        <form 
            className="min-h-dvh flex flex-col items-center justify-center gap-6 bg-slate-900 text-white px-6 py-12"
            onSubmit={handleFormSubmit}
        >
            <h2 className="text-3xl font-bold text-amber-400">Battle Setup</h2>
            
            {/* Seletor de Formato */}
            <div className="flex flex-col items-center gap-2">
                <span>Format:</span>
                <div className="flex gap-2">
                    {[1, 2, 3].map(num => (
                        <button 
                            key={num}
                            type="button"
                            className={`px-4 py-2 rounded font-bold transition-all ${playersPerTeam === num ? "bg-amber-500 scale-110" : "bg-slate-700 opacity-50"}`}
                            onClick={() => setPlayersPerTeam(num)}
                        >
                            {num}v{num}
                        </button>
                    ))}
                </div>
            </div>

            {/* Colunas de Times */}
            <div className="flex flex-col gap-8 w-full max-w-2xl justify-center items-center">
                {/* Lado Time 1 */}
                <div className="flex flex-col gap-3 flex-1">
                    <h4 className="text-center font-bold text-blue-400">Team 1</h4>
                    {Array.from({ length: playersPerTeam }).map((_, i) => (
                        <input 
                            key={`t1-${i}`}
                            name={`t1-p${i+1}`}
                            placeholder={`Player ${i + 1}`}
                            className="p-2 rounded bg-slate-800 border border-blue-900 focus:outline-none focus:border-blue-400"
                            required
                        />
                    ))}
                </div>

                <div className="flex items-center font-black text-2xl text-slate-500">VS</div>

                {/* Lado Time 2 */}
                <div className="flex flex-col gap-3 flex-1 text-right">
                    <h4 className="text-center font-bold text-red-400">Team 2</h4>
                    {Array.from({ length: playersPerTeam }).map((_, i) => (
                        <input 
                            key={`t2-${i}`}
                            name={`t2-p${i+1}`}
                            placeholder={`Player ${i + 1}`}
                            className="p-2 rounded bg-slate-800 border border-red-900 focus:outline-none focus:border-red-400"
                            required
                        />
                    ))}
                </div>
            </div>

            {/* Seleção de HP */}
            <div className="flex flex-col items-center gap-3">
                <h3 className="text-sm uppercase tracking-widest text-slate-400">Max HP</h3>
                <div className="flex gap-2">
                    {HP_VALUES.map(hp => (
                        <button 
                            key={hp}
                            type="button"
                            className={`w-14 h-10 rounded font-bold transition-colors ${selectedHP === hp ? "bg-white text-slate-900" : "bg-slate-800 text-white border border-slate-700"}`}
                            onClick={() => setSelectedHP(hp)}
                        >
                            {hp}
                        </button>
                    ))}
                </div>
            </div>

            <button 
                type="submit" 
                className="mt-4 px-12 py-4 bg-amber-500 hover:bg-amber-400 text-slate-900 font-black rounded-lg uppercase tracking-tighter"
            >
                Start Fight
            </button>
        </form>
    );
};