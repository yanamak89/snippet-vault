export function formatDate(date: string) {
  return new Intl.DateTimeFormat('uk-Ua', {
    dateStyle: 'medium',
    timeStyle: 'short',
  }).format(new Date(date));
}

export function buildQueryString(
  params: Record<string, string | number | undefined>
) {
  const searchParams = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if(value !== undefined && value !== '') {
      searchParams.set(key, String(value));
    }
  });
  return searchParams.toString();
}
