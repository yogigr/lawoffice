import Button from '@/Components/Button';
import Input from '@/Components/Input';
import Authenticated from '@/Layouts/Authenticated';
import { useForm } from '@inertiajs/inertia-react';
import React from 'react';
import ProfileTabs from './ProfileTabs';

const ChangePassword = (props) => {
  const { user } = props
  const { data, setData, post, reset, processing } = useForm({
    old_password: '',
    new_password: '',
    new_password_confirmation: '',
    _method: 'patch',
  });

  const submit = (e) => {
    e.preventDefault();
    post(route('profile.change_password'), {
      preserveScroll: true,
      onSuccess: () => reset()
    });
  }
  return (
    <Authenticated props={props} title="Change password">
      <div className="bg-white overflow-x-visible shadow sm:rounded-lg mt-3">
        <div className="px-4 py-5 sm:p-6">
          <ProfileTabs user={user} />
        </div>
        <form onSubmit={submit} className='divide-y divide-gray-200'>
          <div className="px-4 py-5 sm:p-6">
            <div className='flex flex-col space-y-4 md:w-1/2'>
              <div>
                <Input
                  type='password'
                  name="old_password"
                  value={data.old_password}
                  label='Password lama'
                  placeholder='Password lama'
                  handleChange={e => setData('old_password', e.target.value)}
                />
              </div>
              <div>
                <Input
                  type='password'
                  name="new_password"
                  value={data.new_password}
                  label='Password baru'
                  placeholder='Password baru'
                  handleChange={e => setData('new_password', e.target.value)}
                />
              </div>
              <div>
                <Input
                  type='password'
                  name="new_password_confirmation"
                  value={data.new_password_confirmation}
                  label='Konfirmasi password baru'
                  placeholder='Konfirmasi password baru'
                  handleChange={e => setData('new_password_confirmation', e.target.value)}
                />
              </div>
            </div>
          </div>
          <div className="px-4 py-5 sm:p-6">
            <div className='md:w-1/6'>
              <Button processing={processing}>
                Change password
              </Button>
            </div>
          </div>
        </form>
      </div>
    </Authenticated>
  )
}

export default ChangePassword;