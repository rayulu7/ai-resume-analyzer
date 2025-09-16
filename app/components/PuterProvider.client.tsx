import { usePuterStore } from "~/lib/puter";
import { useEffect } from "react";

export default function PuterProvider() {
  const { init } = usePuterStore();

  useEffect(() => {
    init();
  }, [init]);

  return null;
}