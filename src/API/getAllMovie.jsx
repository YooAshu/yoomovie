

const getAllMovie = async ({ params, request }) => {
    const url = new URL(request.url);
    const page = url.searchParams.get('page') || 1;

    const isWebSeries = url.pathname.includes('/webseries')
    const movieOrtv = isWebSeries ? 'tv' : 'movie'

    // const searchRequest = url.pathname.includes('search')
    const searchOrDiscover = url.searchParams.get('search') ? 'search' : 'discover'
    const searchQuery = url.searchParams.get('search') ? `query=${encodeURIComponent(url.searchParams.get('search'))}&` : null

    
    const API = `https://api.themoviedb.org/3/${searchOrDiscover}/${movieOrtv}?${searchQuery}include_adult=false&include_video=true&language=en-US&page=${page}&sort_by=popularity.desc&api_key=${import.meta.env.VITE_API_KEY}`;
    console.log(API)
    try {
        const res = await fetch(API)
        const data = await res.json();
        return { data: data, page: page, isWebSeries: isWebSeries };
    }
    catch (error) {
        console.log(error);
    }
}

export default getAllMovie
