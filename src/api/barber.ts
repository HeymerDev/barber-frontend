import api from "../config/axios";

export const getBarberAppointments = async () => {
  const { data } = await api.get("/barber/appointments");
  return data;
};
