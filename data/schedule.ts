import type { Booking, Field, TimeSlot } from "@/types";

const defaultBusyHours = new Set(["09:00", "11:00", "14:00", "16:00", "18:00", "20:00"]);

export function getDailySlots(field: Field, date: string, bookings: Booking[]): TimeSlot[] {
  const openingHour = Number(field.openingTime.slice(0, 2));
  const closingHour = Number(field.closingTime.slice(0, 2));
  const fieldIndex = Math.max(0, field.id.length % 4);

  return Array.from({ length: closingHour - openingHour }, (_, index) => {
    const hour = openingHour + index;
    const startTime = `${String(hour).padStart(2, "0")}:00`;
    const endTime = `${String(hour + 1).padStart(2, "0")}:00`;
    const bookedByCustomer = bookings.some(
      (booking) => booking.fieldId === field.id && booking.date === date && booking.startTime === startTime,
    );
    const bookedInDemo = defaultBusyHours.has(startTime) && (index + fieldIndex) % 3 !== 1;

    return {
      id: `${field.id}-${date}-${startTime}`,
      startTime,
      endTime,
      status: bookedByCustomer || bookedInDemo ? "booked" : "available",
    };
  });
}