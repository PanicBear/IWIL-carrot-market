import { useState } from 'react';

interface UseMutationState {
  loading: boolean;
  data?: object;
  error?: object;
}

export default function useMutation(url: string): [(data: any) => void, UseMutationState] {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<undefined | any>(undefined);
  const [error, setError] = useState<undefined | any>(undefined);

  function mutation(data: any) {}

  return [mutation, { loading, data, error }];
}

// setSubmitting(true);
//     fetch('/api/users/enter', {
//       method: 'POST',
//       body: JSON.stringify(data),
//       headers: {
//         'Content-Type': 'application/json',
//       },
//     }).then(() => setSubmitting(false));
