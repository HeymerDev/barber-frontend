import { useEffect, useState } from "react";

import { deleteBarber, getBarbers, getServices } from "../api/admin";
import type { Barber, Service } from "../types";
import TableBarbers from "../components/tables/TableBarbers";
import CreateBarberModal from "../components/modals/CreateBarberModal";

const Barbers = () => {
  const [barbers, setBarbers] = useState<Barber[]>([]);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [services, setServices] = useState<Service[]>([]);

  useEffect(() => {
    const fetchBarbers = async () => {
      try {
        const barbers = await getBarbers();

        setBarbers(barbers);
      } catch (error) {
        console.error(error);
      }
    };
    fetchBarbers();

    const fetchServices = async () => {
      try {
        const services = await getServices();
        setServices(services);
      } catch (error) {
        console.error(error);
      }
    };
    fetchServices();
  }, [barbers]);

  const handleDelete = async (id: number) => {
    await deleteBarber(id);
  };

  return (
    <main className="container mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-3xl font-bold mb-2">Barberos</h3>

          <p className="text-body">
            Gestiona todos los barberos que puedes ofrecer en tu barbería.
          </p>
        </div>

        {/* Botón crear */}
        <button
          onClick={() => setIsCreateOpen(true)}
          className="px-4 py-3 rounded-base bg-blue-600 text-white hover:bg-blue-700 transition-colors"
        >
          Crear barbero
        </button>
      </div>

      {/* Tabla */}
      <TableBarbers barbers={barbers} onDelete={handleDelete} />

      {/* Modal crear */}
      <CreateBarberModal
        isOpen={isCreateOpen}
        onClose={() => setIsCreateOpen(false)}
        services={services} // Pasa los servicios aquí si los tienes
      />
    </main>
  );
};

export default Barbers;
