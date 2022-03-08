import React from 'react';
import Button from '@/Components/Button';
import Guest from '@/Layouts/Guest';
import { Head, Link, useForm } from '@inertiajs/inertia-react';

export default function VerifyEmail({ status }) {
  const { post, processing } = useForm();

  const submit = (e) => {
    e.preventDefault();

    post(route('verification.send'));
  };

  return (
    <Guest title="Email verification" desc="Silahkan check inbox/spam email anda dan verifikasi" status={status}>
      <div className="mb-4 text-sm text-gray-600">
        Thanks for signing up! Before getting started, could you verify your email address by clicking on the
        link we just emailed to you? If you didn't receive the email, we will gladly send you another.
      </div>

      <form onSubmit={submit}>
        <div className="mt-4">
          <Button processing={processing}>Resend Verification Email</Button>
        </div>
        <div className='mt-4 text-center'>
          <Link
            href={route('logout')}
            method="post"
            as="button"
            className="underline text-sm text-indigo-600 hover:text-indigo-900"
          >
            Log Out
          </Link>
        </div>
      </form>
    </Guest>
  );
}
