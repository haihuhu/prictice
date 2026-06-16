'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';
import { useState } from 'react';

interface FormValueType {
  username: string;
  age: number;
  gender: 'male' | 'female';
  email: string;
  description: string;
  subscribe: boolean;
}

interface ErrorType {
  username: string;
  age: string;
  gender: string;
  email: string;
  description: string;
}

const FormPage = () => {
  const [formValue, setFormValue] = useState<FormValueType>({
    username: '',
    age: 0,
    gender: 'male',
    email: '',
    description: '',
    subscribe: false,
  });

  const [errors, setErrors] = useState<ErrorType>({
    username: '',
    age: '',
    gender: '',
    email: '',
    description: '',
  });

  const validateForm = (formField: string, value: any): string => {
    if (formField === 'username') {
      if (value === '') return 'username is required';
      if (value.length < 2 || value.length > 20) return 'username must be between 2 and 20';
      return '';
    }
    if (formField === 'age') {
      if (value < 18 || value > 100) return 'age must be between 18 and 100';
      return '';
    }
    if (formField === 'gender') {
      if (value !== 'male' && value !== 'female') return 'gender must be male or female';
      return '';
    }
    if (formField === 'email') {
      if (!value.includes('@')) return 'email is not valid';
      return '';
    }
    if (formField === 'description') {
      if (value.length < 10 || value.length > 100) return 'description must be between 10 and 100';
      return '';
    }
    return '';
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newErrors = {
      username: validateForm('username', formValue.username),
      age: validateForm('age', formValue.age),
      gender: validateForm('gender', formValue.gender),
      email: validateForm('email', formValue.email),
      description: validateForm('description', formValue.description),
    };

    setErrors(newErrors);

    const hasError = Object.values(newErrors).some((e) => e !== '');

    if (hasError) return;

    console.log('formValue:', formValue);
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="w-full">
          <div className="flex-col justify-between items-center w-full md:max-w-4xl mx-auto px-2 my-2">
            <div className="flex">
              <h2 className="w-24 text-lg font-bold">Username:</h2>
              <Input
                className={cn(errors.username && 'border-red-500')}
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
            <p className="ml-24 text-red-500 text-sm">{errors.username}</p>
          </div>
          <div className="flex-col justify-between items-center w-full md:max-w-4xl mx-auto px-2 my-2">
            <div className="flex ">
              <h2 className="w-24 text-lg font-bold">Age:</h2>
              <Input
                type="number"
                className={cn(errors.age && 'border-red-500')}
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
            <p className="ml-24 text-red-500 text-sm">{errors.age}</p>{' '}
          </div>
          <div className="flex-col justify-between items-center w-full md:max-w-4xl mx-auto px-2 my-2">
            <div className="flex ">
              <h2 className="w-24 text-lg font-bold">Gender:</h2>
              <select
                title="gender"
                className="rounded-lg border "
                value={formValue.gender}
                onChange={(e) => {
                  setFormValue({ ...formValue, gender: e.target.value as 'male' | 'female' });
                }}
                onBlur={() => {
                  const error = validateForm('gender', formValue.gender);
                  setErrors({ ...errors, gender: error });
                }}
              >
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </div>
            <p className="ml-24 text-red-500 text-sm">{errors.gender}</p>{' '}
          </div>
          {/* Email */}
          <div className="flex-col justify-between items-center w-full md:max-w-4xl mx-auto px-2 my-2">
            <div className="flex ">
              <h2 className="w-24 text-lg font-bold">Email:</h2>
              <Input
                className={cn(errors.email && 'border-red-500')}
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

            <p className="ml-24 text-red-500 text-sm">{errors.email}</p>
          </div>

          <div className="flex-col justify-between items-center w-full md:max-w-4xl mx-auto px-2 my-2">
            <div className="flex ">
              <h2 className="w-24 text-lg font-bold">Description:</h2>
              <Textarea
                className={cn(errors.description && 'border-red-500')}
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
            <p className="ml-24 text-red-500 text-sm">{errors.description}</p>{' '}
          </div>

          <div className="flex-col justify-between items-center w-full md:max-w-4xl mx-auto px-2 my-2">
            <div className="flex">
              <h2 className="w-24 text-lg font-bold">Subscribe:</h2>
              <Input
                type="checkbox"
                checked={formValue.subscribe}
                onChange={(e) => {
                  setFormValue({ ...formValue, subscribe: e.target.checked });
                }}
              />
            </div>
          </div>
          <Button type="submit" className="flex w-full max-w-3xl mx-auto my-2 px-2">
            Submit
          </Button>
          <div className="flex flex-col md:flex-row justify-between items-center w-full md:max-w-4xl gap-2 mx-auto px-2">
            <div className="w-full flex-1 border-4 rounded-md break-all">
              <pre className="whitespace-pre-wrap">{JSON.stringify(formValue, null, 2)}</pre>
            </div>
            <div className="w-full flex-1 border-4 rounded-md">
              <pre className="whitespace-pre-wrap">{JSON.stringify(errors, null, 2)}</pre>
            </div>
          </div>
        </div>
      </form>
    </>
  );
};

export default FormPage;
