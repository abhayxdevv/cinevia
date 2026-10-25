export default function LoadMore({ onClick }) {
  return (
    <div className="mt-8 flex justify-center">
      <button onClick={onClick} className="rounded-full bg-brand px-6 py-2 text-sm font-semibold hover:opacity-90">
        Load more
      </button>
    </div>
  );
}
