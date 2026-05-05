import api from "../config/axios";

export const getAppointments = async () => {
  const { data } = await api.get("/admin/appointments");
  return data;
};

export const getBarbers = async () => {
  const { data } = await api.get("/admin/barbers");
  return data;
};

export const getServices = async () => {
  const { data } = await api.get("/admin/services");
  return data;
};
