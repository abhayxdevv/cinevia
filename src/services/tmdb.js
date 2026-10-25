const BASE = "https://api.themoviedb.org/3";
const KEY = import.meta.env.VITE_TMDB_API_KEY;

async function get(path, params = {}) {
  const qs = new URLSearchParams({ api_key: KEY, ...params });
  const res = await fetch(`${BASE}${path}?${qs}`);
  if (!res.ok) throw new Error("Could not load data. Check your TMDB API key.");
  return res.json();
}

export const imgUrl = (path, size = "w500") =>
  path ? `https://image.tmdb.org/t/p/${size}${path}` : null;

export const fetchGenres = () => get("/genre/movie/list").then((d) => d.genres);

export const searchMovies = (query, page = 1) =>
  get("/search/movie", { query, page });

export const discoverMovies = ({ genre, sort = "popularity.desc", page = 1 }) =>
  get("/discover/movie", {
    page,
    sort_by: sort,
    "vote_count.gte": sort.startsWith("vote_average") ? 200 : 0,
    ...(genre ? { with_genres: genre } : {}),
  });

export const fetchMovieDetails = (id) => get(`/movie/${id}`);
