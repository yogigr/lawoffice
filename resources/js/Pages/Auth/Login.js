import React, { useEffect, useRef } from 'react';
import Button from '@/Components/Button';
import Checkbox from '@/Components/Checkbox';
import Guest from '@/Layouts/Guest';
import Input from '@/Components/Input';
import Label from '@/Components/Label';
import ValidationErrors from '@/Components/ValidationErrors';
import { Head, Link, useForm } from '@inertiajs/inertia-react';
import { LoginIcon } from '@heroicons/react/outline';

export default function Login({ status, canResetPassword, canRegister, company }) {
  const { data, setData, post, processing, errors, reset } = useForm({
    email: '',
    password: '',
    remember: '',
  });

  const emailref = useRef(null);

  useEffect(() => {
    emailref.current.focus();
    return () => {
      reset('password');
    };
  }, []);

  const onHandleChange = (event) => {
    setData(event.target.name, event.target.type === 'checkbox' ? event.target.checked : event.target.value);
  };

  const submit = (e) => {
    e.preventDefault();

    post(route('login'));
  };

  return (
    <Guest title="Login" desc="Silahkan login untuk memulai aplikasi" status={status} errors={errors} company={company}>
      <form className='mt-8 space-y-6' onSubmit={submit}>
        <div className="rounded-md shadow-sm -space-y-px">
          <div>
            <label htmlFor="email-address" className="sr-only">
              Email address
            </label>
            <input
              ref={emailref}
              id="email-address"
              name="email"
              value={data.email}
              type="email"
              autoComplete="email"
              required
              className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-primary-500 focus:border-primary-500 focus:z-10 sm:text-sm"
              placeholder="Email address"
              onChange={(e) => onHandleChange(e)}
            />
          </div>
          <div>
            <Label forInput="password" value="Password" className="sr-only" />
            <input
              id="password"
              name="password"
              type="password"
              value={data.password}
              autoComplete="current-password"
              className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-primary-500 focus:border-primary-500 focus:z-10 sm:text-sm"
              placeholder="Password"
              onChange={(e) => onHandleChange(e)}
            />
          </div>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Checkbox
              name="remember"
              value={data.remember}
              handleChange={onHandleChange}
            />
            <Label
              forInput="remember"
              className="ml-2 block text-sm text-gray-900"
              value="Ingat saya"
            />
          </div>
          <div className="text-sm">
            {canRegister && (
              <Link
                href={route("register")}
                className="font-medium text-primary-600 hover:text-primary-500"
              >
                Belum register?
              </Link>
            )}
          </div>
          <div className="text-sm">
            {canResetPassword && (
              <Link
                href={route("password.request")}
                className="font-medium text-primary-600 hover:text-primary-500"
              >
                Lupa password?
              </Link>
            )}
          </div>
        </div>
        <div>
          <Button processing={processing}>
            <span className="absolute left-0 inset-y-0 flex items-center pl-3">
              <LoginIcon
                className="h-5 w-5 text-primary-light group-hover:text-primary-light"
                aria-hidden="true"
              />
            </span>
            Login
          </Button>
        </div>
      </form>
    </Guest>
  );
}
