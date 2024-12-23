import React, { useState } from 'react'

const SeriesPlayer = ({ data }) => {
    const [season_number, setSeason_number] = useState(0)
    const [episode_number, setEpisode_number] = useState(0)
    const totalEpisodeInSeason = data.seasons[season_number].episode_count
    const handleSeasonChange = (n) => {
        setSeason_number(() => n)
    }
    const handleEpisodeChange = (n) => {
        setEpisode_number(() => n)
    }
    return (
        <div className=''>
            <ul className='flex gap-4 mt-4 overflow-scroll cursor-pointer' style={{scrollbarWidth:'none'}}>
                {
                    data.seasons.map((season, index) => {
                        return <li
                            key={index}
                            onClick={() => handleSeasonChange(index)}
                            className='text-lg bg-violet-500 rounded-full px-6 whitespace-nowrap'>
                            {season.name}
                        </li>
                    })
                }
            </ul>
            <div className='flex gap-4 mt-4 overflow-scroll cursor-pointer' style={{scrollbarWidth:'none'}}>
                {[...Array(totalEpisodeInSeason)].map((_, index) => (
                    <div key={index} onClick={() => handleEpisodeChange(index)} className='text-lg bg-violet-500 rounded-full px-6 whitespace-nowrap' >
                        Episode {index + 1}
                    </div>
                ))}
            </div>


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
                    src={`https://player.autoembed.cc/embed/tv/${data.id}/${season_number + 1}/${episode_number + 1}`}
                    title="Video player" frameBorder="0" allowFullScreen
                >
                </iframe>
            </div>
        </div>

    )
}

export default SeriesPlayer
