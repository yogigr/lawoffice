import CircularButton from '@/Components/CircularButton';
import Input from '@/Components/Input';
import Select from '@/Components/Select';
import SlideForm from '@/Components/SlideForm';
import Textarea from '@/Components/Textarea';
import { toCurrency } from '@/utils/helper';
import { PlusIcon, TrashIcon } from '@heroicons/react/outline';
import { useForm } from '@inertiajs/inertia-react';
import React, { useEffect } from 'react';

const InvoiceForm = ({
  open,
  caselaw,
  onClose,
  invoice
}) => {

  const { data, setData, post, processing, reset, errors } = useForm({
    _method: 'POST',
    caselaw_id: caselaw.id,
    date: '',
    due_date: '',
    tax: 0,
    discount: 0,
    note: '',
    details: [],
    is_paid: 0,
    redirect: `/caselaw/${caselaw.id}/invoice`,
  });

  const handleChangeDetails = (index, key, value) => {
    let newDetails = [...data.details];
    newDetails[index] = {
      ...newDetails[index],
      [key]: value
    };
    setData('details', newDetails);
  }

  const handleDeleteDetails = (index) => {
    let newDetails = [...data.details];
    newDetails.splice(index, 1);
    setData('details', newDetails);
  }

  const subtotal = () => {
    let amount = 0
    data.details.forEach(e => {
      amount += parseFloat(e.amount);
    })
    return amount;
  }

  const total = () => {
    return subtotal() + parseFloat(data.tax) - parseFloat(data.discount);
  }

  const submit = (e) => {
    e.preventDefault();
    const url = invoice ? `/invoice/${invoice.id}` : "/invoice";
    post(url, {
      onSuccess: () => reset()
    });
    onClose();
  }

  useEffect(() => {
    return () => {
      reset()
    };
  }, []);

  useEffect(() => {
    if (invoice) {
      setData((data) => (
        {
          ...data,
          _method: 'PATCH',
          date: invoice.date,
          due_date: invoice.due_date,
          tax: invoice.tax,
          discount: invoice.discount,
          note: invoice.note,
          details: invoice.details,
          is_paid: invoice.is_paid,
        }))
    } else {
      reset()
    }
  }, [invoice]);

  return (
    <SlideForm
      open={open}
      title="Invoice Form"
      onClose={onClose}
      onSubmit={submit}
      submitText={invoice ? 'Update' : 'Save'}
      wide={true}
    >
      <div className='grid grid-cols-1 sm:grid-cols-2'>
        <div className='mt-3 sm:mr-1'>
          <Input
            type='date'
            name="date"
            label="Date"
            value={data.date}
            placeholder='Date'
            isFocused={true}
            handleChange={e => setData('date', e.target.value)}
          />
        </div>
        <div className='mt-3 sm:ml-1'>
          <Input
            type='date'
            name="due_date"
            label="Due Date"
            value={data.due_date}
            placeholder='Due Date'
            handleChange={e => setData('due_date', e.target.value)}
          />
        </div>
      </div>
      <div className='mt-3'>
        <Textarea
          name="note"
          value={data.note}
          label="Note"
          placeholder='Note'
          handleChange={e => setData('note', e.target.value)}
        />
      </div>

      <hr className='mt-5' />

      <div className="flex flex-col mt-5">
        <div className="-my-2 overflow-x-auto">
          <div className="py-2 align-middle inline-block min-w-full">
            <div className="overflow-hidden border-b border-gray-200 sm:rounded-lg">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="relative px-6 py-3 w-5">
                      <CircularButton
                        className='bg-gray-900 text-white hover:bg-gray-800 focus:ring-gray-900'
                        onClick={() => setData('details', [
                          ...data.details,
                          {
                            desc: '',
                            note: '',
                            amount: 0,
                          }
                        ])}
                      >
                        <PlusIcon className='h-4 w-4' />
                      </CircularButton>
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Description
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Amount
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {data.details.map((detail, index) => (
                    <tr key={index}>
                      <td className="px-6 py-4 whitespace-nowrap text-left text-sm font-medium">
                        <CircularButton
                          className='bg-gray-100 hover:bg-gray-200 focus:ring-gray-500'
                          onClick={() => handleDeleteDetails(index)}
                        >
                          <TrashIcon className='w-4 h-4' />
                        </CircularButton>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <Input
                          type='text'
                          name={`desc-${index}`}
                          showLabel={false}
                          value={detail.desc}
                          placeholder='Description'
                          handleChange={e => handleChangeDetails(index, 'desc', e.target.value)}
                        />
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-right">
                        <Input
                          type='number'
                          name={`amount-${index}`}
                          showLabel={false}
                          value={detail.amount}
                          placeholder='Amount'
                          handleChange={e => handleChangeDetails(index, 'amount', e.target.value)}
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr>
                    <td colSpan="2" className='px-6 py-4 whitespace-nowrap text-sm text-right'>
                      Subtotal
                    </td>
                    <td className='px-6 py-4 whitespace-nowrap text-sm text-right'>
                      {toCurrency(subtotal())}
                    </td>
                  </tr>
                  <tr>
                    <td colSpan="2" className='px-6 py-4 whitespace-nowrap text-sm text-right'>
                      Tax
                    </td>
                    <td className='px-6 py-4 whitespace-nowrap text-sm text-right'>
                      <Input
                        type='number'
                        name="tax"
                        showLabel={false}
                        value={data.tax}
                        placeholder='Tax'
                        handleChange={e => setData('tax', e.target.value)}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td colSpan="2" className='px-6 py-4 whitespace-nowrap text-sm text-right'>
                      Discount
                    </td>
                    <td className='px-6 py-4 whitespace-nowrap text-sm text-right'>
                      <Input
                        type='number'
                        name="discount"
                        showLabel={false}
                        value={data.discount}
                        placeholder='Discount'
                        handleChange={e => setData('discount', e.target.value)}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td colSpan="2" className='px-6 py-4 whitespace-nowrap text-sm text-right'>
                      Total
                    </td>
                    <td className='px-6 py-4 whitespace-nowrap text-sm text-right'>
                      {toCurrency(total())}
                    </td>
                  </tr>
                  {
                    invoice && (
                      <tr>
                        <td colSpan="2" className='px-6 py-4 whitespace-nowrap text-sm text-right'>
                          Status
                        </td>
                        <td className='px-6 py-4 whitespace-nowrap text-sm'>
                          <Select
                            options={[
                              { id: 0, name: 'UNPAID' },
                              { id: 1, name: 'PAID' },
                            ]}
                            selected={data.is_paid}
                            onChange={v => setData('is_paid', v)}
                            label='Status'
                            showLabel={false}
                          />
                        </td>
                      </tr>
                    )
                  }
                </tfoot>
              </table>
            </div>
          </div>
        </div>
      </div>
    </SlideForm>
  )
}

export default InvoiceForm;