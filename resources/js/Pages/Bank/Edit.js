import Authenticated from '@/Layouts/Authenticated';
import React from 'react';
import SettingTabs from '../Setting/SettingTabs';
import Form from './Form';

const Edit = (props) => {
  return (
    <Authenticated props={props} title="Edit bank">
      <SettingTabs />
      <div className="bg-white overflow-x-visible shadow sm:rounded-lg divide-y divide-gray-200 mt-3">
        <div className="px-4 py-5 sm:p-6">
          <Form props={props} title="Edit bank form" desc="Isi kolom dibawah ini, untuk memperbarui data rekening bank" />
        </div>
      </div>
    </Authenticated>
  )
}

export default Edit;