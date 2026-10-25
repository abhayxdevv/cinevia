import GenreSelect from "./GenreSelect";

const SORTS = [
  { value: "popularity.desc", label: "Most Popular" },
  { value: "vote_average.desc", label: "Top Rated" },
  { value: "primary_release_date.desc", label: "Newest" },
];

export default function Filters({ genres, genre, sort, onGenreChange, onSortChange }) {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <GenreSelect genres={genres} value={genre} onChange={onGenreChange} />
      <select
        value={sort}
        onChange={(e) => onSortChange(e.target.value)}
        className="rounded-lg border border-white/10 bg-neutral-900 px-3 py-2 text-sm"
      >
        {SORTS.map((s) => (
          <option key={s.value} value={s.value}>{s.label}</option>
        ))}
      </select>
    </div>
  );
}
