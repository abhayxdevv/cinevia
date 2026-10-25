import MovieCard from "./MovieCard";

export default function MovieGrid({ movies, getAverage, onSelect }) {
  if (!movies.length) return null;
  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
      {movies.map((m) => (
        <MovieCard key={m.id} movie={m} userAvg={getAverage(m.id)} onClick={() => onSelect(m.id)} />
      ))}
    </div>
  );
}
