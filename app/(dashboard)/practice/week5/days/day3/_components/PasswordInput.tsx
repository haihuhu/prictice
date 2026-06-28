import { Input } from '@/components/ui/input';
import { Eye, EyeOff } from 'lucide-react';
import { useState } from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';

interface PasswordInputProps {
  label: string;
  // name: string;
  register: UseFormRegisterReturn;
  error?: string;
}

const PasswordInput = ({ label, register, error }: PasswordInputProps) => {
  const [show, setShow] = useState(false);
  return (
    <>
      <div className="flex gap-2">
        <h2>{label}:</h2>
        <div className="flex items-center w-full relative">
          <Input {...register} type={show ? 'text' : 'password'} />
          <div className="absolute right-2" onClick={() => setShow(!show)}>
            {show ? <EyeOff /> : <Eye />}
          </div>
        </div>
      </div>
      <p className="text-red-500 text-center">{error}</p>
    </>
  );
};
export default PasswordInput;
