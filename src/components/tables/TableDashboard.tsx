import type { Appointment } from "../../types";

type Props = {
  appointments: Appointment[];
};

const TableDashboard = ({ appointments }: Props) => {
  const statusStyles = {
    pending: "bg-yellow-100 text-yellow-800",

    completed: "bg-green-100 text-green-800",

    cancelled: "bg-red-100 text-red-800",
  };

  const ultimate5Appointments = appointments
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 5);

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
              Estado
            </th>
          </tr>
        </thead>

        <tbody>
          {ultimate5Appointments.map((appointment) => (
            <tr
              key={appointment.id}
              className="bg-neutral-primary border-b border-default"
            >
              {/* Cliente */}
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

              {/* Estado */}
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
    </div>
  );
};

export default TableDashboard;
