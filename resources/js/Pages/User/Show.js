import Badge from '@/Components/Badge';
import DescriptionList from '@/Components/DescriptionList';
import Authenticated from '@/Layouts/Authenticated';
import React from 'react';
import UserTabs from './UserTabs';

const Show = (props) => {
  const user = props.user.data;
  
  return (
    <Authenticated props={props} title={`USER DETAIL`}>
      <div className="bg-white overflow-x-visible shadow sm:rounded-lg divide-y divide-gray-200 mt-3">
        <div className="px-4 py-5 sm:p-6">
          <UserTabs user={user} permissions={props.auth.permissions} />
          <div className='mt-5'>
            <DescriptionList
              title="User Profile"
              lists={[
                { label: 'ID', value: user.id },
                { label: 'Nama lengkap', value: user.name },
                { label: 'Email', value: user.email },
                { label: 'Role', value: user.role.name },
                { label: 'Tanggal lahir', value: user.date_of_birth },
                { label: 'Usia', value: `${user.age} TH` },
                { label: 'Jenis kelamin', value: user.gender === 'm' ? 'Male' : user.gender === 'f' ? 'Female' : '' },
                { label: 'Mobile', value: user.mobile },
                {
                  label: 'Status',
                  value: (
                    <Badge className={`text-white ${user.verified ? 'bg-green-600' : 'bg-red-600'}`}>
                      {user.verified ? 'Terverifikasi' : 'Belum verifikasi'}
                    </Badge>
                  )
                },
              ]}
            />
          </div>
        </div>
      </div>
    </Authenticated>
  )
}

export default Show;