import Tabs from '@/Components/Tabs';
import React from 'react';

const ProfileTabs = ({ user }) => {
  return (
    <div className='flex flex-col space-y-4'>
      <div className='flex flex-col space-y-3 items-center'>
        <div className='rounded-full border-8 border-solid border-gray-100 shadow'>
          <img
            className="inline-block h-20 w-20 rounded-full"
            src={user.picture}
            alt={user.name}
          />
        </div>
        <div className='text-center'>
          <p className='text-gray-600'>{user.name}</p>
          <p className='text-xs text-gray-400'>{user.role_name}</p>
        </div>
      </div>
      <Tabs
        tabs={[
          {
            name: 'PROFILE',
            href: route('profile.index'),
            current: route().current('profile.index'),
            show: true
          },
          {
            name: 'ADDRESS',
            href: route('profile.address_form'),
            current: route().current('profile.address_form'),
            show: true
          },
          {
            name: 'CHANGE PASSWORD',
            href: route('profile.change_password_form'),
            current: route().current('profile.change_password_form'),
            show: true
          },
        ]}
      />
    </div>
  )
}

export default ProfileTabs;