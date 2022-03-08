import React, { useEffect, useRef } from 'react';
import Button from '@/Components/Button';
import Guest from '@/Layouts/Guest';
import Input from '@/Components/Input';
import ValidationErrors from '@/Components/ValidationErrors';
import { Head, useForm } from '@inertiajs/inertia-react';
import { LockClosedIcon, MailIcon } from '@heroicons/react/outline';
import Label from '@/Components/Label';

export default function ForgotPassword({ status }) {
  const { data, setData, post, processing, errors } = useForm({
    email: '',
  });
  
  const onHandleChange = (event) => {
    setData(event.target.name, event.target.value);
  };

  const submit = (e) => {
    e.preventDefault();

    post(route('password.email'));
  };

  return (
    <Guest title="Forgot Password" desc="Silahkan isi email terdaftar anda" status={status} errors={errors}>
      <form className="mt-8 space-y-6" onSubmit={submit}>
        <div>
          <Label forInput="email" value="Email" className="sr-only" />
          <div className="mt-1 relative rounded-md shadow-sm">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <MailIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
            </div>
            <Input
              name="email"
              value={data.email}
              className="pl-10"
              placeholder="you@example.com"
              handleChange={onHandleChange}
              autoFocus={true}
            />
          </div>
        </div>

        <div>
          <Button processing={processing}>
            <span className="absolute left-0 inset-y-0 flex items-center pl-3">
              <LockClosedIcon
                className="h-5 w-5 text-primary-light group-hover:text-primary-light"
                aria-hidden="true"
              />
            </span>
            Email Password Reset Link
          </Button>
        </div>
      </form>
    </Guest>
  );
}
