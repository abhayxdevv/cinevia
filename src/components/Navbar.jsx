import SearchBar from "./SearchBar";

export default function Navbar({ search, onSearchChange }) {
  return (
    <header className="sticky top-0 z-30 border-b border-white/10 bg-neutral-950/90 backdrop-blur">
      <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-2xl font-extrabold tracking-tight">
          Cine<span className="text-brand">via</span>
        </h1>
        <SearchBar value={search} onChange={onSearchChange} />
      </div>
    </header>
  );
}
