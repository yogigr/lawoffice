import Button from '@/Components/Button';
import EmptyState from '@/Components/EmptyState';
import Modal from '@/Components/Modal';
import Authenticated from '@/Layouts/Authenticated';
import { PlusIcon } from '@heroicons/react/outline';
import React, { useEffect, useState } from 'react';
import CaselawTabs from './CaselawTabs';
import LawyerForm from './LawyerForm';
import LaywerTable from './LawyerTable';

const Lawyer = (props) => {
  const { caselaw, lawyers, users } = props;
  const [formOpen, setFormOpen] = useState(false);
  useEffect(() => {
    return () => {
      setFormOpen(false)
    };
  }, []);
  return (
    <Authenticated props={props} title={`LAWYER ${caselaw.code}`}>
      <CaselawTabs caselaw={caselaw} />
      <LawyerForm
        open={formOpen}
        users={users}
        caselaw={caselaw}
        onClose={() => setFormOpen(false)}
      />
      <div className="bg-white overflow-x-visible shadow sm:rounded-lg divide-y divide-gray-200 mt-3">
        <div className="px-4 py-5 sm:p-6">
          <div className='grid grid-cols-1 sm:grid-cols-6'>
            <div>
              <Button type='button' onClick={() => setFormOpen(true)}>
                <PlusIcon className='mr-1 h-4 w-4' />
                Lawyer
              </Button>
            </div>
          </div>
        </div>
        <div className="px-4 py-5 sm:p-6">
          {
            lawyers && lawyers.data.length > 0 ? (
              <LaywerTable lawyers={lawyers} caselaw={caselaw} />
            ) : (
              <EmptyState model="Lawyer" />
            )
          }

        </div>
      </div>
    </Authenticated>
  )
}

export default Lawyer;