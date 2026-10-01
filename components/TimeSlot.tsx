"use client";

import { Check, LockKeyhole } from "lucide-react";
import type { TimeSlot as TimeSlotType } from "@/types";

interface TimeSlotProps {
  slot: TimeSlotType;
  onSelect: (slot: TimeSlotType) => void;
}

export function TimeSlot({ slot, onSelect }: TimeSlotProps) {
  const available = slot.status === "available";

  return (
    <button
      className={`time-slot ${available ? "slot-available" : "slot-booked"}`}
      onClick={() => available && onSelect(slot)}
      disabled={!available}
      aria-label={`${slot.startTime} dan ${slot.endTime} gacha, ${available ? "bo‘sh" : "band"}`}
    >
      <span className="slot-time">{slot.startTime} – {slot.endTime}</span>
      <span className="slot-status">{available ? <Check size={16} aria-hidden="true" /> : <LockKeyhole size={14} aria-hidden="true" />}{available ? "Bo‘sh" : "Band"}</span>
    </button>
  );
}