import type { Field } from "@/types";
import { EmptyState } from "@/components/EmptyState";
import { FieldCard } from "@/components/FieldCard";

interface FieldGridProps {
  fields: Field[];
  onSelectField: (fieldId: string) => void;
}

export function FieldGrid({ fields, onSelectField }: FieldGridProps) {
  if (fields.length === 0) return <EmptyState />;

  return (
    <div className="field-grid">
      {fields.map((field) => <FieldCard key={field.id} field={field} onSelect={onSelectField} />)}
    </div>
  );
}