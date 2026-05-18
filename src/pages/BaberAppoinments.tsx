import { useEffect, useState } from "react";
import TableBarberAppoinments from "../components/tables/TableBarberAppointments";
import type { Appointment } from "../types";
import { getBarberAppointments } from "../api/barber";
import { useAuthStore } from "../store/auth";

const BaberAppoinments = () => {
  const [appoinments, setAppoinments] = useState<Appointment[]>([]);
  const authStore = useAuthStore();

  useEffect(() => {
    const fetchAppoinments = async () => {
      try {
        const appoinments = await getBarberAppointments();
        setAppoinments(appoinments);
      } catch (error) {
        console.error(error);
      }
    };
    fetchAppoinments();
  }, []);
  return (
    <main className="container mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-3xl font-bold mb-2">Citas</h3>

          <p className="text-body">
            Gestiona todas las citas que tienes programadas.
          </p>
        </div>
        <nav>
          <button
            type="button"
            onClick={() => authStore.logout()}
            className="text-white bg-danger box-border border border-transparent hover:bg-danger-strong focus:ring-4 focus:ring-danger-medium shadow-xs font-medium leading-5 rounded-base text-sm px-4 py-2.5 focus:outline-none"
          >
            Cerras Sesion
          </button>
        </nav>
      </div>
      <TableBarberAppoinments appoinments={appoinments} />
    </main>
  );
};

export default BaberAppoinments;
