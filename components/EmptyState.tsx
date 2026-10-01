import { SearchX } from "lucide-react";

export function EmptyState() {
  return (
    <div className="empty-state">
      <span className="empty-icon"><SearchX size={28} aria-hidden="true" /></span>
      <h3>Maydon topilmadi</h3>
      <p>Qidiruv yoki filtrni o‘zgartirib ko‘ring.</p>
    </div>
  );
}