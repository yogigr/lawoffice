import Button from '@/Components/Button';
import Input from '@/Components/Input';
import { useForm } from '@inertiajs/inertia-react';
import React, { useEffect } from 'react';

const Form = ({ props, title, desc }) => {
  const bank = props.bank ? props.bank : null;

  let formData = {
    _method: bank ? "patch" : "post",
    bank_id: bank ? bank.id : null,
    name: bank ? bank.name : '',
    number: bank ? bank.number : '',
    owner: bank ? bank.owner : ''
  }

  const { data, setData, post, processing, reset, errors } = useForm(formData);

  const submit = (e) => {
    e.preventDefault();
    const url = bank ? `/bank/${bank.id}` : "/bank";
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
      <div>
        <div className='py-5 grid grid-cols-1 gap-y-4 md:w-1/2'>
          <div>
            <Input
              name="name"
              value={data.name}
              label='Nama bank'
              placeholder='Nama bank'
              isFocused={true}
              handleChange={(e) => setData('name', e.target.value)}
            />
          </div>
          <div>
            <Input
              name="number"
              value={data.number}
              label='No rekening'
              placeholder='No rekening'
              handleChange={(e) => setData('number', e.target.value)}
            />
          </div>
          <div>
            <Input
              name="owner"
              value={data.owner}
              label='Atas nama / Pemilk rekening'
              placeholder='Atas nama / Pemilk rekening'
              handleChange={(e) => setData('owner', e.target.value)}
            />
          </div>
        </div>
      </div>
      <div className='py-5 grid grid-cols-1 md:grid-cols-6'>
        <div>
          <Button processing={processing}>
            {bank ? "Update" : "Simpan"}
          </Button>
        </div>
      </div>
    </form>
  )
}

export default Form;