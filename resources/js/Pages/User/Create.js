import Authenticated from '@/Layouts/Authenticated';
import React from 'react';
import Form from './Form';

const Create = (props) => {
  return (
    <Authenticated props={props} title="New User">
      <div className="bg-white overflow-x-visible shadow sm:rounded-lg divide-y divide-gray-200">
        <div className="px-4 py-5 sm:p-6">
          <Form 
            props={props} 
            title="New user form" 
            desc="Input user disini akan otomatis terverifikasi email." 
          />
        </div>
      </div>
    </Authenticated>
  )
}

export default Create;