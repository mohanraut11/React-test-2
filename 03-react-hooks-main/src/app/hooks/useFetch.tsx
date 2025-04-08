'use client';
// hooks/useFetch.ts

import { useState, useEffect, useRef } from 'react';

type FetchResult<T> = {
  data: T | null;
  isLoading: boolean;
  error: Error | null;
  refetch: () => void;
};

function useFetch<T = unknown>(url: string, config?: RequestInit): FetchResult<T> {
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const abortController = useRef<AbortController | null>(null);

  const fetchData = () => {
    // Cancel any ongoing request
    if (abortController.current) {
      abortController.current.abort();
    }

    const controller = new AbortController();
    abortController.current = controller;

    setIsLoading(true);
    setError(null);

    fetch(url, {
      ...config,
      signal: controller.signal,
    })
      .then(async (response) => {
        if (!response.ok) {
          throw new Error(`Failed to fetch: ${response.status}`);
        }

        const json = (await response.json()) as T;
        setData(json);
      })
      .catch((err) => {
        if (err.name !== 'AbortError') {
          setError(err instanceof Error ? err : new Error('Unknown error occurred'));
          setData(null);
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    fetchData();

    return () => {
      abortController.current?.abort();
    };
  }, [url]);

  return {
    data,
    isLoading,
    error,
    refetch: fetchData,
  };
}

export default useFetch;
