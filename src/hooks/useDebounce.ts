import { useState, useEffect } from "react";

export default function useDebounce(value: string, delay: number) {
  const [debouncedValue, setDebouncedValue] = useState(value);
  let handler: ReturnType<typeof setTimeout>;
  useEffect(() => {
    handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      handler && clearTimeout(handler);
    };
  }, [value]);

  return debouncedValue;
}
