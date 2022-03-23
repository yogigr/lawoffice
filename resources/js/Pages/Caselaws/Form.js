import Button from '@/Components/Button';
import Input from '@/Components/Input';
import Select from '@/Components/Select';
import Textarea from '@/Components/Textarea';
import { useForm } from '@inertiajs/inertia-react';
import React, { useEffect } from 'react';

const Form = ({ props, title, desc }) => {
  const { clients, services, statuses } = props;
  const caselaw = props.caselaw ? props.caselaw.data : null;

  let formData = {
    _method: caselaw ? "PATCH" : "POST",
    caselaw_id: caselaw ? caselaw.id : null,
    start_date: caselaw ? caselaw.start_date : "",
    end_date: caselaw ? caselaw.end_date : "",
    title: caselaw ? caselaw.title : "",
    desc: caselaw ? caselaw.desc : "",
    service_id: caselaw ? caselaw.service_id : "",
    status_id: caselaw ? caselaw.status_id : "",
    client_id: caselaw ? caselaw.client_id : ""
  }

  const { data, setData, post, processing, reset, errors } = useForm(formData);

  const submit = (e) => {
    e.preventDefault();
    const url = caselaw ? `/caselaw/${caselaw.id}` : "/caselaw";
    post(url)
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
      <div className='space-y-6 sm:space-y-5'>
        <div className='mt-2'>
          <Input
            label='Case Title'
            placeholder='Case Title'
            isFocused={true}
            value={data.title}
            handleChange={e => setData('title', e.target.value)}
          />
        </div>
        <div className='mt-2'>
          <Textarea
            label='Case Description'
            placeholder='Case Description'
            value={data.desc}
            handleChange={e => setData('desc', e.target.value)}
          />
        </div>
        <div className='grid grid-cols-1 sm:grid-cols-2'>
          <div className='mt-2 sm:mr-1'>
            <Input
              type='date'
              label="Start date"
              placeholder='Start Date'
              value={data.start_date}
              handleChange={e => setData('start_date', e.target.value)}
            />
          </div>
          <div className='mt-2 sm:ml-1'>
            <Input
              type='date'
              label="End date"
              placeholder='End Date'
              value={data.end_date}
              handleChange={e => setData('end_date', e.target.value)}
            />
          </div>
        </div>
        <div className='grid grid-cols-1 sm:grid-cols-2'>
          <div className='mt-2 sm:mr-1'>
            <Select
              options={services}
              selected={data.service_id}
              label='Service / Layanan Hukum'
              onChange={v => setData('service_id', v)}
            />
          </div>
          <div className='mt-2 sm:ml-1'>
            <Select
              options={statuses}
              selected={data.status_id}
              label='Status Case'
              onChange={v => setData('status_id', v)}
            />
          </div>
        </div>
        <div className='mt-2'>
          <Select
            options={clients}
            selected={data.client_id}
            label='Client'
            onChange={v => setData('client_id', v)}
          />
        </div>
        <div className='pt-5'>
          <Button processing={processing} className='sm: w-1/2 md:w-1/6'>
            {caselaw ? "Update" : "Simpan"}
          </Button>
        </div>
      </div>
    </form>
  )
}

export default Form;