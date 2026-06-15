'use client';

import { Input } from '@/components/ui/input';
import React, { useState } from 'react';

interface FormType {
  username: string;
  age: number;
  gender: 'male' | 'female';
  email: string;
  message: string;
  subscribe: boolean;
}

interface FormErrorType {
  username: string;
  age: string;
  gender: string;
  email: string;
  message: string;
  subscribe: string;
}

const FormPage = () => {
  const [formValue, setFormValue] = useState<FormType>({
    username: '',
    age: 0,
    gender: 'male',
    email: '',
    message: '',
    subscribe: false,
  });

  const [formErrors, setFormErrors] = useState<FormErrorType>({
    username: '',
    age: '',
    gender: '',
    email: '',
    message: '',
    subscribe: '',
  });

  const validateField = (fieldName: string, value: any): string => {
    if (fieldName === 'username') {
      if (!value) return 'username is required';
      if (value.length < 2 || value.length > 20)
        return 'username must be between 2 and 20 characters';
      return '';
    }
    if (fieldName === 'age') {
      if (value < 18) return 'age must be greater than 18';
      if (value > 100) return 'age must be less than 100';
      return '';
    }
    if (fieldName === 'email') {
      if (!value) return 'email is required';
      if (!value.includes('@')) return 'type correct email';
      if (!value.includes('.')) return 'type correct email';
      return '';
    }
    if (fieldName === 'message') {
      if (value.length < 10 || value.length > 500)
        return 'message must be between 10 and 500 characters';
      return '';
    }
    return '';
  };

  return (
    <>
      <div className="flex flex-col w-full  md:mx-50 gap-5 px-2">
        <div className=" gap-2">
          <div className="flex gap-2">
            <h1>UserName:</h1>
            <Input
              value={formValue.username}
              onChange={(e) => {
                setFormValue({ ...formValue, username: e.target.value });
              }}
              onBlur={() => {
                const error = validateField('username', formValue.username);
                setFormErrors({ ...formErrors, username: error });
              }}
            />
          </div>
          {formErrors.username && <p className="ml-30 text-red-500">{formErrors.username}</p>}
        </div>
        <div className="gap-2">
          <div className="flex gap-2">
            <h1>Age:</h1>
            <Input
              value={formValue.age}
              onChange={(e) => {
                setFormValue({ ...formValue, age: Number(e.target.value) });
              }}
              onBlur={() => {
                const error = validateField('age', formValue.age);
                setFormErrors({ ...formErrors, age: error });
              }}
            />
          </div>
          {formErrors.age && <p className="ml-30 text-red-500">{formErrors.age}</p>}
        </div>
        <div className="flex gap-2">
          <h1>Gender:</h1>
          <select
            title="Gender"
            className="border rounded-md"
            name="gender"
            value={formValue.gender}
            onChange={(e) => {
              setFormValue({ ...formValue, gender: e.target.value as 'male' | 'female' });
            }}
          >
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </div>
        <div className="flex gap-2">
          <h1>Email:</h1>
          <Input
            value={formValue.email}
            onChange={(e) => {
              setFormValue({ ...formValue, email: e.target.value });
            }}
          />
        </div>
        <div className="flex gap-2">
          <h1>Message:</h1>
          <Input
            value={formValue.message}
            onChange={(e) => {
              setFormValue({ ...formValue, message: e.target.value });
            }}
          />
        </div>
        <div className="flex gap-2">
          <h1>Subscribe:</h1>
          <Input
            type="checkbox"
            checked={formValue.subscribe}
            onChange={(e) => {
              setFormValue({ ...formValue, subscribe: e.target.checked });
            }}
          />
        </div>
      </div>
      <div className="flex justify-center items-center flex-col md:flex-row w-full md:max-w-4xl md:mx-auto gap-2 px-2 mt-2">
        <div className="w-full md:flex-1 border-4 rounded-lg">
          <h2 className="text-center text-lg font-bold">Form Value</h2>
          <pre>{JSON.stringify(formValue, null, 2)}</pre>
        </div>
        <div className="w-full md:flex-1 border-4 rounded-lg">
          <h2 className="text-center text-lg font-bold">Form Errors</h2>
          <pre>{JSON.stringify(formErrors, null, 2)}</pre>
        </div>
      </div>
    </>
  );
};

export default FormPage;
