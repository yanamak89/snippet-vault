import { CreateSnippetForm } from '@/components/create-snippet-form';
import { Pagination } from '@/components/pagination';
import { SearchFilters } from '@/components/search-filters';
import { SnippetList } from '@/components/snippet-list';
import { getSnippets } from '@/lib/api';

interface HomePageProps {
  searchParams?: Promise<{
    page?: string;
    q?: string;
    tag?: string;
  }>;
}

export default async function HomePage({ searchParams }: HomePageProps) {
  const params = (await searchParams) ?? {};

  const page = Number(params.page ?? '1');
  const q = params.q ?? '';
  const tag = params.tag ?? '';

  try {
    const data = await getSnippets({
      page,
      limit: 10,
      q,
      tag,
    });

    return (
      <div className="space-y-6">
        <CreateSnippetForm />
        <SearchFilters />
        <SnippetList snippets={data.items} />
        <Pagination
          currentPage={data.meta.page}
          totalPages={data.meta.totalPages}
          q={q}
          tag={tag}
        />
      </div>
    );
  } catch {
    return (
      <div className="space-y-6">
        <CreateSnippetForm />
        <SearchFilters />
        <div className="alert alert-error">
          <span>Failed to load snippets. Check whether backend is running on port 3001.</span>
        </div>
      </div>
    );
  }
}