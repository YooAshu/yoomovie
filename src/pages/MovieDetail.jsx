import React from 'react'
import { useLoaderData, useRouteError } from 'react-router-dom'
import MovieCard from '../components/Ui/MovieCard';
import YouTube from 'react-youtube';
import MoviePlayer from '../components/Ui/MoviePlayer';
import SeriesPlayer from '../components/Ui/SeriesPlayer';

const MovieDetail = () => {
    const data = useLoaderData();
    const error = useRouteError();

    if (error) {
        return <div>Error: {error.statusText || 'Failed to load movie details'}</div>;
    }
    const movieData = data.movie
    const videoData = data.videos.results
    const isWebSeries = data.isWebSeries
    const seasonDetail = data.seasonDetail
    const key = videoKey(videoData)
    const tmdbid = movieData.id
    console.log(movieData)
    return (
        <>
            <div className='flex md:flex-row flex-col items-start gap-24 my-10 p-5 md:p-10 w-full'>
                <MovieCard data={movieData} className={"md:w-96 w-full"} titleDisplay={"hidden"} />
                <div className="flex flex-col gap-14 w-full md:w-2/4">
                    <h1 className='font-bold text-3xl'>
                        {!isWebSeries ? `Movie Name : ${movieData.title}` : `Series Name : ${movieData.name}`}

                    </h1>
                    <div>
                        <h2 className='font-bold text-lg'>Genres</h2>
                        <ul className='flex gap-4 mt-4 overflow-scroll' style={{scrollbarWidth:'none'}}>
                            {movieData.genres.map((genre) => {
                                return <li key={genre.id} className='whitespace-nowrap gradient_btn'>{genre.name}</li>
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

            {!isWebSeries && <MoviePlayer tmdbid={tmdbid} />}
            {isWebSeries && <SeriesPlayer data = {movieData} seasonDetails = {seasonDetail}/>}

        </>
    )
}

const Released = ({ status, date, isWebSeries }) => {
    if (!isWebSeries) {
        return (
            <span>
                <span className='font-semibold text-lg gradient_btn'>Releasing Date</span>
                <span> : {date}</span>
            </span>
        )


    }
    else {
        if (status === 'Ended') {
            return <span className='font-semibold text-lg gradient_btn'>Series Completed</span>
        }
        return (

            <span>
                <span className='font-semibold text-lg gradient_btn'>
                    Currently Running
                </span>
                <br /><span> Next Episode on : {date && date.air_date}</span>
            </span>
        )
    }
}

const RunTime = ({ time, isWebSeries, number_of_seasons }) => {
    if (!isWebSeries) {
        return <span className='text-lg'> <span className='font-semibold gradient_btn'>Run Time</span> : {Math.floor(time / 60)}h {time % 60}m</span>
    }
    return <span className='text-lg'> <span className='font-semibold gradient_btn'>Total Seasons</span> : {number_of_seasons}</span>
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
