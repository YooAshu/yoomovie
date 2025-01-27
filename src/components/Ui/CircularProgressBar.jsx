import React, { useEffect, useState } from 'react';

const CircularProgressBar = ({ value, showProgress }) => {
    const [offset, setOffset] = useState(0);
    const radius = 20;
    const strokeWidth = 5;
    const circumference = 2 * Math.PI * radius;

    // styling


    useEffect(() => {
        if (showProgress) {
            // Calculate the final offset based on the value
            const finalOffset = circumference - (value / 10) * circumference;
            // Animate to the final offset
            setOffset(finalOffset);
        } else {
            // Reset to initial state when not showing progress
            setOffset(circumference);
        }
    }, [showProgress]);

    return (
        <>
            <style>
                {`
                .rating::before{
                content:'';
                width: 45px;
                position: absolute;
                height: 45px;
                background: #00000063;
                box-shadow: 0 0 20px 0px #000000;
                border-radius: 100%;
                }
                `}
            </style>
            <div className="top-2 right-2 absolute rating" style={{ opacity: showProgress ? 1 : 0 }}>
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
                        strokeDashoffset={offset}
                        strokeLinecap="round"
                        style={{
                            transition: 'stroke-dashoffset 0.5s ease-in-out'
                        }}
                    />
                </svg>
            </div>
            <div
                className="top-5 right-5 absolute font-bold text-sm"
                style={{
                    opacity: showProgress ? 1 : 0,
                    transition: 'opacity 0.5s'
                }}
            >
                {value}
            </div>
        </>
    );
};

export default CircularProgressBar;