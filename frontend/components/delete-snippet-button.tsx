'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { deleteSnippet } from '@/lib/api';

interface DeleteSnippetButtonProps {
  id: string;
}

export function DeleteSnippetButton({ id }: DeleteSnippetButtonProps) {
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState(false);

  async function handleDelete() {
    const confirmed = window.confirm('Are you sure you want to delete this snippet?');
    if (!confirmed) return;

    try {
      setIsDeleting(true);
      await deleteSnippet(id);
      router.push('/');
      router.refresh();
    } catch (error) {
      alert(error instanceof Error ? error.message : 'Failed to delete snippet');
    } finally {
      setIsDeleting(false);
    }
  }

  return (
    <button
      type="button"
      onClick={handleDelete}
      disabled={isDeleting}
      className="btn btn-error btn-outline"
    >
      {isDeleting ? 'Deleting...' : 'Delete'}
    </button>
  );
}