import { useState } from "react";
import RatingStars from "./RatingStars";

export default function ReviewForm({ onSubmit }) {
  const [name, setName] = useState("");
  const [rating, setRating] = useState(0);
  const [text, setText] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!rating || !text.trim()) return setError("Please add a rating and a review.");
    onSubmit({ name: name.trim() || "Anonymous", rating, text: text.trim() });
    setName(""); setRating(0); setText(""); setError("");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3 rounded-xl bg-neutral-900 p-4">
      <h4 className="font-semibold">Write a review</h4>
      <RatingStars value={rating} onChange={setRating} />
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Your name (optional)"
        className="w-full rounded-lg border border-white/10 bg-neutral-800 px-3 py-2 text-sm outline-none focus:border-brand"
      />
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        rows={3}
        placeholder="What did you think?"
        className="w-full rounded-lg border border-white/10 bg-neutral-800 px-3 py-2 text-sm outline-none focus:border-brand"
      />
      {error && <p className="text-xs text-red-400">{error}</p>}
      <button className="rounded-lg bg-brand px-4 py-2 text-sm font-semibold hover:opacity-90">
        Submit review
      </button>
    </form>
  );
}
