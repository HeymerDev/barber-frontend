import { useForm } from "react-hook-form";
import { createAppointment, getBarbers, getServices } from "../api/admin";
import { useEffect, useState } from "react";
import type { Barber, Service } from "../types";
import { AlertBook } from "../components/AlertBook";

type FormValues = {
  customerName: string;
  customerLastName: string;
  customerPhone: string;
  customerEmail: string;
  serviceId: number;
  barberId: number;
  date: string;
};

const Book = () => {
  const { register, handleSubmit, reset } = useForm<FormValues>();

  const [services, setServices] = useState<Service[]>([]);
  const [barbers, setBarbers] = useState<Barber[]>([]);
  const [successMessage, setSuccessMessage] = useState("");

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
    };
    init();
  }, []);

  const onSubmit = async (data: FormValues) => {
    try {
      const response = await createAppointment(
        data.customerName,
        data.customerLastName,
        data.customerPhone,
        data.customerEmail,
        data.serviceId,
        data.barberId,
        data.date,
      );
      reset();
      setSuccessMessage(response);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="w-full max-w-md rounded-base bg-neutral-primary border border-default shadow-lg">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-default p-4">
          <h2 className="text-xl font-semibold text-heading">Crear Cita</h2>
        </div>

        {successMessage && <AlertBook description={successMessage} />}

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Body */}
          <div className="space-y-4 p-4">
            {/* Nombre */}
            <div>
              <label className="block mb-2 text-sm font-medium">Nombre</label>

              <input
                type="text"
                {...register("customerName", {
                  required: true,
                })}
                className="w-full rounded-base border border-default bg-neutral-primary p-3 outline-none focus:ring-2 focus:ring-neutral-tertiary"
              />
            </div>

            {/* Apellido */}
            <div>
              <label className="block mb-2 text-sm font-medium">Apellido</label>

              <input
                type="text"
                {...register("customerLastName", {
                  required: true,
                })}
                className="w-full rounded-base border border-default bg-neutral-primary p-3 outline-none focus:ring-2 focus:ring-neutral-tertiary"
              />
            </div>

            {/* Teléfono */}
            <div>
              <label className="block mb-2 text-sm font-medium">Teléfono</label>

              <input
                type="text"
                {...register("customerPhone", {
                  required: true,
                })}
                className="w-full rounded-base border border-default bg-neutral-primary p-3 outline-none focus:ring-2 focus:ring-neutral-tertiary"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block mb-2 text-sm font-medium">Email</label>

              <input
                type="email"
                {...register("customerEmail", {
                  required: true,
                })}
                className="w-full rounded-base border border-default bg-neutral-primary p-3 outline-none focus:ring-2 focus:ring-neutral-tertiary"
              />
            </div>

            {/* Servicio */}
            <div>
              <label className="block mb-2 text-sm font-medium">Servicio</label>

              <select
                {...register("serviceId", {
                  required: true,
                  valueAsNumber: true,
                })}
                className="w-full rounded-base border border-default bg-neutral-primary p-3 outline-none focus:ring-2 focus:ring-neutral-tertiary"
              >
                <option value="">Seleccionar servicio</option>
                {services.map((service) => (
                  <option key={service.id} value={service.id}>
                    {service.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Barbero */}
            <div>
              <label className="block mb-2 text-sm font-medium">Barbero</label>

              <select
                {...register("barberId", {
                  required: true,
                  valueAsNumber: true,
                })}
                className="w-full rounded-base border border-default bg-neutral-primary p-3 outline-none focus:ring-2 focus:ring-neutral-tertiary"
              >
                <option value="">Seleccionar barbero</option>
                {barbers.map((barber) => (
                  <option key={barber.id} value={barber.id}>
                    {barber.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Fecha */}
            <div>
              <label className="block mb-2 text-sm font-medium">Fecha</label>

              <input
                type="datetime-local"
                {...register("date", {
                  required: true,
                })}
                className="w-full rounded-base border border-default bg-neutral-primary p-3 outline-none focus:ring-2 focus:ring-neutral-tertiary"
              />
            </div>
          </div>

          {/* Footer */}
          <div className="flex justify-end gap-3 border-t border-default p-4">
            <button
              type="submit"
              className="px-4 py-2 rounded-base bg-blue-600 text-white hover:bg-blue-700"
            >
              Crear cita
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Book;
