'use client';

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <div className="alert alert-error flex items-center justify-between">
      <span>{error.message || 'Something went wrong.'}</span>
      <button onClick={() => reset()} className="btn btn-sm">
        Retry
      </button>
    </div>
  );
}