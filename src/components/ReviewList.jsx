import RatingStars from "./RatingStars";

export default function ReviewList({ reviews, onDelete }) {
  if (!reviews.length)
    return <p className="text-sm text-neutral-400">No reviews yet. Be the first!</p>;

  return (
    <ul className="space-y-3">
      {reviews.map((r) => (
        <li key={r.id} className="rounded-xl bg-neutral-900 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold">{r.name}</p>
              <RatingStars value={r.rating} size="text-base" />
            </div>
            <button onClick={() => onDelete(r.id)} className="text-xs text-neutral-500 hover:text-red-400">
              Delete
            </button>
          </div>
          <p className="mt-2 text-sm text-neutral-300">{r.text}</p>
          <p className="mt-1 text-xs text-neutral-500">{new Date(r.date).toLocaleDateString()}</p>
        </li>
      ))}
    </ul>
  );
}
