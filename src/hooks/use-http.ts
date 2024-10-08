import { useState, useCallback } from "react";
const useHttp = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(null);
  const [done, setDone] = useState(false);
  const sendRequest = useCallback(
    async (
      requestConifg: { url: string; method?: "PUT" | "GET" | "POST"; headers?: { "Content-Type": "application/json" } | {}; body?: any },
      dataHandler
    ) => {
      setIsLoading(true);
      setHasError(null);
      try {
        const response = await fetch(requestConifg.url, {
          method: requestConifg.method || "GET",
          body: requestConifg.body || null,
          headers: requestConifg.headers || {},
        });
        if (!response.ok) throw new Error("some thing went wrong");
        const data = await response.json();
        dataHandler(data);
        setDone(true);
      } catch (err: any) {
        setHasError(err.message || "somthing went wrong");
      }
      setIsLoading(false);
    },
    []
  );
  return {
    isLoading,
    hasError,
    done,
    sendRequest,
  };
};
export default useHttp;
