import { X } from "lucide-react";
import { useForm } from "react-hook-form";
import { createBarber } from "../../api/admin";
import type { Service } from "../../types";
import FormError from "../errors/FormError";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  services: Service[];
};

type FormValues = {
  name: string;
  lastName: string;
  email: string;
  password: string;
  serviceIds: number[];
};

const CreateBarberModal = ({ isOpen, onClose, services }: Props) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>();

  if (!isOpen) return null;

  const onSubmit = async (data: FormValues) => {
    try {
      await createBarber(
        data.name,
        data.lastName,
        data.email,
        data.password,
        data.serviceIds,
      );
      reset();
      onClose();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="w-full max-w-md rounded-base bg-neutral-primary border border-default shadow-lg">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-default p-4">
          <h2 className="text-xl font-semibold text-heading">Crear Barbero</h2>

          <button
            onClick={onClose}
            className="p-2 rounded-base hover:bg-neutral-secondary-soft"
          >
            <X size={18} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Body */}
          <div className="space-y-4 p-4">
            {/* Nombre */}
            <div>
              <label className="block mb-2 text-sm font-medium">Nombre</label>

              <input
                type="text"
                {...register("name", {
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
                {...register("lastName", {
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
                {...register("email", {
                  required: true,
                  pattern: {
                    value: /\S+@\S+\.\S+/,
                    message: "E-mail no válido",
                  },
                })}
                className="w-full rounded-base border border-default bg-neutral-primary p-3 outline-none focus:ring-2 focus:ring-neutral-tertiary"
              />
              {errors.email && <FormError>{errors.email.message}</FormError>}
            </div>

            {/* Contraseña */}
            <div>
              <label className="block mb-2 text-sm font-medium">
                Contraseña
              </label>

              <input
                type="password"
                {...register("password", {
                  required: true,
                  minLength: {
                    value: 6,
                    message: "La contraseña debe tener al menos 6 caracteres",
                  },
                })}
                className="w-full rounded-base border border-default bg-neutral-primary p-3 outline-none focus:ring-2 focus:ring-neutral-tertiary"
              />
              {errors.password && (
                <FormError>{errors.password.message}</FormError>
              )}
            </div>

            {/* Servicio */}
            <div>
              <label className="block mb-2 text-sm font-medium">
                Servicios
              </label>

              <select
                multiple
                {...register("serviceIds", {
                  required: true,
                  valueAsNumber: true,
                })}
                className="w-full rounded-base border border-default bg-neutral-primary p-3 outline-none focus:ring-2 focus:ring-neutral-tertiary"
              >
                <option value="">Seleccionar servicios</option>
                {services.map((service) => (
                  <option key={service.id} value={service.id}>
                    {service.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Footer */}
          <div className="flex justify-end gap-3 border-t border-default p-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-base border border-default hover:bg-neutral-secondary-soft"
            >
              Cancelar
            </button>

            <button
              type="submit"
              className="px-4 py-2 rounded-base bg-blue-600 text-white hover:bg-blue-700"
            >
              Crear barbero
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateBarberModal;
