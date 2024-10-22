const getAllMovie = async ({ params, request }) => {
    const url = new URL(request.url);
    const page = url.searchParams.get('page') || 1;

    const isWebSeries = url.pathname.includes('/webseries');
    const movieOrtv = isWebSeries ? 'tv' : 'movie';

    const searchOrDiscover = url.searchParams.get('search') ? 'search' : 'discover';
    const searchQuery = url.searchParams.get('search')
        ? `query=${encodeURIComponent(url.searchParams.get('search'))}&`
        : '';

    const API = `https://api.themoviedb.org/3/${searchOrDiscover}/${movieOrtv}?${searchQuery}include_adult=false&include_video=true&language=en-US&page=${page}&sort_by=popularity.desc&api_key=${import.meta.env.VITE_API_KEY}`;

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
