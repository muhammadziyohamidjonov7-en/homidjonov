"use client";

import { CalendarClock, ChevronDown, MapPin, Wallet } from "lucide-react";
import { DateSelector } from "@/components/DateSelector";
import { TimeSlot } from "@/components/TimeSlot";
import { getDailySlots } from "@/data/schedule";
import { formatPrice } from "@/lib/utils";
import type { Booking, Field, TimeSlot as TimeSlotType } from "@/types";

interface ScheduleProps {
  fields: Field[];
  selectedFieldId: string;
  date: string;
  bookings: Booking[];
  onFieldChange: (id: string) => void;
  onDateChange: (date: string) => void;
  onSelectSlot: (slot: TimeSlotType) => void;
}

export function Schedule({ fields, selectedFieldId, date, bookings, onFieldChange, onDateChange, onSelectSlot }: ScheduleProps) {
  const field = fields.find((item) => item.id === selectedFieldId) ?? fields[0];
  const slots = getDailySlots(field, date, bookings);
  const availableCount = slots.filter((slot) => slot.status === "available").length;

  return (
    <section className="schedule-layout" aria-labelledby="schedule-title">
      <div className="schedule-main">
        <div className="section-heading schedule-heading">
          <div><span className="eyebrow"><CalendarClock size={16} /> ONLAYN JADVAL</span><h1 id="schedule-title">Bo‘sh vaqtni tanlang</h1><p>O‘zingizga mos vaqtni belgilang va maydonni bron qiling.</p></div>
          <div className="availability-summary"><span className="availability-dot" /> {availableCount} ta bo‘sh vaqt</div>
        </div>
        <div className="schedule-controls">
          <label className="field-select-label"><span>Maydonni tanlang</span><span className="field-select-wrap"><MapPin size={19} aria-hidden="true" /><select value={field.id} onChange={(event) => onFieldChange(event.target.value)}>{fields.map((item) => <option key={item.id} value={item.id}>{item.name} · {item.district}</option>)}</select><ChevronDown size={18} aria-hidden="true" /></span></label>
          <div className="date-control-label"><span>Sanani tanlang</span><DateSelector date={date} onChange={onDateChange} /></div>
        </div>
        <div className="slot-legend"><span><i className="legend-dot free" /> Bo‘sh</span><span><i className="legend-dot busy" /> Band</span><span className="legend-hint">Bo‘sh vaqtni bosib bron qiling</span></div>
        <div className="slot-grid">{slots.map((slot) => <TimeSlot key={slot.id} slot={slot} onSelect={onSelectSlot} />)}</div>
      </div>
      <aside className="schedule-aside">
        <div className="aside-photo"><div className="aside-photo-overlay"><span className="aside-kicker">BUGUNGI O‘YININGIZ</span><strong>Maydon tayyor.<br />Jamoa sizni kutyapti.</strong></div></div>
        <div className="aside-info">
          <div><span className="aside-label">Tanlangan maydon</span><h2>{field.name}</h2><p><MapPin size={15} /> {field.district}, {field.address}</p></div>
          <div className="aside-price"><span><Wallet size={16} /> Bir soat narxi</span><strong>{formatPrice(field.price)}</strong></div>
          <div className="aside-note"><span className="note-check"><CalendarClock size={17} /></span><p>Band qilingan vaqtni boshqa foydalanuvchi tanlay olmaydi.</p></div>
        </div>
      </aside>
    </section>
  );
}