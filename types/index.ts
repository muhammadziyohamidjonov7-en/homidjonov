export type PaymentType = "Naqd" | "Karta";
export type ViewName = "fields" | "schedule";
export type FieldBadge = "Ommabop" | "Yangi";

export interface Field {
  id: string;
  name: string;
  district: string;
  address: string;
  price: number;
  rating: number;
  image: string;
  openingTime: string;
  closingTime: string;
  surface: string;
  indoor: boolean;
  badge: FieldBadge;
}

export interface TimeSlot {
  id: string;
  startTime: string;
  endTime: string;
  status: "available" | "booked";
}

export interface Booking {
  id: string;
  fieldId: string;
  date: string;
  startTime: string;
  endTime: string;
  customerName: string;
  phone: string;
  paymentType: PaymentType;
}