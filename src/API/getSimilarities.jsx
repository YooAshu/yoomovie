const getSimilarities = async (id, isWebSeries) => {
    const apiKey = import.meta.env.VITE_API_KEY;
    var API;
    var data;
    if (!isWebSeries) {
        API = `https://api.themoviedb.org/3/movie/${id}/similar?language=en-US&page=1&api_key=${apiKey}`
    }
    else {
        API = `https://api.themoviedb.org/3/tv/${id}/similar?language=en-US&page=1&api_key=${apiKey}`
    }
    try {
        const res = await fetch(API);
        data = await res.json();

    }
    catch (error) {
        console.log(error)
    }
    

    return data
};
export default getSimilarities