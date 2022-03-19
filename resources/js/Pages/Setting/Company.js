import Button from '@/Components/Button';
import FileInput from '@/Components/FileInput';
import Input from '@/Components/Input';
import Textarea from '@/Components/Textarea';
import Authenticated from '@/Layouts/Authenticated';
import { useForm } from '@inertiajs/inertia-react';
import React from 'react';
import SettingTabs from './SettingTabs';

const Company = (props) => {
  const { company } = props;
  const { data, setData, post, processing, reset } = useForm({
    ...company,
    imagefile: null,
    _method: 'patch'
  });

  const submit = (e) => {
    e.preventDefault();
    post(route('company.update'))
  }
  return (
    <Authenticated props={props} title="Company setting">
      <SettingTabs />
      <div className="bg-white overflow-x-visible shadow sm:rounded-lg divide-y divide-gray-200 mt-3">
        <div className="px-4 py-5 sm:p-6">
          <div className='flex flex-col space-y-3 items-center'>
            <div className='rounded-full border-8 border-solid border-gray-100 shadow'>
              <img
                className="inline-block h-20 w-20 rounded-full"
                src={company.logo}
                alt={company.name}
              />
            </div>
            <div className='text-center'>
              <p className='text-gray-600'>{company.name}</p>
              <p className='text-xs text-gray-400'>Company</p>
            </div>
          </div>
        </div>
        <div className="px-4 py-5 sm:p-6">
          <form onSubmit={submit}>
            <div className='grid grid-cols-1 gap-y-5 md:grid-cols-2 md:gap-x-5'>
              <div>
                <Input
                  name="name"
                  value={data.name}
                  label='Company name'
                  handleChange={(e) => setData('name', e.target.value)}
                />
              </div>
              <div>
                <Input
                  type='email'
                  name="email"
                  value={data.email}
                  label='Email'
                  handleChange={(e) => setData('email', e.target.value)}
                />
              </div>
              <div>
                <Textarea
                  name="about"
                  value={data.about}
                  label="About company"
                  handleChange={e => setData('about', e.target.value)}
                />
              </div>
              <div>
                <Textarea
                  name="address"
                  value={data.address}
                  label="Address"
                  handleChange={e => setData('address', e.target.value)}
                />
              </div>
              <div>
                <Input
                  type='tel'
                  name="phone"
                  value={data.phone}
                  label='Phone'
                  handleChange={(e) => setData('phone', e.target.value)}
                />
              </div>
              <div>
                <Input
                  name="facebook"
                  value={data.facebook_link}
                  label='Facebook link'
                  handleChange={(e) => setData('facebook_link', e.target.value)}
                />
              </div>
              <div>
                <Input
                  name="instagram"
                  value={data.instagram_link}
                  label='Instagram link'
                  handleChange={(e) => setData('instagram_link', e.target.value)}
                />
              </div>
              <div>
                <Input
                  name="twitter"
                  value={data.twitter_link}
                  label='Twitter link'
                  handleChange={(e) => setData('twitter_link', e.target.value)}
                />
              </div>
              <div>
                <Textarea
                  name="keywords"
                  value={data.meta_keywords}
                  label="Meta keywords"
                  handleChange={e => setData('meta_keywords', e.target.value)}
                />
              </div>
              <div>
                <Textarea
                  name="meta_desc"
                  value={data.meta_desc}
                  label="Meta description"
                  handleChange={e => setData('meta_desc', e.target.value)}
                />
              </div>
              <div>
                <FileInput
                  label="Upload Photo"
                  id='imagefile'
                  name='imagefile'
                  info="Maksimal 500KB"
                  value={data.imagefile}
                  multiple={false}
                  handleChange={(e) => setData('imagefile', e.target.files[0])}
                  handleReset={() => setData('imagefile', null)}
                  image={true}
                />
              </div>
            </div>
            <div className="pt-10">
              <div className='md:w-1/6'>
                <Button processing={processing}>
                  UPDATE
                </Button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </Authenticated>
  )
}

export default Company;