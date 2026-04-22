import Link from 'next/link';
import { Snippet } from '@/lib/types';
import { formatDate } from '@/lib/utils';

interface SnippetCardProps {
  snippet: Snippet;
}

export function SnippetCard({ snippet }: SnippetCardProps) {
  return (
    <article className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
      <div className='mb-3 flex items-start justify-between gap-4'>
        <div>
          <Link 
            href={`/snippets/${snippet._id}`}
            className="text-lg font-semibold hover:underline">
              {snippet.title}
          </Link>
          <p className="mt-1 text-sm text-gray-500">
            {snippet.type} - Updated {formatDate(snippet.updatedAt)}
          </p>
        </div>
        <span className="rounded-full border px-3 py-1 text-xs uppercase tracking-wide text-gray-600">
          {snippet.type}
        </span>
      </div>
      <p className="mb-4 whitespace-pre-wrap text-sm text-gray-700">
        {snippet.content.length > 220
          ? `${snippet.content.slice(0, 220)}...`
          : snippet.content}
      </p>

      <div className="flex flex-wrap gap-2">
        {snippet.tags.length > 0 ? (
          snippet.tags.map((tag) => (
            <span 
              key={tag}
              className="rounded-full bg-gray-100 px-3 py-1 text-xs text-gray-700">
                #{tag} 
              </span>
          ))
        ) : (
          <span className="text-xs text-gray-400">No tags</span>
        )}
      </div>
    </article>
  );
}
