import { useState, useCallback } from 'react';

type TsendRequest = {
  requestConfig: { url: string; method?: string; headers?: {}; body?: string };
  applyData: (data: any) => void;
};

const useHttp = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const sendRequest = useCallback(
    async ({ requestConfig, applyData }: TsendRequest) => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await fetch(requestConfig.url, {
          method: requestConfig.method ? requestConfig.method : 'GET',
          headers: requestConfig.headers ? requestConfig.headers : {},
          body: requestConfig.body ? JSON.stringify(requestConfig.body) : null,
        });

        if (!response.ok) {
          throw new Error('Request failed!');
        }

        const data = await response.json();
        console.log('data', data);
        applyData(data);
      } catch (err: any) {
        setError(err.message || 'Something went wrong!');
      }
      setIsLoading(false);
    },
    []
  );

  return {
    isLoading,
    error,
    sendRequest,
  };
};

export default useHttp;
