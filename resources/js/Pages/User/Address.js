import Badge from '@/Components/Badge';
import DescriptionList from '@/Components/DescriptionList';
import Authenticated from '@/Layouts/Authenticated';
import React from 'react';
import UserTabs from './UserTabs';

const Address = (props) => {
  const { address } = props;
  const user = props.user.data;
  return (
    <Authenticated props={props} title={`USER ADDRESS`}>
      <div className="bg-white overflow-x-visible shadow sm:rounded-lg divide-y divide-gray-200 mt-3">
        <div className="px-4 py-5 sm:p-6">
          <UserTabs user={user} permissions={props.auth.permissions} />
          <div className='mt-5'>
            <DescriptionList
              title="User Address"
              lists={[
                { label: 'Address 1', value: address ? address.line1 : '' },
                { label: 'Address 2', value: address ? address.line2 : '' },
                { label: 'City', value: address ? address.city : '' },
                { label: 'Province', value: address ? address.province : '' },
                { label: 'Zip code', value: address ? address.postal_code : '' },
                { label: 'Country', value: address ? address.country : '' },
              ]}
            />
          </div>
        </div>
      </div>
    </Authenticated>
  )
}

export default Address;