import type { Appointment } from "../../types";
import { Check, XCircle } from "lucide-react";

type Props = {
  appoinments: Appointment[];
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
};

const TableAppoinments = ({ appoinments, onEdit, onDelete }: Props) => {
  const statusStyles = {
    pending: "bg-yellow-100 text-yellow-800",

    completed: "bg-green-100 text-green-800",

    cancelled: "bg-red-100 text-red-800",
  };

  return (
    <div className="relative overflow-x-auto bg-neutral-primary-soft shadow-xs rounded-base border border-default mt-6">
      <table className="w-full text-sm text-left rtl:text-right text-body">
        <thead className="text-sm text-body bg-neutral-secondary-soft border-b border-default">
          <tr>
            <th scope="col" className="px-6 py-3 font-medium">
              Cliente
            </th>

            <th scope="col" className="px-6 py-3 font-medium">
              Barbero
            </th>

            <th scope="col" className="px-6 py-3 font-medium">
              Servicio
            </th>

            <th scope="col" className="px-6 py-3 font-medium">
              Fecha
            </th>

            <th scope="col" className="px-6 py-3 font-medium">
              Precio
            </th>

            <th scope="col" className="px-6 py-3 font-medium">
              Estado
            </th>

            <th scope="col" className="px-6 py-3 font-medium">
              Acciones
            </th>
          </tr>
        </thead>

        <tbody>
          {appoinments.map((appointment) => (
            <tr
              key={appointment.id}
              className="bg-neutral-primary border-b border-default hover:bg-neutral-secondary-soft/40 transition-colors"
            >
              {/* Nombre */}
              <td className="px-6 py-4 text-heading font-medium">
                {appointment.customerName} {appointment.customerLastName}
              </td>

              {/* Barbero */}
              <td className="px-6 py-4">
                {appointment.barber.name} {appointment.barber.lastName}
              </td>

              {/* Servicio */}
              <td className="px-6 py-4">{appointment.service.name}</td>

              {/* Fecha */}
              <td className="px-6 py-4">
                {new Date(appointment.date).toLocaleString()}
              </td>

              {/* Precio */}
              <td className="px-6 py-4">
                ${Number(appointment.service.price).toLocaleString("es-CO")}
              </td>

              <td className="px-6 py-4">
                <span
                  className={`px-3 py-1 rounded-full text-xs font-medium capitalize ${
                    statusStyles[appointment.status]
                  }`}
                >
                  {appointment.status}
                </span>
              </td>

              <td className="px-6 py-4">
                <div className="flex gap-3">
                  {/* Editar */}
                  <button
                    disabled={appointment.status !== "pending"}
                    onClick={() => onEdit(appointment.id)}
                    className={`flex items-center gap-2 px-3 py-2 rounded-base border border-default hover:bg-blue-100 transition-colors ${appointment.status !== "pending" ? "opacity-50 cursor-not-allowed" : ""}`}
                  >
                    <Check size={16} />

                    <span className="hidden md:block">Completar</span>
                  </button>

                  <button
                    disabled={appointment.status !== "pending"}
                    onClick={() => onDelete(appointment.id)}
                    className={`flex items-center gap-2 px-3 py-2 rounded-base border border-default hover:bg-blue-100 transition-colors ${appointment.status !== "pending" ? "opacity-50 cursor-not-allowed" : ""}`}
                  >
                    <XCircle size={16} />

                    <span className="hidden md:block">Cancelar</span>
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Empty state */}
      {appoinments.length === 0 && (
        <div className="p-8 text-center text-body">
          No hay citas registradas
        </div>
      )}
    </div>
  );
};

export default TableAppoinments;
