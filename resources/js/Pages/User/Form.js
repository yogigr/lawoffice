import Button from '@/Components/Button';
import Input from '@/Components/Input';
import Select from '@/Components/Select';
import { useForm } from '@inertiajs/inertia-react';
import React, { useEffect } from 'react';

const Form = ({ props, title, desc }) => {
  const { roles } = props;
  const user = props.user ? props.user.data : null;

  let formData = {
    _method: user ? "patch" : "post",
    user_id: user ? user.id : null,
    name: user ? user.name : '',
    email: user ? user.email : '',
    password: '',
    password_confirmation: '',
    role_id: user ? user.role_id : '',
    date_of_birth: user ? user.date_of_birth : '',
    gender: user ? user.gender : '',
    mobile: user ? user.mobile : '',
  }

  const { data, setData, post, processing, reset, errors } = useForm(formData);

  const submit = (e) => {
    e.preventDefault();
    const url = user ? `/user/${user.id}` : "/user";
    post(url, {
      onSuccess: () => reset()
    })
  }

  useEffect(() => {
    return () => {
      reset()
    };
  }, []);

  return (
    <form className='space-y-8 divide-y divide-gray-200' onSubmit={submit}>
      <div>
        <h3 className="text-lg leading-6 font-medium text-gray-900">
          {title}
        </h3>
        <p className="mt-1 max-w-2xl text-sm text-gray-500">
          {desc}
        </p>
      </div>
      <div className='py-5 grid grid-cols-1 gap-y-4 md:grid-cols-2 md:gap-x-4'>
        <div>
          <Input
            name="name"
            value={data.name}
            label='Nama lengkap'
            placeholder='Nama lengkap'
            isFocused={true}
            handleChange={(e) => setData('name', e.target.value)}
          />
        </div>
        <div>
          <Input
            type='email'
            name="email"
            value={data.email}
            label='Alamat email'
            placeholder='Alamat email'
            handleChange={(e) => setData('email', e.target.value)}
          />
        </div>
        <div>
          <Input
            type='password'
            name="password"
            value={data.password}
            label='Password'
            placeholder='Password'
            handleChange={(e) => setData('password', e.target.value)}
          />
        </div>
        <div>
          <Input
            type='password'
            name="password-confirmation"
            value={data.password_confirmation}
            label='Konfirmasi Password'
            placeholder='Konfirmasi Password'
            handleChange={(e) => setData('password_confirmation', e.target.value)}
          />
        </div>
        <div>
          <Select
            options={roles}
            name="role_id"
            selected={data.role_id}
            label='Role'
            onChange={v => setData('role_id', v)}
          />
        </div>
        <div>
          <Input
            type='date'
            name="date-of-birth"
            value={data.date_of_birth}
            label='Tanggal lahir'
            placeholder='Tanggal lahir'
            handleChange={(e) => setData('date_of_birth', e.target.value)}
          />
        </div>
        <div>
          <Select
            options={[
              { id: 'm', name: "Male" },
              { id: 'f', name: 'Female' }
            ]}
            name="gender"
            selected={data.gender}
            label='Jenis kelamin'
            onChange={v => setData('gender', v)}
          />
        </div>
        <div>
          <Input
            type='tel'
            name="mobile"
            value={data.mobile}
            label='No handphone'
            placeholder='No handphone'
            handleChange={(e) => setData('mobile', e.target.value)}
          />
        </div>
      </div>
      <div className='py-5 grid grid-cols-1 md:grid-cols-6'>
        <div>
          <Button processing={processing}>
            {user ? "Update" : "Simpan"}
          </Button>
        </div>
      </div>
    </form>
  )
}

export default Form;