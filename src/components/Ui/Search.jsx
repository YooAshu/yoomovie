import React, { useContext, useRef } from 'react'
import { FaSearch } from "react-icons/fa";
import { SearchContext } from '../../API/Context';
import { useNavigate } from 'react-router-dom';
const Search = () => {
    const navigate =useNavigate();
    const{currentPage, setCurrentPage} = useContext(SearchContext);

    const searchRef = useRef()

    const handleSearch = (e) => {
        e.preventDefault()
        const value = searchRef.current.value
        setCurrentPage(1)
        navigate(`?search=${value}`);
    }

    return (
        <div className='md:w-2/6 relative flex items-center w-4/5 col-span-full row-start-2 justify-self-center'>
            <form action="" className='w-full flex items-center' onSubmit={(e) => handleSearch(e)}>
                <input type='text' placeholder='Search Movies' ref={searchRef} className=' rounded-full w-full h-12 bg-transparent border-2 border-solid pl-5 pr-10'></input>
                <button type='submit' className='absolute right-4 '>
                    <FaSearch style={{ fontSize: '25px' }} />
                </button>
            </form>
        </div>
    )

}

export default Search
