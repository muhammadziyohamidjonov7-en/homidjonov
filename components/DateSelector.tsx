"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { formatDate, getLocalDate } from "@/lib/utils";

interface DateSelectorProps {
  date: string;
  onChange: (date: string) => void;
}

function shiftDate(value: string, days: number): string {
  const date = new Date(`${value}T12:00:00`);
  date.setDate(date.getDate() + days);
  return getLocalDate(date);
}

export function DateSelector({ date, onChange }: DateSelectorProps) {
  const today = getLocalDate();

  return (
    <div className="date-selector" aria-label="Jadval sanasini tanlash">
      <button className="date-arrow" onClick={() => onChange(shiftDate(date, -1))} disabled={date <= today} aria-label="Oldingi kun"><ChevronLeft size={21} /></button>
      <div className="date-current"><strong>{date === today ? "Bugun" : formatDate(date)}</strong><span>{date === today ? formatDate(date) : "Maydon jadvali"}</span></div>
      <button className="date-arrow" onClick={() => onChange(shiftDate(date, 1))} aria-label="Keyingi kun"><ChevronRight size={21} /></button>
      <label className="date-picker-label"><span className="sr-only">Sanani tanlang</span><input type="date" min={today} value={date} onChange={(event) => event.target.value && onChange(event.target.value)} /></label>
    </div>
  );
}