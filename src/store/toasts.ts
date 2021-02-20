import type { Toast } from "src/types/toast";
import { get, writable } from "svelte/store";

const useToasts = () => {
  const _toasts = writable<Toast[]>([]);

  const add = (toast: Pick<Toast, "label" | "kind" | "icon">) => {
    const uuid = Math.floor(Math.random() * 10000);
    const newToast: Toast = {
      label: toast.label,
      kind: toast.kind,
      icon: toast.icon,
      id: uuid,
      timeoutId: window.setTimeout(() => {
        _toasts.update((t) => t.filter((toast) => toast.id !== uuid));
      }, 5000),
    };
    _toasts.update((t) => [...t, newToast]);
  };

  const remove = (id: number) => {
    const toastToRemove = get(_toasts).find((t) => t.id === id);
    window.clearTimeout(toastToRemove?.timeoutId);
    _toasts.update((t) => t.filter((toast) => toast.id !== id));
  };

  return {
    add,
    subscribe: _toasts.subscribe,
    remove,
  };
};

export const toasts = useToasts();
