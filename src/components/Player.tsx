interface PlayerProps{
    playerName: string
}

export const Player = ({playerName}: PlayerProps) => {
    return(
        <div className="bg-neutral-300 w-fit px-2 py-1">{playerName}</div>
    );
}