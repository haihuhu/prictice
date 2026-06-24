'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';
import { useState } from 'react';

interface FormValueType {
  username: string;
  email: string;
  gender: 'male' | 'female';
  age: number;
  description: string;
  subscribe: boolean;
}

interface ErrorType {
  username: string;
  email: string;
  age: string;
  description: string;
}

const FormPage = () => {
  const [formValue, setFormValue] = useState<FormValueType>({
    username: '',
    email: '',
    gender: 'female',
    age: 0,
    description: '',
    subscribe: false,
  });

  const [errors, setErrors] = useState<ErrorType>({
    username: '',
    email: '',
    age: '',
    description: '',
  });

  const validateForm = (field: string, value: any): string => {
    if (field === 'username') {
      if (value.length < 2 || value.length > 20) return 'username should between 2 and 20 characters';
      return '';
    }
    if (field === 'email') {
      if (!value.includes('@') || !value.includes('.')) return 'type in correct Email';
      return '';
    }
    if (field === 'age') {
      if (value < 18 || value > 100) return 'age must be between 18 and 100';
      return '';
    }
    if (field === 'description') {
      if (value.length < 10 || value.length > 100) return 'description must be between 10 and 100 characters';
      return '';
    }
    return '';
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newErrors = {
      username: validateForm('username', formValue.username),
      email: validateForm('email', formValue.email),
      age: validateForm('age', formValue.age),
      description: validateForm('description', formValue.description),
    };
    setErrors(newErrors);
    const hasError = Object.values(newErrors).some((item) => item !== '');
    if (hasError) return;
    console.log('form value:', formValue);
  };
  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col w-full max-w-4xl mx-auto gap-2">
          {/* UserName */}
          <div>
            <div className="flex">
              <h2 className="w-28">UserName:</h2>
              <Input
                className={cn('', errors.username ? 'border-red-500' : '')}
                value={formValue.username}
                onChange={(e) => {
                  setFormValue({ ...formValue, username: e.target.value });
                }}
                onBlur={() => {
                  const error = validateForm('username', formValue.username);
                  setErrors({ ...errors, username: error });
                }}
              />
            </div>
            <p className="ml-28 text-red-500">{errors.username}</p>
          </div>
          {/* email */}
          <div>
            <div className="flex">
              <h2 className="w-28">Email:</h2>
              <Input
                className={cn('', errors.email ? 'border-red-500' : '')}
                value={formValue.email}
                onChange={(e) => {
                  setFormValue({ ...formValue, email: e.target.value });
                }}
                onBlur={() => {
                  const error = validateForm('email', formValue.email);
                  setErrors({ ...errors, email: error });
                }}
              />
            </div>
            <p className="ml-28 text-red-500">{errors.email}</p>
          </div>
          {/* gender */}
          <div>
            <div className="flex">
              <h2 className="w-28">Gender:</h2>
              <select
                title="gender"
                className="border rounded-md border-slate-500"
                value={formValue.gender}
                onChange={(e) => {
                  setFormValue({ ...formValue, gender: e.target.value as 'male' | 'female' });
                }}
              >
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </div>
          </div>
          {/* age */}
          <div>
            <div className="flex">
              <h2 className="w-28">Age:</h2>
              <Input
                className={cn('', errors.age ? 'border-red-500' : '')}
                type="number"
                value={formValue.age}
                onChange={(e) => {
                  setFormValue({ ...formValue, age: Number(e.target.value) });
                }}
                onBlur={() => {
                  const error = validateForm('age', formValue.age);
                  setErrors({ ...errors, age: error });
                }}
              />
            </div>
            <p className="ml-28 text-red-500">{errors.age}</p>
          </div>
          {/* description */}
          <div>
            <div className="flex">
              <h2 className="w-28">Description:</h2>
              <Textarea
                className={cn(errors.description ? 'border border-red-500' : '')}
                value={formValue.description}
                onChange={(e) => {
                  setFormValue({ ...formValue, description: e.target.value });
                }}
                onBlur={() => {
                  const error = validateForm('description', formValue.description);
                  setErrors({ ...errors, description: error });
                }}
              />
            </div>
            <p className="ml-28 text-red-500">{errors.description}</p>
          </div>

          {/* subscribe */}
          <div>
            <div className="flex">
              <h2 className="w-28">Subscribe:</h2>
              <Input
                type="checkbox"
                checked={formValue.subscribe}
                onChange={(e) => {
                  setFormValue({ ...formValue, subscribe: e.target.checked });
                }}
              />
            </div>
          </div>
        </div>
        <Button className="w-full max-w-4xl mx-auto my-2" type="submit">
          Submit
        </Button>
      </form>
      <div className="flex flex-col md:flex-row w-full border  border-blue-300 rounded-md mt-2 mx-auto gap-2 p-2">
        <pre className="flex-1 overflow-x-auto border border-blue-200 rounded-md hover:border-blue-500 hover:shadow-md hover:transition-all">
          {JSON.stringify(formValue, null, 2)}
        </pre>
        <pre className="flex-1 overflow-x-auto border  border-blue-200 rounded-md hover:border-blue-500 hover:shadow-md hover:transition-all">
          {JSON.stringify(errors, null, 2)}
        </pre>
      </div>
    </>
  );
};
export default FormPage;
