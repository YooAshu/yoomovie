const getMovieDetails = async ({ params, request }) => {
    const id = params.movieID;

    const url = new URL(request.url);
    const isWebSeries = url.pathname.includes('/webseries');
    const movieOrtv = isWebSeries ? 'tv' : 'movie';

    const API = `https://api.themoviedb.org/3/${movieOrtv}/${id}?api_key=${import.meta.env.VITE_API_KEY}`;
    const VideoAPI = `https://api.themoviedb.org/3/${movieOrtv}/${id}/videos?api_key=${import.meta.env.VITE_API_KEY}`;

    try {
        // Fetch both APIs concurrently using Promise.all
        const [movieRes, videoRes] = await Promise.all([
            fetch(API),
            fetch(VideoAPI)
        ]);

        // Check if both responses are OK
        if (!movieRes.ok || !videoRes.ok) {
            throw new Response('Failed to fetch movie or videos', {
                status: movieRes.ok ? videoRes.status : movieRes.status,
                statusText: movieRes.ok ? videoRes.statusText : movieRes.statusText
            });
        }

        // Convert both responses to JSON
        const movieData = await movieRes.json();
        const videoData = await videoRes.json();

        // Return the data from both APIs
        return {
            movie: movieData,
            videos: videoData,
            isWebSeries: isWebSeries
        };
    } catch (error) {
        // Handle network errors or invalid responses
        console.error('Error fetching movie details:', error);
        throw new Response('Network error or invalid response', { status: 500 });
    }
}

export default getMovieDetails;
