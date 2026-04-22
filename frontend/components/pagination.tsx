import Link from 'next/link';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  q?: string;
  tag?: string;
}

export function Pagination({
  currentPage,
  totalPages,
  q,
  tag,
}: PaginationProps) {
  if(totalPages <= 1) return null;

  const buildHref = (page: number) => {
    const params = new URLSearchParams();
    params.set('page', String(page));
    if(q) params.set('q', q);
    if(tag) params.set('tag', tag);
    return `/?${params.toString()}`;
  };

  return (
    <div className="flex items-center justify-between rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
      <Link href={buildHref(Math.max(1, currentPage -1))} className={`rounded-lg border px-4 py-2 ${currentPage === 1 ? 'pointer-events-none opacity-50' : ''}`}
      >
        Previous
      </Link>

      <p className="text-sm text-gray-600">
        Page {currentPage} of {totalPages}
      </p>

      <Link href={buildHref(Math.min(totalPages, currentPage + 1))}
      className={`rounded-lg border px-4 py-2 ${
          currentPage === totalPages ? 'pointer-events-none opacity-50' : ''
      }`}>
        Next
      </Link>
    </div>
  )
}