import React, { useEffect, useState } from 'react'
import './../../index.css'

const SeriesPlayer = ({ data, seasonDetails }) => {
    const [season_number, setSeason_number] = useState(1)
    const [episode_number, setEpisode_number] = useState(0)

    const handleSeasonChange = (n) => {
        setSeason_number(() => n)
    }
    const handleEpisodeChange = (n) => {
        setEpisode_number(() => n)
    }
    return (
        <div className=''>
            <ul className='items-center gap-x-4 gap-y-7 grid grid-cols-[repeat(auto-fit,100px)] md:grid-cols-[repeat(auto-fit,150px)] mx-3 my-10 cursor-pointer'>
                {

                    seasonDetails.map((season, index) => {
                        return <li
                            key={index}
                            onClick={() => handleSeasonChange(season.season_number)}
                            className={`shadow__btn whitespace-nowrap ${season_number == index + 1 ? 'active' : ''} `}>
                            Season {season.season_number}
                        </li>
                    })
                }
            </ul>
            <div className='items-center gap-x-4 gap-y-7 grid grid-cols-[repeat(auto-fit,100px)] md:grid-cols-[repeat(auto-fit,150px)] mx-3 cursor-pointer'>
                {[...Array(seasonDetails[season_number - 1].releasedEpisodes)].map((_, index) => (
                    <div key={index} onClick={() => handleEpisodeChange(index)}
                        className={`shadow__btn whitespace-nowrap ${episode_number==index ? 'active' : ''}`} >
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
                    margin: '100px 0px'
                }}
            >
                <iframe id="video-iframe"
                    width="100%" height="100%"
                    src={`https://player.autoembed.cc/embed/tv/${data.id}/${season_number}/${episode_number + 1}`}
                    title="Video player" frameBorder="0" allowFullScreen
                >
                </iframe>
            </div>
        </div>

    )
}



export default SeriesPlayer
