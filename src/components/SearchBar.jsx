export default function SearchBar({ value, onChange }) {
  return (
    <input
      type="search"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder="Search movies..."
      className="w-full rounded-full border border-white/10 bg-neutral-900 px-4 py-2 text-sm outline-none focus:border-brand sm:w-80"
    />
  );
}
