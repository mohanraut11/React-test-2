'use client';
// ../hooks/useFetch.ts
import { useState, useEffect, useCallback } from 'react';

interface FetchState<T> {
  data: T | null;
  loading: boolean;
  error: Error | null;
}

interface UseFetchReturn<T> extends FetchState<T> {
  refetch: () => Promise<void>;
}

function useFetch<T = unknown>(
  url: string,
  options?: RequestInit
): UseFetchReturn<T> {
  const [state, setState] = useState<FetchState<T>>({
    data: null,
    loading: true,
    error: null,
  });

  const fetchData = useCallback(async () => {
    try {
      setState((prev) => ({ ...prev, loading: true, error: null }));
      const response = await fetch(url, options);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const json = (await response.json()) as T;
      setState({ data: json, loading: false, error: null });
    } catch (err) {
      setState({
        data: null,
        loading: false,
        error:
          err instanceof Error ? err : new Error('An unknown error occurred'),
      });
    }
  }, [url, options]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { ...state, refetch: fetchData };
}

export default useFetch;
