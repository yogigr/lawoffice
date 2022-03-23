import Button from '@/Components/Button';
import Modal from '@/Components/Modal';
import Select from '@/Components/Select';
import { useForm } from '@inertiajs/inertia-react';
import React, { useEffect } from 'react';

const LawyerForm = ({ open, caselaw, users, onClose }) => {
  const { data, setData, post, processing, reset, errors } = useForm({
    user_id: ''
  });
  const submit = (e) => {
    e.preventDefault();
    post(`/caselaw/${caselaw.id}/lawyer`);
    onClose()
  }
  useEffect(() => {
    return () => {
      reset()
    };
  }, []);
  return (
    <Modal open={open} title="Lawyer Form" onClose={() => {
      reset()
      onClose()
    }}>
      <form onSubmit={submit} className='mt-5'>
        <div>
          <Select
            showLabel={false}
            options={users}
            label='Lawyer'
            selected={data.user_id}
            onChange={(v) => setData('user_id', v)}
          />
        </div>
        <div className='mt-3'>
          <Button processing={processing} className='bg-gray-900 hover:bg-gray-800 focus:ring-gray-900'>
            Tambahkan
          </Button>
        </div>
      </form>
    </Modal>
  )
}

export default LawyerForm;