import { useState } from "react";

export default function RatingStars({ value = 0, onChange, size = "text-2xl" }) {
  const [hover, setHover] = useState(0);
  const readOnly = !onChange;

  return (
    <div className={`flex ${size}`}>
      {[1, 2, 3, 4, 5].map((n) => (
        <button
          key={n}
          type="button"
          disabled={readOnly}
          onClick={() => onChange?.(n)}
          onMouseEnter={() => !readOnly && setHover(n)}
          onMouseLeave={() => setHover(0)}
          aria-label={`${n} star`}
          className={`${n <= (hover || value) ? "text-yellow-400" : "text-neutral-600"} ${readOnly ? "cursor-default" : ""}`}
        >
          ★
        </button>
      ))}
    </div>
  );
}
