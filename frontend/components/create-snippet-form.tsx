'use client';

import { FormEvent, useState } from 'react';
import  { useRouter } from 'next/navigation';
import { createSnippet } from '@/lib/api';
import { SnippetsType } from '@/lib/types';

const initialState = {
  title: '',
  content: '',
  tags: '',
  type: 'note' as SnippetsType
};

export function CreateSnippetForm() {
  const router = useRouter();
  const [form, setForm] = useState(initialState);
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>){
    event.preventDefault();
    setError('');

    if(!form.title.trim() || !form.content.trim()) {
      setError('Title and content are required.')
    }

    try {
      setIsSubmitting(true);
      await createSnippet(form);
      setForm(initialState);
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unexpected error');
    } finally {
      setIsSubmitting(false);
    }
  } return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
      <h2 className="text-lg font-semibold">Create new snippet</h2>
      <div className="space-y-1">
        <label className="text-sm font-medium">Title</label>
        <input
          className="w-full rounded-lg border px-3 py-2"
          value={form.title}
          onChange={(e) => setForm((prev) => ({ ...prev, title: e.target.value }))}
          placeholder="Useful docker command"
          required
        />
      </div>
      <div className="space-y-1">
        <label className="text-sm font-medium">Content</label>
        <textarea className="min-h-[120px] w-full rounded-lg border px-3 py-2" value={form.content}
          onChange={(e) => setForm((prev) => ({ ...prev, content: e.target.value }))}
          placeholder="docker compose up --build"
          required
        />
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-1">
          <label className="text-sm font-medium">Tags</label>
          <input
            className="w-full rounded-lg border px-3 py-2"
            value={form.tags}
            onChange={(e) => setForm((prev) => ({ ...prev, tags: e.target.value }))}
            placeholder="docker, backend, devops"
          />
        </div>
        <div className="space-y-1">
          <label className="text-sm font-medium">Type</label>
          <select
            className="w-full rounded-lg border px-3 py-2"
            value={form.type}
            onChange={(e) =>
              setForm((prev) => ({ ...prev, type: e.target.value as SnippetsType }))
            }
          >
            <option value="note">Note</option>
            <option value="link">Link</option>
            <option value="command">Command</option>
          </select>
        </div>
      </div>
      {error ? <p className="text-sm text-red-600">{error}</p> : null}
      <button
        type="submit"
        disabled={isSubmitting}
        className="rounded-lg bg-black px-4 py-2 text-white disabled:opacity-60"
      >
        {isSubmitting ? 'Creating...' : 'Create snippet'}
      </button>
    </form>
  );
}