"use client";

import { useEffect, useRef, useState } from "react";
import { CheckCircle2, CreditCard, X } from "lucide-react";
import { formatDate, formatPrice } from "@/lib/utils";
import type { Field, PaymentType, TimeSlot } from "@/types";

interface BookingModalProps {
  field: Field;
  date: string;
  slot: TimeSlot;
  onClose: () => void;
  onConfirm: (customerName: string, phone: string, paymentType: PaymentType) => void;
}

export function BookingModal({ field, date, slot, onClose, onConfirm }: BookingModalProps) {
  const [customerName, setCustomerName] = useState("");
  const [phone, setPhone] = useState("");
  const [paymentType, setPaymentType] = useState<PaymentType>("Naqd");
  const [success, setSuccess] = useState(false);
  const nameInput = useRef<HTMLInputElement>(null);

  useEffect(() => {
    nameInput.current?.focus();
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKeyDown);
    document.body.classList.add("modal-open");
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      document.body.classList.remove("modal-open");
    };
  }, [onClose]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onConfirm(customerName.trim(), phone.trim(), paymentType);
    setSuccess(true);
  };

  return (
    <div className="modal-backdrop" onMouseDown={(event) => event.target === event.currentTarget && onClose()}>
      <section className="booking-modal" role="dialog" aria-modal="true" aria-labelledby="booking-title">
        <button className="modal-close" type="button" onClick={onClose} aria-label="Oynani yopish"><X size={21} /></button>
        {success ? (
          <div className="booking-success"><span><CheckCircle2 size={34} /></span><h2 id="booking-title">Bron muvaffaqiyatli!</h2><p>{field.name} maydoni {slot.startTime} vaqtiga band qilindi.</p><button className="primary-button success-button" onClick={onClose}>Tushunarli</button></div>
        ) : (
          <>
            <div className="modal-heading"><span className="modal-icon"><CreditCard size={20} /></span><div><span className="eyebrow">YANGI BRON</span><h2 id="booking-title">Maydonni bron qilish</h2></div></div>
            <div className="booking-summary">
              <div><span>Maydon</span><strong>{field.name}</strong></div>
              <div><span>Sana</span><strong>{formatDate(date)}</strong></div>
              <div><span>Vaqt</span><strong>{slot.startTime} – {slot.endTime}</strong></div>
              <div className="summary-total"><span>Jami to‘lov</span><strong>{formatPrice(field.price)}</strong></div>
            </div>
            <form className="booking-form" onSubmit={handleSubmit}>
              <label>Ismingiz<input ref={nameInput} required minLength={2} maxLength={80} value={customerName} onChange={(event) => setCustomerName(event.target.value)} placeholder="Ism va familiya" autoComplete="name" /></label>
              <label>Telefon raqam<input required type="tel" inputMode="tel" pattern="\+?[0-9 ]{9,20}" value={phone} onChange={(event) => setPhone(event.target.value)} placeholder="+998 90 123 45 67" autoComplete="tel" /></label>
              <fieldset className="payment-options"><legend>To‘lov turi</legend><label className={paymentType === "Naqd" ? "payment-option selected" : "payment-option"}><input type="radio" name="payment" checked={paymentType === "Naqd"} onChange={() => setPaymentType("Naqd")} /> Naqd</label><label className={paymentType === "Karta" ? "payment-option selected" : "payment-option"}><input type="radio" name="payment" checked={paymentType === "Karta"} onChange={() => setPaymentType("Karta")} /> Karta</label></fieldset>
              <div className="modal-actions"><button type="button" className="secondary-button" onClick={onClose}>Bekor qilish</button><button type="submit" className="primary-button">Bron qilish</button></div>
            </form>
          </>
        )}
      </section>
    </div>
  );
}