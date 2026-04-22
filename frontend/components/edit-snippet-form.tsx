'use client';

import { useRouter } from 'next/navigation';
import { FormEvent, useState } from 'react';
import { updateSnippet } from '@/lib/api';
import { Snippet, SnippetsType } from '@/lib/types';

interface EditSnippetFormProps {
  snippet: Snippet;
}

export function EditSnippetForm({ snippet }: EditSnippetFormProps) {
  const router = useRouter();

  const [form, setForm] = useState({
    title: snippet.title,
    content: snippet.content,
    tags: snippet.tags.join(', '),
    type: snippet.type as SnippetsType,
  });

  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError('');

    if (!form.title.trim() || !form.content.trim()) {
      setError('Title and content are required.');
      return;
    }

    try {
      setIsSubmitting(true);
      await updateSnippet(snippet._id, form);
      router.push(`/snippets/${snippet._id}`);
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unexpected error');
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="card border border-base-300 bg-base-100 shadow-sm">
      <div className="card-body">
        <h1 className="card-title">Edit snippet</h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <label className="form-control w-full">
            <div className="label">
              <span className="label-text">Title</span>
            </div>
            <input
              className="input input-bordered w-full"
              value={form.title}
              onChange={(e) =>
                setForm((prev) => ({ ...prev, title: e.target.value }))
              }
              required
            />
          </label>

          <label className="form-control w-full">
            <div className="label">
              <span className="label-text">Content</span>
            </div>
            <textarea
              className="textarea textarea-bordered min-h-36 w-full"
              value={form.content}
              onChange={(e) =>
                setForm((prev) => ({ ...prev, content: e.target.value }))
              }
              required
            />
          </label>

          <div className="grid gap-4 md:grid-cols-2">
            <label className="form-control w-full">
              <div className="label">
                <span className="label-text">Tags</span>
              </div>
              <input
                className="input input-bordered w-full"
                value={form.tags}
                onChange={(e) =>
                  setForm((prev) => ({ ...prev, tags: e.target.value }))
                }
                placeholder="react, nextjs, api"
              />
            </label>

            <label className="form-control w-full">
              <div className="label">
                <span className="label-text">Type</span>
              </div>
              <select
                className="select select-bordered w-full"
                value={form.type}
                onChange={(e) =>
                  setForm((prev) => ({
                    ...prev,
                    type: e.target.value as SnippetsType,
                  }))
                }
              >
                <option value="note">Note</option>
                <option value="link">Link</option>
                <option value="command">Command</option>
              </select>
            </label>
          </div>

          {error ? (
            <div className="alert alert-error">
              <span>{error}</span>
            </div>
          ) : null}

          <div className="flex flex-wrap gap-3">
            <button
              type="submit"
              disabled={isSubmitting}
              className="btn btn-primary"
            >
              {isSubmitting ? 'Saving...' : 'Save changes'}
            </button>

            <button
              type="button"
              onClick={() => router.back()}
              className="btn btn-outline"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}