export default function ErrorMessage({ message }) {
  return (
    <div className="rounded-xl border border-red-500/30 bg-red-500/10 p-4 text-sm text-red-300">
      {message}
    </div>
  );
}
