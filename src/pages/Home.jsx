import { useLoaderData, useRouteError } from "react-router-dom"
import MovieCard from "../components/Ui/MovieCard";
import Pageno from "../components/Ui/Pageno";
import { useContext, useEffect, useState } from "react";
import { SearchContext } from "../API/Context";

const Home = () => {
    const data = useLoaderData();
    const error = useRouteError();
    if (error) {
        return <div>Error: {error.statusText || error.message}</div>;
    }

    const movieData = data.data
    const page = data.page
        ; // Track current page
    // console.log(movieData);
    const { currentPage, setCurrentPage } = useContext(SearchContext);
    setCurrentPage(page)
    // Update search results when movieData changes
    // useEffect(() => {
    //     setSearchResults(movieData.results);
    // }, []);

    return (
        <>

            <div className="grid sm:grid-cols-3 grid-cols-2 sm:gap-10 gap-5 sm:p-10 p-5 md:grid-cols-4 ">
                {movieData.results.map((movie) => (
                    <MovieCard key={movie.id} data={movie} isWebSeries={data.isWebSeries} />
                ))}
            </div>
            <Pageno currentPage={currentPage} setCurrentPage={setCurrentPage} />
        </>
    )
}

export default Home