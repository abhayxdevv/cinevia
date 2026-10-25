export default function GenreSelect({ genres, value, onChange }) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="rounded-lg border border-white/10 bg-neutral-900 px-3 py-2 text-sm"
    >
      <option value="">All genres</option>
      {genres.map((g) => (
        <option key={g.id} value={g.id}>{g.name}</option>
      ))}
    </select>
  );
}
