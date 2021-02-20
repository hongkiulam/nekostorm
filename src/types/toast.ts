export interface Toast {
  id: number;
  kind: "info" | "danger" | "warning" | "success";
  icon?: "info" | "danger" | "warning" | "success";
  label: string;
  timeoutId: number;
}
