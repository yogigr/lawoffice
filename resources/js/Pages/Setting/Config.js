import Button from '@/Components/Button';
import Input from '@/Components/Input';
import Authenticated from '@/Layouts/Authenticated';
import { useForm } from '@inertiajs/inertia-react';
import React from 'react';
import SettingTabs from './SettingTabs';

const Config = (props) => {
  const { config } = props;
  const { data, setData, post, processing, reset } = useForm({
    ...config,
    app_debug: config.app_debug ? 'true' : 'false',
    _method: 'patch'
  });

  const submit = (e) => {
    e.preventDefault();
    post(route('config.update'))
  }

  return (
    <Authenticated props={props} title="System setting">
      <SettingTabs />
      <div className="bg-white overflow-x-visible shadow sm:rounded-lg divide-y divide-gray-200 mt-3">
        <div className="px-4 py-5 sm:p-6">
          <form className='space-y-8 divide-y divide-gray-200' onSubmit={submit}>
            <div>
              <h3 className="text-lg leading-6 font-medium text-gray-900">
                System configuration
              </h3>
              <p className="mt-1 max-w-2xl text-sm text-gray-500">
                Isi semua kolom dibawah untuk pengaturan sistem
              </p>
            </div>
            <div className='py-5 grid grid-cols-1 gap-y-5 md:grid-cols-2 md:gap-x-5'>
              <div>
                <Input
                  name="app_name"
                  value={data.app_name}
                  label='APP NAME'
                  handleChange={(e) => setData('app_name', e.target.value)}
                />
              </div>
              <div>
                <Input
                  name="app_env"
                  value={data.app_env}
                  label='APP ENV'
                  handleChange={(e) => setData('app_env', e.target.value)}
                />
              </div>
              <div>
                <Input
                  name="app_debug"
                  value={data.app_debug}
                  label='APP DEBUG'
                  handleChange={(e) => setData('app_debug', e.target.value)}
                />
              </div>
              <div>
                <Input
                  name="app_url"
                  value={data.app_url}
                  label='APP URL'
                  handleChange={(e) => setData('app_url', e.target.value)}
                />
              </div>
              <div>
                <Input
                  name="mail_host"
                  value={data.mail_host}
                  label='MAIL HOST'
                  handleChange={(e) => setData('mail_host', e.target.value)}
                />
              </div>
              <div>
                <Input
                  name="mail_port"
                  value={data.mail_port}
                  label='MAIL PORT'
                  handleChange={(e) => setData('mail_port', e.target.value)}
                />
              </div>
              <div>
                <Input
                  name="mail_username"
                  value={data.mail_username}
                  label='MAIL USERNAME'
                  handleChange={(e) => setData('mail_username', e.target.value)}
                />
              </div>
              <div>
                <Input
                  name="mail_password"
                  value={data.mail_password}
                  label='MAIL PASSWORD'
                  handleChange={(e) => setData('mail_password', e.target.value)}
                />
              </div>
              <div>
                <Input
                  name="mail_from_address"
                  value={data.mail_from_address}
                  label='MAIL FROM ADDRESS'
                  handleChange={(e) => setData('mail_from_address', e.target.value)}
                />
              </div>
            </div>
            <div className='pt-5'>
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

export default Config;