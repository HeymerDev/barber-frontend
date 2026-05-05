import type { Service } from "../../types";
import { Pencil, Trash2 } from "lucide-react";

type Props = {
  services: Service[];

  onEdit: (service: Service) => void;

  onDelete: (id: number) => void;
};

const TableServices = ({ services, onEdit, onDelete }: Props) => {
  return (
    <div className="relative overflow-x-auto bg-neutral-primary-soft shadow-xs rounded-base border border-default mt-6">
      <table className="w-full text-sm text-left rtl:text-right text-body">
        <thead className="text-sm text-body bg-neutral-secondary-soft border-b border-default">
          <tr>
            <th scope="col" className="px-6 py-4 font-medium">
              Servicio
            </th>

            <th scope="col" className="px-6 py-4 font-medium">
              Precio
            </th>

            <th scope="col" className="px-6 py-4 font-medium text-center">
              Acciones
            </th>
          </tr>
        </thead>

        <tbody>
          {services.map((service) => (
            <tr
              key={service.id}
              className="bg-neutral-primary border-b border-default hover:bg-neutral-secondary-soft/40 transition-colors"
            >
              {/* Nombre */}
              <td className="px-6 py-4 font-medium text-heading whitespace-nowrap">
                {service.name}
              </td>

              {/* Precio */}
              <td className="px-6 py-4">
                ${Number(service.price).toLocaleString("es-CO")}
              </td>

              {/* Acciones */}
              <td className="px-6 py-4">
                <div className="flex items-center justify-center gap-3">
                  {/* Editar */}
                  <button
                    onClick={() => onEdit(service)}
                    className="flex items-center gap-2 px-3 py-2 rounded-base border border-default hover:bg-blue-100 transition-colors"
                  >
                    <Pencil size={16} />

                    <span className="hidden md:block">Editar</span>
                  </button>

                  {/* Eliminar */}
                  <button
                    onClick={() => onDelete(service.id)}
                    className="flex items-center gap-2 px-3 py-2 rounded-base border border-default hover:bg-red-100 transition-colors"
                  >
                    <Trash2 size={16} />

                    <span className="hidden md:block">Eliminar</span>
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Empty state */}
      {services.length === 0 && (
        <div className="p-8 text-center text-body">
          No hay servicios registrados
        </div>
      )}
    </div>
  );
};

export default TableServices;
