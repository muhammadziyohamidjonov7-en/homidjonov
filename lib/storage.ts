import type { Booking } from "@/types";

const BOOKINGS_KEY = "minifutbol-bookings-v1";

export function readBookings(): Booking[] {
  if (typeof window === "undefined") return [];

  try {
    const stored = window.localStorage.getItem(BOOKINGS_KEY);
    if (!stored) return [];
    const parsed: unknown = JSON.parse(stored);
    return Array.isArray(parsed) ? (parsed as Booking[]) : [];
  } catch {
    return [];
  }
}

export function saveBooking(booking: Booking): Booking[] {
  const bookings = [...readBookings(), booking];
  window.localStorage.setItem(BOOKINGS_KEY, JSON.stringify(bookings));
  return bookings;
}