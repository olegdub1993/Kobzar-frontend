import { MutableRefObject, useRef } from "react";

export default function useDebouncedFunction(func:(arg:string)=>void, delay:number) {
  const ref:MutableRefObject<{} | null | undefined> = useRef();

  return (arg:string) => {
    clearTimeout(ref.current as string);
    ref.current = setTimeout(() => func(arg), delay);
  };
}
