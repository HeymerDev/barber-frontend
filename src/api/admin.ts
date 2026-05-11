import { toast } from "sonner";
import api from "../config/axios";

export const getAppointments = async () => {
  const { data } = await api.get("/admin/appointments");
  return data;
};

export const createAppointment = async (
  customerName: string,
  customerLastName: string,
  customerPhone: string,
  customerEmail: string,
  serviceId: number,
  barberId: number,
  date: string,
) => {
  const {
    data: { message, appointment },
  } = await api.post("/appointments/book", {
    customerName,
    customerLastName,
    customerPhone,
    customerEmail,
    serviceId,
    barberId,
    date,
  });
  toast.success(message);
  return appointment;
};

export const updateAppointmentStatus = async (id: number, status: string) => {
  const {
    data: { message },
  } = await api.patch(`/admin/appointments/${id}`, { status });
  toast.success(message);
};

export const getBarbers = async () => {
  const { data } = await api.get("/admin/barbers");
  return data;
};

export const getServices = async () => {
  const { data } = await api.get("/admin/services");
  return data;
};

export const createService = async (name: string, price: number) => {
  const {
    data: { message, service },
  } = await api.post("/admin/services", { name, price });
  toast.success(message);
  return service;
};

export const updateService = async (
  id: number,
  name: string,
  price: number,
) => {
  const {
    data: { message },
  } = await api.patch(`/admin/services/${id}`, { name, price });
  toast.success(message);
};

export const deleteService = async (id: number) => {
  const {
    data: { message },
  } = await api.delete(`/admin/services/${id}`);
  toast.success(message);
};
