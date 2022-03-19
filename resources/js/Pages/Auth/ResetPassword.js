import React, { useEffect } from 'react';
import Button from '@/Components/Button';
import Guest from '@/Layouts/Guest';
import Input from '@/Components/Input';
import Label from '@/Components/Label';
import ValidationErrors from '@/Components/ValidationErrors';
import { Head, useForm } from '@inertiajs/inertia-react';
import { LockClosedIcon, LockOpenIcon, MailIcon } from '@heroicons/react/outline';

export default function ResetPassword({ token, email, company }) {
  const { data, setData, post, processing, errors, reset } = useForm({
    token: token,
    email: email,
    password: '',
    password_confirmation: '',
  });

  useEffect(() => {
    return () => {
      reset('password', 'password_confirmation');
    };
  }, []);

  const onHandleChange = (event) => {
    setData(event.target.name, event.target.value);
  };

  const submit = (e) => {
    e.preventDefault();

    post(route('password.update'));
  };

  return (
    <Guest title="Reset Password" desc="Silahkan isi Password baru dan Konsirmasi password baru untuk me-reset password" errors={errors} company={company}>
      <form onSubmit={submit}>
        <div>
          <Label forInput="email" value="Email" className="sr-only" />
          <div className="mt-1 relative rounded-md shadow-sm">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <MailIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
            </div>
            <Input
              type="email"
              name="email"
              value={data.email}
              className="pl-10"
              autoComplete="username"
              placeholder="Alamat email"
              handleChange={onHandleChange}
            />
          </div>
        </div>

        <div>
          <Label forInput="password" value="Password" className="sr-only" />
          <div className="mt-1 relative rounded-md shadow-sm">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <LockClosedIcon
                className="h-5 w-5 text-gray-400"
                aria-hidden="true"
              />
            </div>
            <Input
              type="password"
              name="password"
              value={data.password}
              className="pl-10"
              autoComplete="new-password"
              placeholder="Password baru"
              handleChange={onHandleChange}
              isFocused={true}
            />
          </div>
        </div>

        <div>
          <Label
            forInput="password_confirmation"
            value="Confirm Password"
            className="sr-only"
          />
          <div className="mt-1 relative rounded-md shadow-sm">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <LockClosedIcon
                className="h-5 w-5 text-gray-400"
                aria-hidden="true"
              />
            </div>
            <Input
              type="password"
              name="password_confirmation"
              value={data.password_confirmation}
              className="pl-10"
              autoComplete="new-password"
              placeholder="Konfirmasi password baru"
              handleChange={onHandleChange}
            />
          </div>
        </div>

        <div className="mt-4">
          <Button processing={processing}>
            <span className="absolute left-0 inset-y-0 flex items-center pl-3">
              <LockOpenIcon
                className="h-5 w-5 text-primary-light group-hover:text-primary-light"
                aria-hidden="true"
              />
            </span>
            Reset Password
          </Button>
        </div>
      </form>
    </Guest>
  );
}
