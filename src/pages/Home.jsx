import { useLoaderData, useRouteError } from "react-router-dom"
import MovieCard from "../components/Ui/MovieCard";
import Pageno from "../components/Ui/Pageno";
import { useContext, useEffect, useState } from "react";
import { SearchContext } from "../API/Context";
import {MoviesCategory,MoviesGenresList} from "../components/Ui/MoviesCategory";

const Home = () => {
    const data = useLoaderData();
    const error = useRouteError();
    if (error) {
        return <div>Error: {error.statusText || error.message}</div>;
    }

    const movieData = data.data
    const page = data.page
    const isWebSeries = data.isWebSeries
    const { currentPage, setCurrentPage } = useContext(SearchContext);
    setCurrentPage(page)

    return (
        <>
            {<MoviesCategory isWebSeries ={isWebSeries}/>}
            {<MoviesGenresList isWebSeries ={isWebSeries}/>}

            <div className="gap-5 sm:gap-10 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 p-5 sm:p-10">
                {movieData.results.map((movie) => (
                    <MovieCard key={movie.id} data={movie} isWebSeries={data.isWebSeries} />
                ))}
            </div>
            <Pageno currentPage={currentPage} setCurrentPage={setCurrentPage} />
        </>
    )
}

export default Home