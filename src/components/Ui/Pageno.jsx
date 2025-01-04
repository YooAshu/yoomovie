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
        <div className='flex justify-center gap-6 my-10 w-full'>
            <button
                onClick={() => handlePageChange(Number(currentPage) - 1)}
                disabled={currentPage==1}
                className={`shadow__btn !px-5 font-semibold text-2xl ${(currentPage!=1)?'active':''}`}
            >
                Previous
            </button>
            <button
                onClick={() => handlePageChange(Number(currentPage) + 1)}
                className='shadow__btn !px-5 font-semibold text-2xl active'
            // disabled={currentPage <= 1}
            >
                Next
            </button>
        </div>
    )
}

export default Pageno
