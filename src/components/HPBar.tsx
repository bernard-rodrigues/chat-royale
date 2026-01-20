interface HPBarProps{
    HP: number;
    maxHP: number;
    team: 1 | 2;
}

export const HPBar = ({HP, maxHP, team}: HPBarProps) => {
    return(
        <div className="h-1/3 w-full bg-gray-300 p-2 relative">
            <div style={{width: `${100*(HP/maxHP)}%`}} className="bg-green-300 h-full" />
            <div className={`
                absolute ${team === 1 ? "right-4 -top-1/2 translate-y-1/2" : "left-4 -bottom-1/2 -translate-y-1/2"}
                bg-indigo-300 p-1   
            `}>
                <span>{HP}/{maxHP}</span>
            </div>
        </div>
    );
}