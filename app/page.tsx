"use client";

import { useEffect, useMemo, useState } from "react";
import { ArrowRight, CalendarDays, MapPin, ShieldCheck, Sparkles } from "lucide-react";
import { BottomNavigation } from "@/components/BottomNavigation";
import { BookingModal } from "@/components/BookingModal";
import { FieldGrid } from "@/components/FieldGrid";
import { Header } from "@/components/Header";
import { Schedule } from "@/components/Schedule";
import { SearchFilter, type PriceFilter } from "@/components/SearchFilter";
import { fields } from "@/data/fields";
import { readBookings, saveBooking } from "@/lib/storage";
import { getLocalDate } from "@/lib/utils";
import type { Booking, PaymentType, TimeSlot, ViewName } from "@/types";

export default function HomePage() {
  const [activeView, setActiveView] = useState<ViewName>("fields");
  const [selectedFieldId, setSelectedFieldId] = useState(fields[0].id);
  const [selectedDate, setSelectedDate] = useState(getLocalDate());
  const [selectedSlot, setSelectedSlot] = useState<TimeSlot | null>(null);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [query, setQuery] = useState("");
  const [district, setDistrict] = useState("all");
  const [price, setPrice] = useState<PriceFilter>("all");

  useEffect(() => setBookings(readBookings()), []);

  const districts = useMemo(() => Array.from(new Set(fields.map((field) => field.district))), []);
  const filteredFields = useMemo(() => fields.filter((field) => {
    const text = `${field.name} ${field.district} ${field.address}`.toLocaleLowerCase("uz-UZ");
    const matchesText = text.includes(query.trim().toLocaleLowerCase("uz-UZ"));
    const matchesDistrict = district === "all" || field.district === district;
    const matchesPrice = price === "all"
      || (price === "under150" && field.price < 150000)
      || (price === "150to200" && field.price >= 150000 && field.price <= 200000)
      || (price === "over200" && field.price > 200000);
    return matchesText && matchesDistrict && matchesPrice;
  }), [query, district, price]);

  const selectedField = fields.find((field) => field.id === selectedFieldId) ?? fields[0];

  const openSchedule = (fieldId: string) => {
    setSelectedFieldId(fieldId);
    setActiveView("schedule");
    setSelectedDate(getLocalDate());
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const confirmBooking = (customerName: string, phone: string, paymentType: PaymentType) => {
    if (!selectedSlot) return;
    const booking: Booking = {
      id: crypto.randomUUID(),
      fieldId: selectedField.id,
      date: selectedDate,
      startTime: selectedSlot.startTime,
      endTime: selectedSlot.endTime,
      customerName,
      phone,
      paymentType,
    };
    setBookings(saveBooking(booking));
  };

  return (
    <div className="app-shell">
      <Header activeView={activeView} onNavigate={setActiveView} />
      <main className="page-container">
        {activeView === "fields" ? (
          <>
            <section className="hero-section">
              <div className="hero-copy">
                <span className="hero-label"><Sparkles size={16} /> O‘YININGIZ SHU YERDAN BOSHLANADI</span>
                <h1>Yaxshi o‘yin uchun<br /><span>yaxshi maydon.</span></h1>
                <p>Toshkent bo‘ylab mini futbol maydonlarini toping, bo‘sh vaqtni tanlang va bir necha qadamda bron qiling.</p>
                <div className="hero-trust"><span><ShieldCheck size={17} /> Tasdiqlangan maydonlar</span><span><CalendarDays size={17} /> Tezkor bron</span></div>
              </div>
              <div className="hero-visual" aria-label="Mini futbol maydoni">
                <div className="hero-visual-shade" />
                <div className="hero-visual-caption"><span className="live-indicator" /> TOSHKENTDA 6 TA MAYDON</div>
                <div className="hero-location"><MapPin size={16} /> Toshkent shahri <ArrowRight size={16} /></div>
              </div>
              <div className="hero-orbit orbit-one" /><div className="hero-orbit orbit-two" />
            </section>
            <section className="fields-section" aria-labelledby="fields-title">
              <div className="section-heading fields-heading"><div><span className="eyebrow">O‘ZINGIZGA MOSINI TOPING</span><h2 id="fields-title">Mini futbol maydonlari</h2><p>Yaqin atrofdagi maydonlar, shaffof narxlar va qulay bron.</p></div><span className="field-count">{filteredFields.length} ta maydon</span></div>
              <SearchFilter query={query} district={district} price={price} districts={districts} onQueryChange={setQuery} onDistrictChange={setDistrict} onPriceChange={setPrice} />
              <FieldGrid fields={filteredFields} onSelectField={openSchedule} />
            </section>
          </>
        ) : (
          <Schedule fields={fields} selectedFieldId={selectedFieldId} date={selectedDate} bookings={bookings} onFieldChange={setSelectedFieldId} onDateChange={setSelectedDate} onSelectSlot={setSelectedSlot} />
        )}
      </main>
      <footer className="site-footer"><span>© 2026 MiniFutbol</span><span>Toshkentda o‘yin uchun maydon topish oson.</span><a href="tel:+998712000000">Yordam: +998 71 200 00 00</a></footer>
      <BottomNavigation activeView={activeView} onNavigate={setActiveView} />
      {selectedSlot && <BookingModal field={selectedField} date={selectedDate} slot={selectedSlot} onClose={() => setSelectedSlot(null)} onConfirm={confirmBooking} />}
    </div>
  );
}