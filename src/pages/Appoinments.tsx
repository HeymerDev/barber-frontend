import { useEffect, useState } from "react";
import TableAppoinments from "../components/tables/TableAppoinments";
import type { Appointment } from "../types";
import {
  updateAppointmentStatus,
  getAppointments,
  getServices,
  getBarbers,
} from "../api/admin";
import CreateAppoinmentModal from "../components/modals/CreateAppoinmentModal";

export const Appoinments = () => {
  const [appoinments, setAppoinments] = useState<Appointment[]>([]);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [services, setServices] = useState([]);
  const [barbers, setBarbers] = useState([]);

  const fetchAppoinments = async () => {
    try {
      const appoinments = await getAppointments();

      setAppoinments(appoinments);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchServices = async () => {
    try {
      const services = await getServices();
      setServices(services);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchBarbers = async () => {
    try {
      const barbers = await getBarbers();
      setBarbers(barbers);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const init = async () => {
      await fetchServices();
      await fetchBarbers();
      await fetchAppoinments();
    };
    init();
  }, [appoinments]);

  const handleEdit = (id: number) => {
    updateAppointmentStatus(id, "completed");
  };

  const handleDelete = async (id: number) => {
    await updateAppointmentStatus(id, "cancelled");
  };

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

        {/* Botón crear */}
        <button
          onClick={() => setIsCreateOpen(true)}
          className="px-4 py-3 rounded-base bg-blue-600 text-white hover:bg-blue-700 transition-colors"
        >
          Crear cita
        </button>
      </div>

      {/* Tabla */}
      <TableAppoinments
        appoinments={appoinments}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      {/* Modal crear */}
      <CreateAppoinmentModal
        isOpen={isCreateOpen}
        onClose={() => setIsCreateOpen(false)}
        barbers={barbers}
        services={services}
      />
    </main>
  );
};
