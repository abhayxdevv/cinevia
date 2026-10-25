import { useEffect, useState } from "react";
import { fetchMovieDetails, imgUrl } from "../services/tmdb";
import Loader from "./Loader";
import ReviewForm from "./ReviewForm";
import ReviewList from "./ReviewList";

export default function MovieModal({ movieId, reviews, onAddReview, onDeleteReview, onClose }) {
  const [movie, setMovie] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    setMovie(null);
    fetchMovieDetails(movieId).then(setMovie).catch((e) => setError(e.message));
  }, [movieId]);

  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-40 flex items-start justify-center overflow-y-auto bg-black/80 p-4" onClick={onClose}>
      <div className="relative my-8 w-full max-w-4xl rounded-2xl bg-neutral-950 p-5 ring-1 ring-white/10" onClick={(e) => e.stopPropagation()}>
        <button onClick={onClose} className="absolute right-4 top-3 text-2xl text-neutral-400 hover:text-white" aria-label="Close">×</button>

        {error && <p className="text-red-400">{error}</p>}
        {!movie && !error && <Loader />}

        {movie && (
          <>
            <div className="flex flex-col gap-5 md:flex-row">
              {imgUrl(movie.poster_path) && (
                <img src={imgUrl(movie.poster_path)} alt={movie.title} className="w-48 self-center rounded-xl md:self-start" />
              )}
              <div>
                <h2 className="text-2xl font-bold">{movie.title}</h2>
                <p className="mt-1 text-sm text-neutral-400">
                  {movie.release_date} · {movie.runtime} min · ★ {movie.vote_average?.toFixed(1)} ({movie.vote_count} votes)
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {movie.genres.map((g) => (
                    <span key={g.id} className="rounded-full bg-white/10 px-3 py-1 text-xs">{g.name}</span>
                  ))}
                </div>
                <p className="mt-4 text-sm leading-relaxed text-neutral-300">{movie.overview || "No description available."}</p>
              </div>
            </div>

            <div className="mt-8 grid gap-6 md:grid-cols-2">
              <ReviewForm onSubmit={(r) => onAddReview(movieId, r)} />
              <div>
                <h4 className="mb-3 font-semibold">Reviews ({reviews.length})</h4>
                <ReviewList reviews={reviews} onDelete={(id) => onDeleteReview(movieId, id)} />
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
