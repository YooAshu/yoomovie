const getCategorisedList = async ({ params, request }) => {
    const genreID = params.genre;
    const category = params.category

    const fromCategory = category != undefined

    const url = new URL(request.url);
    const page = url.searchParams.get('page') || 1;

    const isWebSeries = url.pathname.includes('/webseries');
    const bollywood = url.pathname.includes('/bollywood')
    const hollywood = url.pathname.includes('/hollywood')
    const fromGenre = genreID != undefined


    // Get the current date
    const currentDate = new Date().toISOString().split('T')[0];

    var API, theatrerReleaseAPI, digitalReleaseAPI
    if (!isWebSeries) {
        if (fromCategory) {
            switch (category) {
                case 'bollywood':
                    theatrerReleaseAPI = `https://api.themoviedb.org/3/discover/movie?api_key=${import.meta.env.VITE_API_KEY}&certification_country=IN&include_adult=false&include_video=false&language=en-US&page=${page}&region=IN&release_date.lte=${currentDate}&sort_by=primary_release_date.desc&watch_region=IN&with_origin_country=IN&with_original_language=hi&with_release_type=3&vote_average.gte=1`;
                    digitalReleaseAPI = `https://api.themoviedb.org/3/discover/movie?api_key=${import.meta.env.VITE_API_KEY}&certification_country=IN&include_adult=false&include_video=false&language=en-US&page=${page}&region=IN&release_date.lte=${currentDate}&sort_by=primary_release_date.desc&watch_region=IN&with_origin_country=IN&with_original_language=hi&with_release_type=4&with_watch_providers=8|337|119|577|232|220&vote_average.gte=1`;
                    break
                case 'hollywood':
                    theatrerReleaseAPI = `https://api.themoviedb.org/3/discover/movie?api_key=${import.meta.env.VITE_API_KEY}&certification_country=IN&include_adult=false&include_video=false&language=en-US&page=${page}&region=IN&release_date.lte=${currentDate}&sort_by=primary_release_date.desc&watch_region=IN&with_origin_country=US&with_original_language=en&with_release_type=3&vote_average.gte=1`;
                    digitalReleaseAPI = `https://api.themoviedb.org/3/discover/movie?api_key=${import.meta.env.VITE_API_KEY}&certification_country=IN&include_adult=false&include_video=false&language=en-US&page=${page}&region=IN&release_date.lte=${currentDate}&sort_by=primary_release_date.desc&watch_region=IN&with_origin_country=US&with_original_language=en&with_release_type=4&with_watch_providers=8|337|119|577|232|220&vote_average.gte=1`;
                    break
                case 'netflix':
                    API = `https://api.themoviedb.org/3/discover/movie?api_key=${import.meta.env.VITE_API_KEY}&certification_country=IN&include_adult=false&include_video=false&language=en-US&page=${page}&region=IN&release_date.lte=${currentDate}&sort_by=primary_release_date.desc&watch_region=IN&with_release_type=4&with_watch_providers=8`;
                    break
                case 'prime':
                    API = `https://api.themoviedb.org/3/discover/movie?api_key=${import.meta.env.VITE_API_KEY}&certification_country=IN&include_adult=false&include_video=false&language=en-US&page=${page}&region=IN&release_date.lte=${currentDate}&sort_by=primary_release_date.desc&watch_region=IN&with_release_type=4&with_watch_providers=119`;
                    break
            }
        }
        else if (fromGenre) {
            API = `https://api.themoviedb.org/3/discover/movie?api_key=${import.meta.env.VITE_API_KEY}&include_adult=false&include_video=false&language=en-US&page=${page}&sort_by=popularity.desc&vote_average.gte=1&watch_region=IN&with_genres=${genreID}&with_original_language=hi|en`;
        }

    }
    else {
        if (fromCategory) {
            switch (category) {
                case 'bollywood':
                    API = `https://api.themoviedb.org/3/discover/tv?api_key=${import.meta.env.VITE_API_KEY}&include_adult=false&language=en-US&page=${page}&sort_by=first_air_date.desc&with_watch_providers=8|119|122|232|237&watch_region=IN&with_origin_country=IN&with_original_language=hi&vote_average.gte=1`;
                    break
                case 'hollywood':
                    API = `https://api.themoviedb.org/3/discover/tv?api_key=${import.meta.env.VITE_API_KEY}&include_adult=false&language=en-US&page=${page}&sort_by=first_air_date.desc&with_watch_providers=8|119|283|350|122&watch_region=IN&with_origin_country=US&with_original_language=hi|en&vote_average.gte=1`;
                    break
                case 'netflix':
                    API = `https://api.themoviedb.org/3/discover/tv?api_key=${import.meta.env.VITE_API_KEY}&include_adult=false&language=en-US&page=${page}&sort_by=first_air_date.desc&with_watch_providers=8&watch_region=IN&with_original_language=hi|en&vote_average.gte=1`;
                    break
                case 'prime':
                    API = `https://api.themoviedb.org/3/discover/tv?api_key=${import.meta.env.VITE_API_KEY}&include_adult=false&language=en-US&page=${page}&sort_by=first_air_date.desc&with_watch_providers=119&watch_region=IN&with_original_language=hi|en&vote_average.gte=1`;
                    break
            }
        }
        else if (fromGenre) {
            API = `https://api.themoviedb.org/3/discover/tv?api_key=${import.meta.env.VITE_API_KEY}&include_adult=false&language=en-US&page=${page}&sort_by=popularity.desc&vote_average.gte=1&watch_region=IN&with_genres=${genreID}&with_original_language=hi|en`;
        }
    }

    try {
        // const res = await fetch(theatrerReleaseAPI);
        if (!isWebSeries && (category == 'bollywood' || category == 'hollywood')) {
            const [theatricalResponse, digitalResponse] = await Promise.all([
                fetch(theatrerReleaseAPI),
                fetch(digitalReleaseAPI),
            ]);
            const theatricalMovies = await theatricalResponse.json();
            const digitalMovies = await digitalResponse.json();
            const allMovies = [...(theatricalMovies.results), ...(digitalMovies.results)];
            // Remove duplicates based on movie ID
            const uniqueMovies = Array.from(new Map(allMovies.map((movie) => [movie.id, movie])).values());
            return { data: uniqueMovies, page: page, isWebSeries: isWebSeries, total_pages: Math.max(theatricalMovies.total_pages, digitalMovies.total_pages) };
        }
        else {
            const res = await fetch(API);
            const data = await res.json();
            return { data: data.results, page: page, isWebSeries: isWebSeries, total_pages: data.total_pages };
        }


        // const data = await res.json();
        // return { data: uniqueMovies, page: page, isWebSeries: isWebSeries };
    } catch (error) {
        // Catch network or parsing errors
        throw new Response('Network error or invalid response', { status: 500 });
    }
}

export default getCategorisedList;
// tv 8-nflix 119-prime 350-apple 283-crunhy 122-hotstar 220-jio 232-zee5 237-sony