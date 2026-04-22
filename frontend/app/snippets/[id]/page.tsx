import Link from 'next/link';
import { DeleteSnippetButton } from '@/components/delete-snippet-button';
import { getSnippet } from '@/lib/api';
import { formatDate } from '@/lib/utils';

interface SnippetDetailsPageProps {
  params: Promise<{ id: string }>;
}

export default async function SnippetDetailsPage({
  params,
}: SnippetDetailsPageProps) {
  const { id } = await params;
  const snippet = await getSnippet(id);

  return (
    <div className="space-y-6">
      <div className="card border border-base-300 bg-base-100 shadow-sm">
        <div className="card-body">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold">{snippet.title}</h1>
              <p className="mt-2 text-sm opacity-70">
                Created {formatDate(snippet.createdAt)} - Updated {formatDate(snippet.updatedAt)}
              </p>
            </div>

            <div className="badge badge-outline">{snippet.type}</div>
          </div>

          <div className="divider my-2" />

          <div className="whitespace-pre-wrap text-base">
            {snippet.content}
          </div>

          <div className="mt-4 flex flex-wrap gap-2">
            {snippet.tags.length > 0 ? (
              snippet.tags.map((tag) => (
                <span key={tag} className="badge badge-neutral badge-outline">
                  #{tag}
                </span>
              ))
            ) : (
              <span className="text-sm opacity-50">No tags</span>
            )}
          </div>
        </div>
      </div>

      <div className="flex flex-wrap gap-3">
        <Link href={`/snippets/${snippet._id}/edit`} className="btn btn-primary">
          Edit
        </Link>

        <DeleteSnippetButton id={snippet._id} />

        <Link href="/" className="btn btn-outline">
          Back
        </Link>
      </div>
    </div>
  );
}