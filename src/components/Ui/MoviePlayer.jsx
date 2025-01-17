import React, { useState } from 'react'

const MoviePlayer = ({ tmdbid }) => {
    const [playerno, setPlayerno] = useState(1)
    const handleClick = (_playerno) => {
        setPlayerno(_playerno)}
    var baseSrc = (playerno == 1) ? 'https://autoembed.pro/embed' : 'https://player.autoembed.cc/embed'

    return (
        <>
            <div className='flex gap-5 px-5'>
                <div className={`shadow__btn whitespace-nowrap ${playerno == 1 ? 'active' : ''} `} onClick={() => handleClick(1)}>player1 (ad-free)</div>
                <div className={`shadow__btn whitespace-nowrap ${playerno == 2 ? 'active' : ''} `} onClick={() => handleClick(2)}>player2</div>
            </div>
            <div
                style={{
                    width: '100%',
                    height: window.matchMedia("(max-width: 768px)").matches ? '50vh' : '100vh',
                    display: 'flex',
                    justifyContent: 'center',
                    padding: 0,
                    overflow: 'hidden',
                    margin: '100px 0px'
                }}
            >
                <iframe id="video-iframe"
                    width="100%" height="100%"
                    src={`${baseSrc}/movie/${tmdbid}`} title="Video player" frameborder="0" allowfullscreen
                    allowtransparency>
                </iframe>
            </div>
        </>
    )
}

export default MoviePlayer
