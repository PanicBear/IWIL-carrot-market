import useSwr from 'swr';

const fetcher = (url: string) => fetch(url).then((response) => response.json());

export default function useUser() {
  const { data, error } = useSwr('/api/users/me', fetcher);
  // return router.push('/enter');
  return data;
}
