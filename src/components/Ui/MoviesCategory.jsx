import React from 'react'
import bollyImg from '../../assets/bollywood.png'
import hollyImg from '../../assets/hollywood.png'
import netflixImg from '../../assets/netflix.png'
import primeImg from '../../assets/prime.png'
import { NavLink, useNavigate } from 'react-router-dom'

export function MoviesCategory({ isWebSeries }) {
  const navigate = useNavigate()
  const handleOnClick = (path) => {
    if (isWebSeries) {
      navigate(`/webseries/category/${path}`)
    }
    else {
      navigate(`/category/${path}`)
    }
  }
  return (
    <div className='flex flex-wrap justify-between sm:justify-start sm:gap-7 p-5 sm:p-10'>
      {categoryList.map((category, index) => {
        return (
          <div
            key={index}
            className={`${category.shadow} bg-cover bg-center  rounded-xl sm:w-56 sm:h-28 w-[4.5rem] h-20 `}
            style={{ backgroundImage: `url(${category.poster})` }}
            onClick={() => handleOnClick(category.path)}>
            
          </div>
        )

      })}
    </div>
  )
}

export function MoviesGenresList({ isWebSeries }) {
  const navigate = useNavigate()
  const genreList = (isWebSeries) ? tvGenres : genres
  const handleOnClick = (id) => {
    if (isWebSeries) {
      navigate(`/webseries/genre/${id}`)
    }
    else {
      navigate(`/genre/${id}`)
    }
  }
  return (
    <ul className='flex flex-wrap items-center gap-2 sm:gap-4 mt-4 px-5 sm:px-10' style={{ scrollbarWidth: 'none' }}>
      {genreList.map((genre, index) => {
        return (
          <li key={index} className='shadow__btn px-3 sm:px-7 !text-white whitespace-nowrap' onClick={() => handleOnClick(genre.id)}>{genre.name}</li>
        )
      })}
    </ul>
  )
}

const categoryList = [
  { id: 1, name: 'Bollywood', poster: bollyImg, shadow: "blue_shadow_3", path: 'bollywood' },
  { id: 2, name: 'Hollywood', poster: hollyImg, shadow: "blue_shadow_1", path: 'hollywood' },
  { id: 3, name: 'Netflix', poster: netflixImg, shadow: "red_shadow", path: 'netflix' },
  { id: 4, name: 'Amazon Prime', poster: primeImg, shadow: "blue_shadow_2", path: 'prime' },

]


const genres = [
  {
    id: 28,
    name: "Action"
  },
  {
    id: 12,
    name: "Adventure"
  },
  {
    id: 16,
    name: "Animation"
  },
  {
    id: 35,
    name: "Comedy"
  },
  {
    id: 80,
    name: "Crime"
  },
  {
    id: 14,
    name: "Fantasy"
  },
  {
    id: 27,
    name: "Horror"
  },
  {
    id: 9648,
    name: "Mystery"
  },
  {
    id: 878,
    name: "Science Fiction"
  },
]


const tvGenres = [
  {
    "id": 10759,
    "name": "Action & Adventure"
  },
  {
    "id": 16,
    "name": "Animation"
  },
  {
    "id": 35,
    "name": "Comedy"
  },
  {
    "id": 80,
    "name": "Crime"
  },
  {
    "id": 99,
    "name": "Documentary"
  },
  {
    "id": 18,
    "name": "Drama"
  },
  {
    "id": 9648,
    "name": "Mystery"
  },
  {
    "id": 10765,
    "name": "Sci-Fi & Fantasy"
  }
]