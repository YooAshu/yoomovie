const getAllMovie = async ({ params, request }) => {
    const url = new URL(request.url);
    const page = url.searchParams.get('page') || 1;

    const isWebSeries = url.pathname.includes('/webseries');
    const movieOrtv = isWebSeries ? 'tv' : 'movie';

    const isSearching = url.searchParams.get('search')
    const searchQuery = url.searchParams.get('search')
        ? `query=${encodeURIComponent(url.searchParams.get('search'))}&`
        : '';

    var API
    if (!isWebSeries) {
        // API = `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=true&language=en-US&page=${page}
        // &primary_release_date.lte=2025-01-04&sort_by=primary_release_date.desc&watch_region=IN&with_original_language=hi%7Cen%7Cta%7Cte
        // &with_watch_monetization_types=flatrate|rent|ads|buy&with_watch_providers=8&api_key=${import.meta.env.VITE_API_KEY}`;
        if (isSearching) {
            API = `https://api.themoviedb.org/3/search/movie?${searchQuery}&include_adult=false&language=en-US&page=${page}&api_key=${import.meta.env.VITE_API_KEY}`;
        }
        else {
            API = `https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=${page}&api_key=${import.meta.env.VITE_API_KEY}`;

        }
    }
    else {
        // API = `https://api.themoviedb.org/3/discover/tv?
        // &language=en-US&page=${page}&screened_theatrically=&sort_by=popularity.desc&watch_region=IN&with_origin_country=IN|US|KR|JA&with_original_language=hi|en|ja|ko
        // &with_watch_monetization_types=flatrate&with_watch_providers=&api_key=${import.meta.env.VITE_API_KEY}`;
        if (isSearching) {
            API = `https://api.themoviedb.org/3/search/tv?${searchQuery}&include_adult=false&language=en-US&page=${page}&api_key=${import.meta.env.VITE_API_KEY}`;
        }
        else{

            API = `https://api.themoviedb.org/3/discover/tv?api_key=${import.meta.env.VITE_API_KEY}&language=en-US&page=${page}&sort_by=first_air_date.desc&with_watch_providers=8|119|283|122|350&watch_region=IN&with_origin_country=IN|US|KR|JA&with_original_language=hi|en|ja|ko&with_watch_monetization_types=flatrate`;
        }
        
        
    }

    try {
        const res = await fetch(API);

        if (!res.ok) {
            // If the response is not OK, throw an error with the status
            throw new Response('Failed to fetch movies', {
                status: res.status,
                statusText: res.statusText
            });
        }

        const data = await res.json();
        return { data: data, page: page, isWebSeries: isWebSeries };
    } catch (error) {
        // Catch network or parsing errors
        throw new Response('Network error or invalid response', { status: 500 });
    }
}

export default getAllMovie;
