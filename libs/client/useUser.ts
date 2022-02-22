import { useRouter } from 'next/router';
import { useEffect } from 'react';
import useSwr from 'swr';

const fetcher = (url: string) => fetch(url).then((response) => response.json());

export default function useUser() {
  const { data, error } = useSwr('/api/users/me', fetcher);
  const router = useRouter();

  useEffect(() => {
    if (data && !data.ok) {
      router.replace('/enter');
    }
  }, [data, router]);

  return {
    user: data?.profile,
    isLoading: !data && !error,
  };
}
