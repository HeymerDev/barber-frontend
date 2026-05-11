import type { Barber } from "../../types";
import { Trash2 } from "lucide-react";

type Props = {
  barbers: Barber[];
  onDelete: (id: number) => void;
};

const TableBarbers = ({ barbers, onDelete }: Props) => {
  return (
    <div className="relative overflow-x-auto bg-neutral-primary-soft shadow-xs rounded-base border border-default mt-6">
      <table className="w-full text-sm text-left rtl:text-right text-body">
        <thead className="text-sm text-body bg-neutral-secondary-soft border-b border-default">
          <tr>
            <th scope="col" className="px-6 py-4 font-medium">
              Nombre
            </th>

            <th scope="col" className="px-6 py-4 font-medium">
              email
            </th>

            <th scope="col" className="px-6 py-4 font-medium text-center">
              Servicios
            </th>

            <th scope="col" className="px-6 py-4 font-medium text-center">
              Acciones
            </th>
          </tr>
        </thead>

        <tbody>
          {barbers.map((barber) => (
            <tr
              key={barber.id}
              className="bg-neutral-primary border-b border-default hover:bg-neutral-secondary-soft/40 transition-colors"
            >
              {/* Nombre */}
              <td className="px-6 py-4 font-medium text-heading whitespace-nowrap">
                {barber.name} {barber.lastName}
              </td>

              {/* email */}
              <td className="px-6 py-4">{barber.email}</td>

              {/* Servicios */}
              <td className="px-6 py-4 text-center">
                {barber.services.map((service) => (
                  <span
                    key={service.id}
                    className="inline-block px-2 py-1 rounded-full bg-blue-100 text-blue-800 text-xs font-medium mb-1"
                  >
                    {service.name}
                  </span>
                ))}
              </td>
              {/* Acciones */}
              <td className="px-6 py-4">
                <div className="flex items-center justify-center gap-3">
                  {/* Eliminar */}
                  <button
                    onClick={() => onDelete(barber.id)}
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
      {barbers.length === 0 && (
        <div className="p-8 text-center text-body">
          No hay barberos registrados
        </div>
      )}
    </div>
  );
};

export default TableBarbers;
