import type { Appointment } from "../../types";

type Props = {
  appoinments: Appointment[];
};

const TableBarberAppoinments = ({ appoinments }: Props) => {
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

export default TableBarberAppoinments;
