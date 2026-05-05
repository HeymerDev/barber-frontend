import { useEffect, useState } from "react";

import { deleteService, getServices } from "../api/admin";

import type { Service } from "../types";

import TableServices from "../components/tables/TableServices";

import EditServiceModal from "../components/modals/EditServiceModal";

import CreateServiceModal from "../components/modals/CreateServiceModal";

const Services = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<Service | null>(null);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const services = await getServices();

        setServices(services);
      } catch (error) {
        console.error(error);
      }
    };
    fetchServices();
  }, []);

  const handleEdit = (service: Service) => {
    setSelectedService(service);
    setIsEditOpen(true);
  };

  const handleDelete = async (id: number) => {
    await deleteService(id);
    setServices((prev) => prev.filter((service) => service.id !== id));
  };

  const handleServiceUpdated = (updatedService: Service) => {
    setServices((prev) =>
      prev.map((service) =>
        service.id === updatedService.id ? updatedService : service,
      ),
    );
  };

  const handleServiceCreated = (newService: Service) => {
    setServices((prev) => [newService, ...prev]);
  };

  return (
    <main className="container mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-3xl font-bold mb-2">Servicios</h3>

          <p className="text-body">
            Gestiona todos los servicios que puedes ofrecer en tu barbería.
          </p>
        </div>

        {/* Botón crear */}
        <button
          onClick={() => setIsCreateOpen(true)}
          className="px-4 py-3 rounded-base bg-blue-600 text-white hover:bg-blue-700 transition-colors"
        >
          Crear servicio
        </button>
      </div>

      {/* Tabla */}
      <TableServices
        services={services}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      {/* Modal editar */}
      <EditServiceModal
        isOpen={isEditOpen}
        onClose={() => setIsEditOpen(false)}
        service={selectedService}
        onServiceUpdated={handleServiceUpdated}
      />

      {/* Modal crear */}
      <CreateServiceModal
        isOpen={isCreateOpen}
        onClose={() => setIsCreateOpen(false)}
        onServiceCreated={handleServiceCreated}
      />
    </main>
  );
};

export default Services;
