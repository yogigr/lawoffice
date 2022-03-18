import Button from '@/Components/Button';
import Input from '@/Components/Input';
import Authenticated from '@/Layouts/Authenticated';
import { useForm } from '@inertiajs/inertia-react';
import React from 'react';
import ProfileTabs from './ProfileTabs';

const Address = (props) => {
  const { user, address } = props
  const { data, setData, post, reset, processing } = useForm({
    ...address,
    _method: 'patch',
  });

  const submit = (e) => {
    e.preventDefault();
    post(route('profile.update_address'), {
      preserveScroll: true,
      onSuccess: () => reset()
    });
  }
  return (
    <Authenticated props={props} title="Address">
      <div className="bg-white overflow-x-visible shadow sm:rounded-lg mt-3">
        <div className="px-4 py-5 sm:p-6">
          <ProfileTabs user={user} />
        </div>
        <form onSubmit={submit} className='divide-y divide-gray-200'>
          <div className="px-4 py-5 sm:p-6">
            <div className='grid grid-cols-1 gap-y-4 md:grid-cols-2 md:gap-x-4'>
              <div>
                <Input
                  name="line1"
                  value={data.line1}
                  label='Address 1'
                  placeholder='Address 1'
                  handleChange={e => setData('line1', e.target.value)}
                />
              </div>
              <div>
                <Input
                  name="line2"
                  value={data.line2}
                  label='Address 2'
                  placeholder='Address 2'
                  handleChange={e => setData('line2', e.target.value)}
                />
              </div>
              <div>
                <Input
                  name="city"
                  value={data.city}
                  label='City'
                  placeholder='City'
                  handleChange={e => setData('city', e.target.value)}
                />
              </div>
              <div>
                <Input
                  name="province"
                  value={data.province}
                  label='State/Province'
                  placeholder='State/Province'
                  handleChange={e => setData('province', e.target.value)}
                />
              </div>
              <div>
                <Input
                  name="postal_code"
                  value={data.postal_code}
                  label='Zip code'
                  placeholder='Zip code'
                  handleChange={e => setData('postal_code', e.target.value)}
                />
              </div>
              <div>
                <Input
                  name="country"
                  value={data.country}
                  label='Country'
                  placeholder='Country'
                  handleChange={e => setData('country', e.target.value)}
                />
              </div>
            </div>
          </div>
          <div className="px-4 py-5 sm:p-6">
            <div className='md:w-1/6'>
              <Button processing={processing}>
                Update
              </Button>
            </div>
          </div>
        </form>
      </div>
    </Authenticated>
  )
}

export default Address;