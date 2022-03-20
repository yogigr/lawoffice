import Button from '@/Components/Button';
import Input from '@/Components/Input';
import Textarea from '@/Components/Textarea';
import { useForm } from '@inertiajs/inertia-react';
import React, { useEffect } from 'react';

const Form = ({ props, title, desc }) => {
  const { roles } = props;
  const service = props.service ? props.service : null;

  let formData = {
    _method: service ? "patch" : "post",
    service_id: service ? service.id : null,
    name: service ? service.name : '',
    description: service ? service.description : ''
  }

  const { data, setData, post, processing, reset, errors } = useForm(formData);

  const submit = (e) => {
    e.preventDefault();
    const url = service ? `/service/${service.id}` : "/service";
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
      <div className='py-5 grid grid-cols-1 gap-y-4'>
        <div>
          <Input
            name="name"
            value={data.name}
            label='Nama service'
            placeholder='Nama service'
            isFocused={true}
            handleChange={(e) => setData('name', e.target.value)}
          />
        </div>
        <div>
          <Textarea
            name="description"
            value={data.description}
            label='Deskripsi'
            placeholder='Deskripsi'
            handleChange={(e) => setData('description', e.target.value)}
          />
        </div>
      </div>
      <div className='py-5 grid grid-cols-1 md:grid-cols-6'>
        <div>
          <Button processing={processing}>
            {service ? "Update" : "Simpan"}
          </Button>
        </div>
      </div>
    </form>
  )
}

export default Form;