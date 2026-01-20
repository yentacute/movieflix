export const TMDB_CONFIG = {
  BASE_URL: "https://api.themoviedb.org/3",
  API_KEY: process.env.EXPO_PUBLIC_MOBILE_API_KEY,
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${process.env.EXPO_PUBLIC_MOBILE_API_KEY}`,
  },
};

export const fetchMovies = async ({ query }: { query: string }) => {
  const endPoint = query
    ? `/search/movie?query=${encodeURIComponent(query)}`
    : "/trending/movie/week?language=en-US";
  const response = await fetch(`${TMDB_CONFIG.BASE_URL}${endPoint}`, {
    method: "GET",
    headers: TMDB_CONFIG.headers,
  });
  if (!response.ok) {
    throw new Error("Failed to fetch movies");
  }
  const data = await response.json();
  return data.results;
};

export const genreMovieList = async () => {
  const response = await fetch(`${TMDB_CONFIG.BASE_URL}/genre/movie/list`, {
    method: "GET",
    headers: TMDB_CONFIG.headers,
  });
  if (!response.ok) {
    throw new Error("Failed to fetch genres");
  }
  const data = await response.json();
  return data.genres;
};

export const fetchMovieDetails = async (movieId: string) => {
  const response = await fetch(`${TMDB_CONFIG.BASE_URL}/movie/${movieId}`, {
    method: "GET",
    headers: TMDB_CONFIG.headers,
  });
  if (!response.ok) {
    throw new Error("Failed to fetch genres");
  }
  return response.json();
};
