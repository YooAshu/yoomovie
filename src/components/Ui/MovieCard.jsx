import React from 'react'
import { useNavigate } from 'react-router-dom';

const MovieCard = ({ data, className, titleDisplay ,isWebSeries}) => {
    const { title, poster_path, id ,name} = data
    const navigate = useNavigate();

    const handleClick = () => {
        if(isWebSeries){
            navigate(`/webseries/${id}`)
        }
        else{
            navigate(`/${id}`)
        }
    }
    return (
        <div className={`relative rounded-3xl ${className}`} onClick={handleClick}>
            <img src={`https://image.tmdb.org/t/p/w500/${poster_path}`} alt={`${title || name}`} className='w-full rounded-3xl' />
            <div className={` ${titleDisplay} absolute bottom-0 w-full h-1/5 flex items-center justify-center bg-gradient-to-t from-black via-[#000000ad] to-transparent`}>
                <h2 className='font-semibold md:text-2xl text-base text-center'>
                    {title || name}
                </h2>
            </div>
        </div>
    )
}

export default MovieCard
