import DescriptionList from '@/Components/DescriptionList';
import SlideOver from '@/Components/SlideOver';
import { CalendarIcon, ClockIcon } from '@heroicons/react/outline';
import React from 'react';

const AppointmentShow = ({ open, onClose, appointment }) => {
  return (
    <SlideOver
      open={open}
      onClose={onClose}
      title="Appointment Detail"
    >
      {
        appointment && (
          <DescriptionList
            title={appointment.code}
            lists={[
              {
                label: 'Title',
                value: appointment.title
              },
              {
                label: 'Description',
                value: appointment.desc
              },
              {
                label: 'Datetime',
                value: (
                  <div className='flex'>
                    <div className='flex'>
                      <CalendarIcon className='mr-1 h-5 w-5' />
                      {appointment.date}
                    </div>
                    <div className='ml-2 flex'>
                      <ClockIcon className='mr-1 h-5 w-5' />
                      {appointment.time}
                    </div>
                  </div>
                )
              },
              {
                label: 'Type',
                value: appointment.type == 'online' ? 'Online' : 'Offline'
              },
              {
                label: 'Location',
                value: appointment.location
              },
            ]}
          />
        )
      }

    </SlideOver>
  )
}

export default AppointmentShow;