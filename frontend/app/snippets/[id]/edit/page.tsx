import { EditSnippetForm } from '@/components/edit-snippet-form';
import { getSnippet } from '@/lib/api';

interface EditSnippetPageProps {
  params: Promise<{ id: string }>;
}

export default async function EditSnippetPage({
  params,
}: EditSnippetPageProps) {
  const { id } = await params;
  const snippet = await getSnippet(id);

  return <EditSnippetForm snippet={snippet} />;
}