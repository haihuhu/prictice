interface FormFieldProps {
  label: string;
  message?: string;
  children: React.ReactNode;
}

const FormField = ({ label, message, children }: FormFieldProps) => {
  return (
    <>
      <div className="flex flex-col items-center justify-between w-full space-y-2">
        <div className="flex items-center w-full space-y-2">
          <p className="text-sm font-medium w-1/8">{label}:</p>
          {children}
        </div>
        <p className="text-sm text-red-500">{message}</p>
      </div>
    </>
  );
};

export default FormField;
