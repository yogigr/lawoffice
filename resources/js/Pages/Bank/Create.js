import Authenticated from '@/Layouts/Authenticated';
import React from 'react';
import SettingTabs from '../Setting/SettingTabs';
import Form from './Form';

const Create = (props) => {
  return (
    <Authenticated props={props} title="New Bank">
      <SettingTabs />
      <div className="bg-white overflow-x-visible shadow sm:rounded-lg divide-y divide-gray-200 mt-3">
        <div className="px-4 py-5 sm:p-6">
          <Form
            props={props}
            title="New bank form"
            desc="Isi semua kolom untuk menyimpan data rekening bank"
          />
        </div>
      </div>
    </Authenticated>
  )
}

export default Create;