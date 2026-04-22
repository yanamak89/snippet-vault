import { Snippet, SnippetFormValues, SnippetsResponse } from './types';
import { buildQueryString } from './utils';

function getApiUrl(): string {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  if (!apiUrl) {
    throw new Error('NEXT_PUBLIC_API_URL is not defined');
  }

  return apiUrl;
}

function parseTags(tags: string): string[] {
  return tags
    .split(',')
    .map((tag) => tag.trim())
    .filter(Boolean);
}

export async function getSnippets(params: {
  page?: number;
  limit?: number;
  q?: string;
  tag?: string;
}): Promise<SnippetsResponse> {
  const query = buildQueryString(params);
  const response = await fetch(`${getApiUrl()}/snippets?${query}`, {
    cache: 'no-store',
  });

  if (!response.ok) {
    throw new Error('Failed to fetch snippets');
  }

  return response.json();
}

export async function getSnippet(id: string): Promise<Snippet> {
  const response = await fetch(`${getApiUrl()}/snippets/${id}`, {
    cache: 'no-store',
  });

  if (!response.ok) {
    throw new Error('Failed to fetch snippet');
  }

  return response.json();
}

export async function createSnippet(
  values: SnippetFormValues,
): Promise<Snippet> {
  const response = await fetch(`${getApiUrl()}/snippets`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      title: values.title,
      content: values.content,
      tags: parseTags(values.tags),
      type: values.type,
    }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.message?.join?.(', ') || data.message || 'Failed to create snippet',
    );
  }

  return data;
}

export async function updateSnippet(
  id: string,
  values: SnippetFormValues,
): Promise<Snippet> {
  const response = await fetch(`${getApiUrl()}/snippets/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      title: values.title,
      content: values.content,
      tags: parseTags(values.tags),
      type: values.type,
    }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.message?.join?.(', ') || data.message || 'Failed to update snippet',
    );
  }

  return data;
}

export async function deleteSnippet(id: string): Promise<void> {
  const response = await fetch(`${getApiUrl()}/snippets/${id}`, {
    method: 'DELETE',
  });

  if (!response.ok) {
    const data = await response.json().catch(() => null);
    throw new Error(data?.message || 'Failed to delete snippet');
  }
}