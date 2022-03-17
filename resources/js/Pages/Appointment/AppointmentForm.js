import Input from '@/Components/Input';
import Select from '@/Components/Select';
import SlideForm from '@/Components/SlideForm';
import Textarea from '@/Components/Textarea';
import { useForm } from '@inertiajs/inertia-react';
import React, { useEffect } from 'react';

const AppointmentForm = ({
  open,
  caselaw,
  onClose,
  appointment
}) => {

  const { data, setData, post, processing, reset, errors } = useForm({
    _method: 'POST',
    caselaw_id: caselaw.id,
    title: '',
    desc: '',
    date: '',
    time: '',
    type: '',
    location: '',
    redirect: `/caselaw/${caselaw.id}/appointment`,
  });

  const submit = (e) => {
    e.preventDefault();
    const url = appointment ? `/appointment/${appointment.id}` : "/appointment";
    post(url, {
      onSuccess: () => reset()
    })
    onClose()
  }

  useEffect(() => {
    return () => {
      reset()
    };
  }, []);

  useEffect(() => {
    if (appointment) {
      setData((data) => (
        {
          ...data,
          _method: 'PATCH',
          title: appointment.title,
          desc: appointment.desc,
          date: appointment.date,
          time: appointment.time,
          type: appointment.type,
          location: appointment.location
        }))
    } else {
      reset()
    }
  }, [appointment]);

  return (
    <SlideForm
      open={open}
      title="Appointment Form"
      onClose={onClose}
      onSubmit={submit}
      submitText={appointment ? 'Update' : 'Save'}
    >
      <div>
        <Input
          name="title"
          value={data.title}
          label='Title'
          isFocused={true}
          placeholder='Title'
          handleChange={e => setData('title', e.target.value)}
        />
      </div>
      <div className='mt-3'>
        <Textarea
          name="desc"
          value={data.desc}
          label="Description"
          placeholder='Description'
          handleChange={e => setData('desc', e.target.value)}
        />
      </div>
      <div className='grid grid-cols-1 sm:grid-cols-2'>
        <div className='mt-3 sm:mr-1'>
          <Input
            type='date'
            name="date"
            label="Date"
            value={data.date}
            placeholder='Date'
            handleChange={e => setData('date', e.target.value)}
          />
        </div>
        <div className='mt-3 sm:ml-1'>
          <Input
            type='time'
            name="time"
            label="Time"
            value={data.time}
            placeholder='Time'
            handleChange={e => setData('time', e.target.value)}
          />
        </div>
      </div>
      <div className='mt-3'>
        <Select
          options={[
            { id: 'online', name: 'Online' },
            { id: 'offline', name: 'Offline' },
          ]}
          name="type"
          label='Type'
          selected={data.type}
          onChange={v => setData('type', v)}
        />
      </div>
      <div className='mt-3'>
        <Textarea
          name="location"
          value={data.location}
          label="Location"
          placeholder='Location'
          handleChange={e => setData('location', e.target.value)}
        />
      </div>
    </SlideForm>
  )
}

export default AppointmentForm;