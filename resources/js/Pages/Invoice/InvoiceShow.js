import Badge from '@/Components/Badge';
import CircularButton from '@/Components/CircularButton';
import DescriptionList from '@/Components/DescriptionList';
import SlideOver from '@/Components/SlideOver';
import { toCurrency } from '@/utils/helper';
import { CalendarIcon, ClockIcon, DownloadIcon } from '@heroicons/react/outline';
import React from 'react';

const InvoiceShow = ({ open, onClose, invoice }) => {
  return (
    <SlideOver
      open={open}
      onClose={onClose}
      title="Invoice Detail"
      wide={true}
    >
      {
        invoice && (
          <DescriptionList
            title={`Invoice ${invoice.code}`}
            lists={[
              {
                label: '',
                value: (
                  <CircularButton 
                    className='bg-gray-100 hover:bg-gray-200 focus:ring-gray-200'
                    onClick={() => window.open(route('invoice.pdf', invoice), '_blank')}
                  >
                    <DownloadIcon className='w-4 h-4' />
                  </CircularButton>
                )
              },
              {
                label: 'Number',
                value: invoice.code
              },
              {
                label: 'Date',
                value: invoice.date
              },
              {
                label: 'Due Date',
                value: invoice.due_date
              },
              {
                label: 'note',
                value: invoice.note
              },
              {
                label: 'Status',
                value: (
                  <Badge className={`${invoice.is_paid ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}>
                    {invoice.is_paid ? "PAID" : "UNPAID"}
                  </Badge>
                )
              },
            ]}
          />
        )
      }

      <hr className='mt-5' />
      {
        invoice && (
          <div className="flex flex-col mt-5">
            <div className="-my-2 overflow-x-auto">
              <div className="py-2 align-middle inline-block min-w-full">
                <div className="overflow-hidden border-b border-gray-200 sm:rounded-lg">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
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
                      {invoice.details.map((detail, index) => (
                        <tr key={index}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {detail.desc}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-right text-gray-500">
                            {toCurrency(parseFloat(detail.amount))}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                    <tfoot>
                      <tr>
                        <td className='px-6 py-4 whitespace-nowrap text-sm text-right text-gray-500'>
                          Subtotal
                        </td>
                        <td className='px-6 py-4 whitespace-nowrap text-sm text-right text-gray-500'>
                          {toCurrency(invoice.total + parseFloat(invoice.discount) - parseFloat(invoice.tax))}
                        </td>
                      </tr>
                      <tr>
                        <td className='px-6 py-4 whitespace-nowrap text-sm text-right text-gray-500'>
                          Tax
                        </td>
                        <td className='px-6 py-4 whitespace-nowrap text-sm text-right text-gray-500'>
                          {toCurrency(parseFloat(invoice.tax))}
                        </td>
                      </tr>
                      <tr>
                        <td className='px-6 py-4 whitespace-nowrap text-sm text-right text-gray-500'>
                          Discount
                        </td>
                        <td className='px-6 py-4 whitespace-nowrap text-sm text-right text-gray-500'>
                          {toCurrency(parseFloat(invoice.discount))}
                        </td>
                      </tr>
                      <tr>
                        <td className='px-6 py-4 whitespace-nowrap text-sm text-right text-gray-500'>
                          Total
                        </td>
                        <td className='px-6 py-4 whitespace-nowrap text-sm text-right text-gray-500'>
                          {toCurrency(invoice.total)}
                        </td>
                      </tr>
                    </tfoot>
                  </table>
                </div>
              </div>
            </div>
          </div>
        )
      }

    </SlideOver>
  )
}

export default InvoiceShow;