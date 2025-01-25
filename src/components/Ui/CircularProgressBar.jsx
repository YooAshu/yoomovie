const CircularProgressBar = ({ value, showProgress }) => {
    const radius = 20;
    const strokeWidth = 5;
    const circumference = 2 * Math.PI * radius;

    const progressAnimation = `
      @keyframes progress-animation {
        0% {
          stroke-dashoffset: ${circumference};
        }
        100% {
          stroke-dashoffset: ${circumference - (value / 10) * circumference};
        }
      }
    `;

    return (
        <>
            <div className="top-2 right-2 absolute" style={{ opacity: showProgress ? 1 : 0 }}>
                <style>{progressAnimation}</style>
                <svg
                    className="transform -rotate-90"
                    width={radius * 2 + strokeWidth}
                    height={radius * 2 + strokeWidth}
                >
                    <defs>
                        <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor="#4101bffa" />
                            <stop offset="100%" stopColor="#d805ff" />
                        </linearGradient>
                    </defs>
                    <circle
                        cx={radius + strokeWidth / 2}
                        cy={radius + strokeWidth / 2}
                        r={radius}
                        fill="transparent"
                        stroke="transparent"
                        strokeWidth={strokeWidth}
                        strokeLinecap="round"
                    />
                    <circle
                        cx={radius + strokeWidth / 2}
                        cy={radius + strokeWidth / 2}
                        r={radius}
                        fill="transparent"
                        stroke="url(#gradient)"
                        strokeWidth={strokeWidth}
                        strokeDasharray={circumference}
                        strokeDashoffset={circumference}
                        className="progress-circle"
                        style={{
                            animation: showProgress ? `progress-animation .5s ease-in-out forwards` : "none",
                        }}
                        strokeLinecap="round"
                    />
                    
                </svg>

            </div>
            <div className="top-5 right-5 absolute font-bold text-sm" style={{ opacity: showProgress ? 1 : 0,transition: 'opacity .5s' }}>{value}</div>
        </>
    );
};

export default CircularProgressBar