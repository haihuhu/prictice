interface FormFieldProps {
  label: string;
  children: React.ReactNode;
  message?: string;
}

export const FormField = ({ label, children, message }: FormFieldProps) => {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex">
        <label className="w-24 shrink-0" htmlFor="name">
          {label}
        </label>
        {children}
      </div>
      {message && <p className=" text-red-500 text-sm text-center">{message}</p>}
    </div>
  );
};
