import { imgUrl } from "../services/tmdb";

export default function MovieCard({ movie, userAvg, onClick }) {
  const poster = imgUrl(movie.poster_path);
  const year = movie.release_date?.slice(0, 4) || "—";

  return (
    <button
      onClick={onClick}
      className="group overflow-hidden rounded-xl bg-neutral-900 text-left transition hover:-translate-y-1 hover:ring-2 hover:ring-brand"
    >
      <div className="relative aspect-[2/3] bg-neutral-800">
        {poster ? (
          <img src={poster} alt={movie.title} loading="lazy" className="h-full w-full object-cover" />
        ) : (
          <div className="flex h-full items-center justify-center text-sm text-neutral-500">No poster</div>
        )}
        <span className="absolute right-2 top-2 rounded-md bg-black/80 px-2 py-0.5 text-xs font-semibold text-yellow-400">
          ★ {movie.vote_average?.toFixed(1)}
        </span>
      </div>
      <div className="p-3">
        <h3 className="line-clamp-1 text-sm font-semibold">{movie.title}</h3>
        <p className="mt-0.5 text-xs text-neutral-400">{year}</p>
        {userAvg && <p className="mt-1 text-xs text-brand">Community: {userAvg.toFixed(1)}/5</p>}
      </div>
    </button>
  );
}
