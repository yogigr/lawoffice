import Button from '@/Components/Button';
import FileInput from '@/Components/FileInput';
import Input from '@/Components/Input';
import Select from '@/Components/Select';
import Authenticated from '@/Layouts/Authenticated';
import { useForm } from '@inertiajs/inertia-react';
import React, { useEffect } from 'react';
import ProfileTabs from './ProfileTabs';

const Index = (props) => {
  const { user, profile } = props;

  const { data, setData, post, reset, processing } = useForm({
    ...profile,
    _method: 'patch',
    imagefile: null,
  });

  const submit = (e) => {
    e.preventDefault();
    post(route('profile.update'), {
      preserveScroll: true,
      onSuccess: () => reset()
    });
  }

  return (
    <Authenticated props={props} title="Profile">
      <div className="bg-white overflow-x-visible shadow sm:rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <ProfileTabs user={user} />
        </div>

        <form onSubmit={submit} className='divide-y divide-gray-200'>
          <div className="px-4 py-5 sm:p-6">
            <div className='grid grid-cols-1 gap-y-4 md:grid-cols-2 md:gap-x-4'>
              <div>
                <Input
                  name="name"
                  value={data.name}
                  label='Nama lengkap'
                  placeholder='Nama lengkap'
                  handleChange={e => setData('name', e.target.value)}
                />
              </div>
              <div>
                <Input
                  type='email'
                  name="email"
                  value={profile.email}
                  label='Email'
                  placeholder='Email'
                  handleChange={e => console.log(e.target.value)}
                  readOnly={true}
                />
              </div>
              <div>
                <Input
                  type='date'
                  name="date_of_birth"
                  value={data.date_of_birth}
                  label='Tanggal lahir'
                  placeholder='Tanggal lahir'
                  handleChange={e => setData('date_of_birth', e.target.value)}
                />
              </div>
              <div>
                <Select
                  options={[
                    { id: 'm', name: 'Male' },
                    { id: 'f', name: 'Female' },
                  ]}
                  name="gender"
                  selected={data.gender}
                  label="Jenis Kelamin"
                  onChange={v => setData('gender', v)}
                />
              </div>
              <div>
                <Input
                  type='tel'
                  name="mobile"
                  value={data.mobile}
                  label='No handphone'
                  placeholder='No Handphone'
                  handleChange={e => setData('mobile', e.target.value)}
                />
              </div>
            </div>
            <div className='py-4'>
              <FileInput
                label="Upload Photo"
                id='imagefile'
                name='imagefile'
                info="Maksimal 1MB"
                value={data.imagefile}
                multiple={false}
                handleChange={(e) => setData('imagefile', e.target.files[0])}
                handleReset={() => setData('imagefile', null)}
                image={true}
              />
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

export default Index;