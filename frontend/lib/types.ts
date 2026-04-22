export type SnippetsType = 'link' | 'note' | 'command';

export interface Snippet {
  _id: string;
  title: string;
  content: string;
  tags: string[];
  type: SnippetsType;
  createdAt: string;
  updatedAt: string;
}

export interface SnippetsResponse {
  items: Snippet[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}
export interface SnippetFormValues {
  title: string;
  content: string;
  tags: string;
  type:SnippetsType;
}