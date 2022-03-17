import React, { useState, useEffect, useRef } from 'react';
import Authenticated from '@/Layouts/Authenticated';
import AppointmentShow from './AppointmentShow';
import AppointmentTable from './AppointmentTable';
import EmptyState from '@/Components/EmptyState';
import Pagination from '@/Components/Pagination';
import { Inertia } from '@inertiajs/inertia';

const Index = (props) => {
  const { appointments, auth } = props;
  const isMounted = useRef(false);
  const [pageNum, setPageNum] = useState(1);
  const [selectedAppointment, setSelectedAppointment] = useState(null);

  const getAppointments = () => {
    Inertia.visit(route('appointment.index'), {
      method: 'get',
      only: ['appointments'],
      data: {
        page: pageNum,
      },
      preserveState: true,
      preserveScroll: true,
    });
  }
  useEffect(() => {
    if (isMounted.current) {
      getAppointments(); 
    } else {
      isMounted.current = true;
    }
  }, [pageNum]);

  return (
    <Authenticated props={props} title="Appointment">
      <AppointmentShow
        open={selectedAppointment ? true : false}
        onClose={() => setSelectedAppointment(null)}
        appointment={selectedAppointment}
      />
      <div className="bg-white overflow-x-visible shadow sm:rounded-lg divide-y divide-gray-200 mt-3">
        <div className="px-4 py-5 sm:p-6">
          {
            appointments && appointments.data.length > 0 ? (
              <AppointmentTable
                editable={false}
                deleteable={false}
                showCase={true}
                appointments={appointments}
                onShowDetail={v => setSelectedAppointment(v)}
                permissions={auth.permissions}
              />
            ) : (
              <EmptyState model="Appointment" />
            )
          }
        </div>
        {
          appointments && appointments.data.length > 0 && (
            <div className="px-4 py-4 sm:px-6">
              <Pagination
                meta={appointments.meta}
                onChangePage={(page) => setPageNum(page)}
              />
            </div>
          )
        }
      </div>
    </Authenticated>
  )
}

export default Index;