import { X } from "lucide-react";
import { useForm } from "react-hook-form";

import { createService } from "../../api/admin";

import type { Service } from "../../types";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onServiceCreated: (service: Service) => void;
};

type FormValues = {
  name: string;
  price: number;
};

const CreateServiceModal = ({ isOpen, onClose, onServiceCreated }: Props) => {
  const { register, handleSubmit, reset } = useForm<FormValues>();

  if (!isOpen) return null;

  const onSubmit = async (data: FormValues) => {
    try {
      const service = await createService(data.name, data.price);
      onServiceCreated(service);
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
          <h2 className="text-xl font-semibold text-heading">Crear Servicio</h2>

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

            {/* Precio */}
            <div>
              <label className="block mb-2 text-sm font-medium">Precio</label>

              <input
                type="number"
                {...register("price", {
                  required: true,
                  valueAsNumber: true,
                })}
                className="w-full rounded-base border border-default bg-neutral-primary p-3 outline-none focus:ring-2 focus:ring-neutral-tertiary"
              />
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
              Crear servicio
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateServiceModal;
