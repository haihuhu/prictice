interface FormFieldProps {
  label: string;
  message?: string;
  children: React.ReactNode;
}

const FormField = ({ label, message, children }: FormFieldProps) => {
  return (
    <div>
      <div className="flex items-center  gap-2">
        <h3 className="text-sm font-medium w-24 shrink-0">{label}:</h3>
        {children}
      </div>
      {message && <p className="text-center text-sm  text-red-500 mt-1">{message}</p>}
    </div>
  );
};

export default FormField;
