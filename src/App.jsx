import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import Filters from "./components/Filters";
import MovieGrid from "./components/MovieGrid";
import MovieModal from "./components/MovieModal";
import Loader from "./components/Loader";
import ErrorMessage from "./components/ErrorMessage";
import LoadMore from "./components/LoadMore";
import Footer from "./components/Footer";
import useMovies from "./hooks/useMovies";
import useReviews from "./hooks/useReviews";
import useDebounce from "./hooks/useDebounce";
import { fetchGenres } from "./services/tmdb";

export default function App() {
  const [search, setSearch] = useState("");
  const [genre, setGenre] = useState("");
  const [sort, setSort] = useState("popularity.desc");
  const [page, setPage] = useState(1);
  const [genres, setGenres] = useState([]);
  const [selectedId, setSelectedId] = useState(null);

  const query = useDebounce(search.trim());
  const { movies, totalPages, loading, error } = useMovies({ query, genre, sort, page });
  const { getReviews, addReview, deleteReview, getAverage } = useReviews();

  useEffect(() => { fetchGenres().then(setGenres).catch(() => {}); }, []);
  useEffect(() => { setPage(1); }, [query, genre, sort]);

  // When searching, the API can't filter by genre, so filter client-side.
  const visible = query && genre ? movies.filter((m) => m.genre_ids?.includes(Number(genre))) : movies;

  return (
    <div className="min-h-screen">
      <Navbar search={search} onSearchChange={setSearch} />

      <main className="mx-auto max-w-7xl px-4 py-6">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
          <h2 className="text-xl font-bold">{query ? `Results for “${query}”` : "Discover movies"}</h2>
          <Filters genres={genres} genre={genre} sort={sort} onGenreChange={setGenre} onSortChange={setSort} />
        </div>

        {error && <ErrorMessage message={error} />}
        <MovieGrid movies={visible} getAverage={getAverage} onSelect={setSelectedId} />
        {!loading && !error && !visible.length && (
          <p className="py-10 text-center text-neutral-400">No movies found.</p>
        )}
        {loading && <Loader />}
        {!loading && page < totalPages && <LoadMore onClick={() => setPage((p) => p + 1)} />}
      </main>

      <Footer />

      {selectedId && (
        <MovieModal
          movieId={selectedId}
          reviews={getReviews(selectedId)}
          onAddReview={addReview}
          onDeleteReview={deleteReview}
          onClose={() => setSelectedId(null)}
        />
      )}
    </div>
  );
}
