import Authenticated from '@/Layouts/Authenticated';
import React from 'react';
import Form from './Form';

const Edit = (props) => {
  return (
    <Authenticated props={props} title="Edit service">
      <div className="bg-white overflow-x-visible shadow sm:rounded-lg divide-y divide-gray-200">
        <div className="px-4 py-5 sm:p-6">
          <Form props={props} title="Edit service form" desc="Isi kolom dibawah ini, untuk memperbarui service / layanan hukum" />
        </div>
      </div>
    </Authenticated>
  )
}

export default Edit;