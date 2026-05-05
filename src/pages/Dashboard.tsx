import { useEffect, useState } from "react";
import CardAppoinments from "../components/CardDashboard";
import { getAppointments, getBarbers, getServices } from "../api/admin";
import type { Appointment } from "../types";
import TableDashboard from "../components/tables/TableDashboard";

const Dashboard = () => {
  const [appointmentLength, setAppointmentLength] = useState(0);
  const [barberLength, setBarberLength] = useState(0);
  const [servicesLength, setServicesLength] = useState(0);
  const [appointments, setAppointments] = useState<Appointment[]>([]);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const appointments = await getAppointments();
        const barbers = await getBarbers();
        const services = await getServices();

        console.log("Appointments:", appointments);
        setBarberLength(barbers.length);
        setServicesLength(services.length);
        setAppointmentLength(appointments.length);
        setAppointments(appointments);
      } catch (error) {
        console.error("Error fetching appointments:", error);
      }
    };

    fetchAppointments();
  }, []);

  return (
    <main className="container mx-auto">
      <h3 className="text-3xl font-bold mb-4">Dashboard</h3>
      <p>Bienvenido al panel de administración de tu barbería.</p>

      <section className="pt-6 flex gap-8">
        <CardAppoinments
          length={appointmentLength}
          description="Administra tus citas, crea nuevas, edita o elimínalas según sea necesario para mantener tu agenda organizada y eficiente."
          title="Citas"
        />
        <CardAppoinments
          length={barberLength}
          description="Administra tus barberos, crea nuevos, edita o elimínalos según sea necesario para mantener tu equipo actualizado y eficiente."
          title="Barberos"
        />
        <CardAppoinments
          length={servicesLength}
          description="Administra tus servicios, crea nuevos, edita o elimínalos según sea necesario para mantener tu catálogo actualizado y eficiente."
          title="Servicios"
        />
      </section>

      <section className="pt-10">
        <h4 className="text-2xl font-semibold mb-2">Ultimas 5 Citas</h4>
        <p>Aquí puedes ver las próximas citas programadas para tu barbería.</p>

        <TableDashboard appointments={appointments} />
      </section>
    </main>
  );
};

export default Dashboard;
