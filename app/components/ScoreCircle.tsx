const ScoreCircle = ({ score = 75 }: { score: number }) => {
    const radius = 40;
    const stroke = 8;
    const normalizedRadius = radius - stroke / 2;
    const circumference = 2 * Math.PI * normalizedRadius;
    const progress = score / 100;
    const strokeDashoffset = circumference * (1 - progress);

    return (
        <div className="relative w-[100px] h-[100px]">
            <svg
                height="100%"
                width="100%"
                viewBox="0 0 100 100"
                className="transform -rotate-90"
            >
                {/* Background circle */}
                <circle
                    cx="50"
                    cy="50"
                    r={normalizedRadius}
                    stroke="#E8E8E8"
                    strokeWidth={stroke}
                    fill="transparent"
                />
                {/* Partial circle with gradient */}
                <defs>
                    <linearGradient id="grad" x1="1" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#DC001A" />
                        <stop offset="100%" stopColor="#888888" />
                    </linearGradient>
                </defs>
                <circle
                    cx="50"
                    cy="50"
                    r={normalizedRadius}
                    stroke="url(#grad)"
                    strokeWidth={stroke}
                    fill="transparent"
                    strokeDasharray={circumference}
                    strokeDashoffset={strokeDashoffset}
                    strokeLinecap="round"
                />
            </svg>

            {/* Score text */}
            <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="font-bold text-sm text-[#111111]">{`${score}`}</span>
                <span className="text-[9px] text-[#888888] font-medium">/100</span>
            </div>
        </div>
    );
};

export default ScoreCircle;