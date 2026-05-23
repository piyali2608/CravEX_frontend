import { useState, useCallback } from "react";

let _toastId = 0;

export function useToast() {
  const [toasts, setToasts] = useState([]);

  const show = useCallback((msg, type = "default") => {
    const id = ++_toastId;
    setToasts((prev) => [...prev, { id, msg, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3200);
  }, []);

  return { toasts, show };
}
