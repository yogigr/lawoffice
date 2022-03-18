import Authenticated from '@/Layouts/Authenticated';
import React from 'react';
import Form from './Form';

const Edit = (props) => {
  return (
    <Authenticated props={props} title="New User">
      <div className="bg-white overflow-x-visible shadow sm:rounded-lg divide-y divide-gray-200">
        <div className="px-4 py-5 sm:p-6">
          <Form props={props} title="Edit user form" desc="Isi kolom user dibawah ini" />
        </div>
      </div>
    </Authenticated>
  )
}

export default Edit;