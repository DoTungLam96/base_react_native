import {useRef, useState, useEffect} from 'react';

function useDebounce<T>(initValue: T): [v: T, d: (v: T) => void] {
  // State and setters for debounced value
  const [debouncedValue, setDebouncedValue] = useState<T>(initValue);
  const handler = useRef<NodeJS.Timeout>();
  const setValue = (newValue: T) => {
    handler.current && clearTimeout(handler.current);
    handler.current = setTimeout(() => {
      setDebouncedValue(newValue);
    }, 300);
  };
  useEffect(() => {
    return () => {
      handler.current && clearTimeout(handler.current);
    };
  }, []);
  return [debouncedValue, setValue];
}

export default useDebounce;
