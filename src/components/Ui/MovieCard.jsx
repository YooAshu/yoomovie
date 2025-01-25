import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import CircularProgressBar from './CircularProgressBar';

const MovieCard = ({ data, className, titleDisplay, isWebSeries }) => {
    const { title, poster_path, id, name, vote_average } = data
    const navigate = useNavigate();
    const [showProgress, setShowProgress] = useState(false);

    const handleMouseEnter = () => {
        setShowProgress(true); // Show progress bar animation on hover
    };
    const handleMouseLeave = () => {
        setShowProgress(false); // Stop progress bar animation when hover is removed
    };
    const handleTouchStart = () => {
        setShowProgress(true); // Show progress bar animation on touch
    };
    const handleTouchEnd = () => {
        setShowProgress(false); // Stop progress bar animation when touch is released
    };

    const handleClick = () => {
        if (isWebSeries) {
            navigate(`/webseries/${id}`)
        }
        else {
            navigate(`/${id}`)
        }
    }
    return (
        <div className={`relative rounded-3xl ${className}`}
            onClick={handleClick}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onTouchStart={handleTouchStart}  // Added touch start event
            onTouchEnd={handleTouchEnd}      // Added touch end event
        >
            <CircularProgressBar value={vote_average.toFixed(1)} showProgress={showProgress} />
            <img src={`https://image.tmdb.org/t/p/w500/${poster_path}`} alt={`${title || name}`} className='rounded-3xl w-full' />
            <div className={` ${titleDisplay} absolute bottom-0 w-full h-1/5 flex items-center justify-center bg-gradient-to-t from-black via-[#000000ad] to-transparent`}>
                <h2 className='font-semibold text-base text-center md:text-2xl'>
                    {title || name}
                </h2>
            </div>

        </div>
    )
}

export default MovieCard
