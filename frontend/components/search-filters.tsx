'use client';

import { FormEvent, useState } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

export function SearchFilters() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [q, setQ] = useState(searchParams.get('q') ?? '');
  const [tag, setTag] = useState(searchParams.get('tag') ?? '');

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const params = new URLSearchParams(searchParams.toString());

    if (q.trim()) params.set('q', q.trim());
    else params.delete('q');

    if(tag.trim()) params.set('tag', tag.trim());
    else params.delete('tag');

    params.set('page', '1');
    router.push(`${pathname}?${params.toString()}`);
  }

  function clearFilters(){
    setQ('');
    setTag('');
    router.push(pathname);
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="grid gap-3 rounded-xl border border-gray-200 bg-white p-4 shadow-sm md:grid-cols-[1fr_220px_auto_auto]"
    >
      <input
        className="rounded-lg border px-3 py-2"
        placeholder="Search by title or content"
        value={q}
        onChange={(e) => setQ(e.target.value)}
      />

      <input
        className="rounded-lg border px-3 py-2"
        placeholder="Filter by tag"
        value={tag}
        onChange={(e) => setTag(e.target.value)}
      />

      <button
        type="submit"
        className="rounded-lg bg-black px-4 py-2 text-white"
      >
        Apply
      </button>

      <button
        type="button"
        onClick={clearFilters}
        className="rounded-lg border px-4 py-2"
      >
        Reset
      </button>
    </form>
  );
}