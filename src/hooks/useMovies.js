import { useEffect, useState } from "react";
import { discoverMovies, searchMovies } from "../services/tmdb";

export default function useMovies({ query, genre, sort, page }) {
  const [movies, setMovies] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);

    const request = query
      ? searchMovies(query, page)
      : discoverMovies({ genre, sort, page });

    request
      .then((data) => {
        if (cancelled) return;
        setMovies((prev) => (page === 1 ? data.results : [...prev, ...data.results]));
        setTotalPages(data.total_pages);
      })
      .catch((e) => !cancelled && setError(e.message))
      .finally(() => !cancelled && setLoading(false));

    return () => { cancelled = true; };
  }, [query, genre, sort, page]);

  return { movies, totalPages, loading, error };
}
