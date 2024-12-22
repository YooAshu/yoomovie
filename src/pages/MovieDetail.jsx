import React from 'react'
import { useLoaderData, useRouteError } from 'react-router-dom'
import MovieCard from '../components/Ui/MovieCard';
import YouTube from 'react-youtube';

const MovieDetail = () => {
    const data = useLoaderData();
    const error = useRouteError();

    if (error) {
        return <div>Error: {error.statusText || 'Failed to load movie details'}</div>;
    }
    const movieData = data.movie
    const videoData = data.videos.results
    const isWebSeries = data.isWebSeries
    const key = videoKey(videoData)
    const tmdbid = movieData.id
    return (
        <>
            <div className='w-full md:p-10 my-10 flex items-start md:flex-row gap-24 p-5 flex-col'>
                <MovieCard data={movieData} className={"md:w-96 w-full"} titleDisplay={"hidden"} />
                <div className="flex flex-col md:w-2/4 w-full gap-14">
                    <h1 className='text-3xl font-bold'>
                        {!isWebSeries ? `Movie Name : ${movieData.title}` : `Series Name : ${movieData.name}`}

                    </h1>
                    <div>
                        <h2 className='text-lg font-bold'>Genres</h2>
                        <ul className='flex gap-4 mt-4'>
                            {movieData.genres.map((genre) => {
                                return <li key={genre.id} className='text-lg bg-violet-500 rounded-full px-2'>{genre.name}</li>
                            })}
                        </ul>
                    </div>
                    <p className='text-lg'>
                        <span className='font-bold'>
                            {!isWebSeries ? 'Movie Description' : 'Series Description'}
                        </span>
                        <br /> {movieData.overview}</p>
                    <Released status={movieData.status} date={movieData.release_date || movieData.next_episode_to_air} isWebSeries={isWebSeries} />
                    <RunTime time={movieData.runtime} isWebSeries={isWebSeries} number_of_seasons={movieData.number_of_seasons} />

                    <TrailerVideo youtubeKey={key} />
                </div>

            </div>
            <div
                style={{
                    width: '100%',
                    height: '100vh',
                    display:'flex',
                    justifyContent: 'center',
                    padding: 0,
                    overflow: 'hidden',
                }}
            >
                <iframe id="video-iframe"
                    width="100%" height="100%" 
                    src={`https://flicky.host/embed/movie/?id=${tmdbid}`} title="Video player" frameborder="0" allowfullscreen
                    allowtransparency></iframe>
            </div>
        </>
    )
}

const Released = ({ status, date, isWebSeries }) => {
    if (!isWebSeries) {
        return (
            <span>
                <span className='text-lg bg-violet-500 rounded-full px-2 font-semibold w-fit'>Releasing Date</span>
                <span> : {date}</span>
            </span>
        )


    }
    else {
        if (status === 'Ended') {
            return <span className='text-lg bg-violet-500 rounded-full px-2 font-semibold w-fit'>Series Completed</span>
        }
        return (

            <span>
                <span className='text-lg bg-violet-500 rounded-full px-2 font-semibold w-fit'>
                    Currently Runnung
                </span>
                <br /><span> Next Episode on : {date && date.air_date}</span>
            </span>
        )
    }
}

const RunTime = ({ time, isWebSeries, number_of_seasons }) => {
    if (!isWebSeries) {
        return <span className='text-lg'> <span className=' bg-violet-500 rounded-full px-2 font-semibold'>Run Time</span> : {Math.floor(time / 60)}h {time % 60}m</span>
    }
    return <span className='text-lg'> <span className=' bg-violet-500 rounded-full px-2 font-semibold'>Total Seasons</span> : {number_of_seasons}</span>
}
const TrailerVideo = ({ youtubeKey }) => {

    const width = ((window.innerWidth > 0) ? window.innerWidth : screen.width) * .9
    const opts = {
        // height: window.matchMedia("(max-width: 768px)").matches ? '' :'390',
        width: window.matchMedia("(max-width: 768px)").matches ? width : '640',
        playerVars: {
            // https://developers.google.com/youtube/player_parameters
            autoplay: 0,
        },
    };

    // console.log(youtubeKey)
    return (
        <div className='flex justify-center'>
            {youtubeKey && <YouTube opts={opts} videoId={youtubeKey} />}
        </div>
    );
};
function videoKey(videoData) {
    if (videoData.length > 0) {
        // Search for object with "trailer" in the title first (case-insensitive)
        const trailer = videoData.find(item => /trailer/i.test(item.name));

        // If no "trailer" is found, search for "teaser"
        if (trailer) {
            return trailer.key;
        }

        // Search for object with "teaser" in the title (case-insensitive)
        const teaser = videoData.find(item => /teaser/i.test(item.name));

        if (teaser) { return teaser.key }

        return videoData[0].key

        // Return the teaser or null if neither is found
    }
    else {
        return undefined;
    }
}
export default MovieDetail
