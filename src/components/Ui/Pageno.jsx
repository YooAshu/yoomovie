import React from 'react'
import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const Pageno = ({ currentPage, setCurrentPage }) => {

    const navigate = useNavigate(); // To navigate between pages
    const location = useLocation();

    // Handle page change
    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
        // Navigate to the new page (which will refetch the data)
        const params = new URLSearchParams(location.search);
        params.set('page', newPage);
        navigate(`?${params.toString()}`);
    };
    return (
        <div className='flex w-full justify-center gap-6 my-10'>
            <button
                onClick={() => handlePageChange(Number(currentPage) - 1)}
                disabled={currentPage <= 1}
                className='bg-violet-500 px-3 rounded-md text-2xl font-semibold'
            >
                Previous
            </button>
            <button
                onClick={() => handlePageChange(Number(currentPage) + 1)}
                className='bg-violet-500 px-3 rounded-md text-2xl font-semibold'
            // disabled={currentPage <= 1}
            >
                Next
            </button>
        </div>
    )
}

export default Pageno
