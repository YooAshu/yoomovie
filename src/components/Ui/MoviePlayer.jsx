import React from 'react'

const MoviePlayer = ({ tmdbid }) => {
    return (
        <div
            style={{
                width: '100%',
                height: window.matchMedia("(max-width: 768px)").matches ? '50vh' : '100vh',
                display: 'flex',
                justifyContent: 'center',
                padding: 0,
                overflow: 'hidden',
                margin:'100px 0px'
            }}
        >
            <iframe id="video-iframe"
                width="100%" height="100%"
                src={`https://player.autoembed.cc/embed/movie/${tmdbid}`} title="Video player" frameborder="0" allowfullscreen
                allowtransparency>
            </iframe>
        </div>

    )
}

export default MoviePlayer
