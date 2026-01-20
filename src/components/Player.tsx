interface PlayerProps{
    playerName: string;
    isPlaying: boolean
}

export const Player = ({playerName, isPlaying}: PlayerProps) => {
    return(
        <div className={`
             w-fit px-2 py-1
            ${isPlaying ? "bg-neutral-500" : "bg-neutral-300"}
        `}>{playerName}</div>
    );
}