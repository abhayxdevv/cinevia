import { useCallback, useEffect, useState } from "react";

const STORAGE_KEY = "cinevia_reviews";

const load = () => {
  try { return JSON.parse(localStorage.getItem(STORAGE_KEY)) || {}; }
  catch { return {}; }
};

export default function useReviews() {
  const [reviews, setReviews] = useState(load);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(reviews));
  }, [reviews]);

  const getReviews = useCallback((movieId) => reviews[movieId] || [], [reviews]);

  const addReview = (movieId, { name, rating, text }) => {
    const review = { id: Date.now(), name, rating, text, date: new Date().toISOString() };
    setReviews((prev) => ({ ...prev, [movieId]: [review, ...(prev[movieId] || [])] }));
  };

  const deleteReview = (movieId, reviewId) =>
    setReviews((prev) => ({
      ...prev,
      [movieId]: (prev[movieId] || []).filter((r) => r.id !== reviewId),
    }));

  const getAverage = (movieId) => {
    const list = reviews[movieId] || [];
    if (!list.length) return null;
    return list.reduce((s, r) => s + r.rating, 0) / list.length;
  };

  return { getReviews, addReview, deleteReview, getAverage };
}
