import React from 'react';
import ApplicationLogo from '@/Components/ApplicationLogo';
import { Head } from '@inertiajs/inertia-react';
import SuccessAlert from '@/Components/SuccessAlert';
import ValidationErrors from '@/Components/ValidationErrors';

export default function Guest({ title, desc, status, company, errors, children }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <Head title={title} />
      <div className="max-w-md w-full space-y-8">
        <div>
          <a href="/">
            <ApplicationLogo company={company} className="mx-auto h-12 w-auto" />
          </a>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">{title}</h2>
          {
            desc && (
              <p className="mt-2 text-center text-sm text-gray-600">
                {desc}
              </p>
            )
          }
        </div>
        {
          status && (
            <SuccessAlert message={status} />
          )
        }
        {
          errors && Object.keys(errors).length > 0 && (
            <ValidationErrors errors={errors} />
          )
        }
        {children}
      </div>
    </div>
  );
}
