import React from 'react'
import MovieCard from './MovieCard'

const Similarities = ({ similarities, isWebSeries }) => {
    return (
        <div className='mb-5 w- w-full overflow-scroll' style={{ scrollbarWidth: 'none' }}>
            <div className='flex flex-row gap-5 w-max'>
                {similarities.map((movie) => {
                    return (

                        <MovieCard key={movie.id} data={movie} isWebSeries={isWebSeries} className={"md:w-60 w-40"} titleDisplay={"hidden"} />

                    )
                })}
            </div>

        </div>
    )
}

export default Similarities
