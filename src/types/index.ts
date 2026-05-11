export interface LoginFormData {
  email: string;
  password: string;
}

export type UserRole = "admin" | "barber";

export type AppointmentStatus = "pending" | "completed" | "cancelled";

export interface Barber {
  id: number;
  name: string;
  lastName: string;
  email: string;
  password: string;
  role: UserRole;
  createdAt: string;
  updatedAt: string;
  services: Service[];
  active: boolean;
}

export interface Service {
  id: number;
  name: string;
  price: string;
  createdAt: string;
  updatedAt: string;
}

export interface Appointment {
  id: number;
  customerName: string;
  customerLastName: string;
  customerPhone: string;
  customerEmail: string;
  date: string;
  status: AppointmentStatus;
  barberId: number;
  serviceId: number;
  createdAt: string;
  updatedAt: string;
  barber: Barber;
  service: Service;
}
