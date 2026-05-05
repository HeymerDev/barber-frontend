const FormError = ({ children }: { children: React.ReactNode }) => {
  return (
    <div
      className="p-4 mb-4 text-sm text-white rounded-base bg-red-400"
      role="alert"
    >
      <span className="font-medium text-white">{children}</span>
    </div>
  );
};

export default FormError;
