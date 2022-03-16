import React, { useEffect } from 'react';
import Button from '@/Components/Button';
import Guest from '@/Layouts/Guest';
import Input from '@/Components/Input';
import Label from '@/Components/Label';
import ValidationErrors from '@/Components/ValidationErrors';
import { Head, Link, useForm } from '@inertiajs/inertia-react';

export default function Register() {
  const { data, setData, post, processing, errors, reset } = useForm({
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
  });

  useEffect(() => {
    return () => {
      reset('password', 'password_confirmation');
    };
  }, []);

  const onHandleChange = (event) => {
    setData(event.target.name, event.target.type === 'checkbox' ? event.target.checked : event.target.value);
  };

  const submit = (e) => {
    e.preventDefault();

    post(route('register'));
  };

  return (
    <Guest title="Register" desc="Silahkan isi kolom dibawah untuk mendaftar" errors={errors}>

      <form onSubmit={submit}>
        <div>
          <Label forInput="name" value="Name" />

          <Input
            type="text"
            name="name"
            value={data.name}
            className="mt-1 block w-full"
            autoComplete="name"
            isFocused={true}
            handleChange={onHandleChange}
            placeholder='Name'
            required
          />
        </div>

        <div className="mt-4">
          <Label forInput="email" value="Email" />

          <Input
            type="email"
            name="email"
            value={data.email}
            className="mt-1 block w-full"
            autoComplete="username"
            handleChange={onHandleChange}
            placeholder='Email'
            required
          />
        </div>

        <div className="mt-4">
          <Label forInput="password" value="Password" />

          <Input
            type="password"
            name="password"
            value={data.password}
            className="mt-1 block w-full"
            autoComplete="new-password"
            handleChange={onHandleChange}
            placeholder='Password'
            required
          />
        </div>

        <div className="mt-4">
          <Label forInput="password_confirmation" value="Confirm Password" />

          <Input
            type="password"
            name="password_confirmation"
            value={data.password_confirmation}
            className="mt-1 block w-full"
            handleChange={onHandleChange}
            placeholder='Confirm Password'
            required
          />
        </div>

        <div className='mt-4'>
          <Link href={route('login')} className="underline text-sm text-indigo-600 hover:text-indigo-900">
            Sudah pernah register?
          </Link>
        </div>
        <div className='mt-4'>
          <Button processing={processing}>
            Register
          </Button>
        </div>
      </form>
    </Guest>
  );
}
