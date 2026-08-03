interface FormFieldProps {
  label: string;
  message?: string;
  children: React.ReactNode;
}

export const FormField = ({ label, children, message }: FormFieldProps) => {
  return (
    <>
      <div>
        <div className="flex  my-2 gap-2">
          <h2 className="text-xl w-24 shrink-0">{label}:</h2>
          {children}
        </div>
        {message && <p className="text-sm text-center text-red-500">{message}</p>}
      </div>
    </>
  );
};
