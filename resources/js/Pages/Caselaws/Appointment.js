import Button from '@/Components/Button';
import ConfirmationModal from '@/Components/ConfirmationModal';
import EmptyState from '@/Components/EmptyState';
import Pagination from '@/Components/Pagination';
import Authenticated from '@/Layouts/Authenticated';
import { PlusIcon } from '@heroicons/react/outline';
import { Inertia } from '@inertiajs/inertia';
import React, { useEffect, useState } from 'react';
import AppointmentForm from './AppointmentForm';
import AppointmentShow from './AppointmentShow';
import AppointmentTable from './AppointmentTable';
import CaselawTabs from './CaselawTabs';

const Appointment = (props) => {
  const { caselaw, appointments, auth } = props;
  const [formOpen, setFormOpen] = useState(false)
  const [pageNum, setPageNum] = useState(1);
  const [inertia, setInertia] = useState(props.inertia);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [deleteModal, setDeleteModal] = useState(false);
  const [openDetail, setOpenDetail] = useState(false);

  const getCaselaws = () => {
    Inertia.visit(route('caselaw.appointment.index', caselaw), {
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
    if (inertia) {
      getCaselaws();
    }
  }, [pageNum]);

  useEffect(() => {
    if (!inertia) {
      setInertia(true);
    }
  }, []);

  return (
    <Authenticated props={props} title={`APPOINTMENT ${caselaw.code}`}>
      <CaselawTabs caselaw={caselaw} permissions={auth.permissions} />
      <AppointmentForm
        open={formOpen}
        caselaw={caselaw}
        appointment={selectedAppointment}
        onClose={() => {
          setFormOpen(false)
          setSelectedAppointment(null)
        }}
      />
      <AppointmentShow
        open={openDetail}
        onClose={() => {
          setOpenDetail(false);
          setSelectedAppointment(null);
        }}
        appointment={selectedAppointment}
      />
      <div className="bg-white overflow-x-visible shadow sm:rounded-lg divide-y divide-gray-200 mt-3">
        {
          auth.permissions.includes('create-appointment') && (
            <div className="px-4 py-5 sm:p-6">
              <div className='grid grid-cols-1 sm:grid-cols-6'>
                <div>
                  <Button type='button' onClick={() => setFormOpen(true)} processing={formOpen}>
                    <PlusIcon className='mr-1 h-4 w-4' />
                    Appointment
                  </Button>
                </div>
              </div>
            </div>
          )
        }
        <div className="px-4 py-5 sm:p-6">
          {
            appointments && appointments.data.length > 0 ? (
              <AppointmentTable
                appointments={appointments}
                onEdit={v => {
                  setSelectedAppointment(v)
                  setFormOpen(true);
                }}
                onDelete={v => {
                  setSelectedAppointment(v)
                  setDeleteModal(true)
                }}
                onShowDetail={v => {
                  setSelectedAppointment(v)
                  setOpenDetail(true)
                }}
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
      <ConfirmationModal
        title="Konfirmasi hapus appointment"
        message="Yakin hapus appointment?"
        open={deleteModal}
        onCancel={() => {
          setSelectedAppointment(null)
          setDeleteModal(false)
        }}
        onConfirm={() =>
          Inertia.visit(`/appointment/${selectedAppointment.id}`, {
            method: "delete",
          })
        }
      />
    </Authenticated>
  );
}

export default Appointment;