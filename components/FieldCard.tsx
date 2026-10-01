"use client";

import Image from "next/image";
import { ArrowUpRight, Clock3, MapPin, ShieldCheck, Star } from "lucide-react";
import type { Field } from "@/types";
import { formatPrice } from "@/lib/utils";

interface FieldCardProps {
  field: Field;
  onSelect: (fieldId: string) => void;
}

export function FieldCard({ field, onSelect }: FieldCardProps) {
  return (
    <article className="field-card">
      <div className="field-image-wrap">
        <Image src={field.image} alt={`${field.name} futbol maydoni`} fill sizes="(max-width: 700px) 100vw, (max-width: 1100px) 50vw, 33vw" className="field-image" unoptimized />
        <span className={`field-badge ${field.badge === "Yangi" ? "badge-new" : "badge-popular"}`}>{field.badge}</span>
        <span className="rating-badge"><Star size={15} fill="currentColor" aria-hidden="true" /> {field.rating.toFixed(1)}</span>
      </div>
      <div className="field-card-content">
        <div className="field-title-row">
          <div><h3>{field.name}</h3><p className="field-location"><MapPin size={16} aria-hidden="true" /> {field.district}, {field.address}</p></div>
        </div>
        <div className="field-details">
          <span><ShieldCheck size={16} aria-hidden="true" /> {field.surface}</span>
          <span><Clock3 size={16} aria-hidden="true" /> {field.openingTime} – {field.closingTime}</span>
          <span className="field-type">{field.indoor ? "Yopiq" : "Ochiq"} maydon</span>
        </div>
        <div className="field-card-footer">
          <p className="field-price"><strong>{formatPrice(field.price)}</strong><span>/ soat</span></p>
          <button className="card-cta" onClick={() => onSelect(field.id)} aria-label={`${field.name}: bo‘sh vaqtlarni ko‘rish`}>
            Vaqtlarni ko‘rish <ArrowUpRight size={18} aria-hidden="true" />
          </button>
        </div>
      </div>
    </article>
  );
}