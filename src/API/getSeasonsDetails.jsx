const getSeasonDetails = async (seriesId, totalSeasons) => {
    const apiKey = import.meta.env.VITE_API_KEY;
    const seasonPromises = Array.from({ length: totalSeasons }, (_, i) => {
        const seasonNumber = i + 1;
        const API = `https://api.themoviedb.org/3/tv/${seriesId}/season/${seasonNumber}?language=en-US&api_key=${apiKey}`;

        return fetch(API)
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`Failed to fetch details for season ${seasonNumber}`);
                }
                return response.json();
            })
            .then((data) => ({
                season_number: seasonNumber,
                releasedEpisodes: data.episodes.filter(
                    (episode) => episode.air_date && new Date(episode.air_date) <= new Date()
                ).length,
            }))
            .catch((error) => {
                console.error(`Error fetching season ${seasonNumber}:`, error);
                return { season_number: seasonNumber, releasedEpisodes: 0 };
            });
    });

    return Promise.all(seasonPromises);
};
export default getSeasonDetails