import { Snippet } from '@/lib/types';
import { SnippetCard } from './snippet-card';

interface SnippetListProps {
  snippets: Snippet[];
}

export function SnippetList({ snippets }: SnippetListProps) {
  if (snippets.length === 0) {
    return (
      <div className="card border border-dashed border-base-300 bg-base-100">
        <div className="card-body text-center text-base-content/70">
          No snippets found. Try another query or create a new snippet.
        </div>
      </div>
    );
  }

  return (
    <div className="grid gap-4">
      {snippets.map((snippet) => (
        <SnippetCard key={snippet._id} snippet={snippet} />
      ))}
    </div>
  );
}