import { useState, useEffect, useRef } from "react";

interface IntersectionObserverOptions extends IntersectionObserverInit {
  once?: boolean;
}

export function useIntersectionObserver(
  options?: IntersectionObserverOptions,
  refProp?: React.RefObject<HTMLDivElement>
) {
  const refHook = useRef<HTMLDivElement>(null);
  const ref = refProp || refHook;
  const [isIntersecting, setIsIntersecting] = useState(false);

  useEffect(() => {
    if (ref.current == null) return;
    const observer = new IntersectionObserver(([entry]) => {
      setIsIntersecting(entry.isIntersecting);
      if (entry.isIntersecting && options?.once) {
        observer.unobserve(ref.current!);
      }
    }, options);
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [options, ref]);

  return { ref, isIntersecting };
}
