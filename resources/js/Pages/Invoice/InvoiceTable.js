import Badge from '@/Components/Badge';
import CircularButton from '@/Components/CircularButton';
import { toCurrency } from '@/utils/helper';
import { CalendarIcon, PencilIcon, TrashIcon, ViewListIcon } from '@heroicons/react/outline';
import { Link } from '@inertiajs/inertia-react';
import React from 'react';

const InvoiceTable = ({
  invoices,
  editable = true,
  deleteable = true,
  showCase = false,
  onEdit,
  onDelete,
  onShowDetail,
  permissions
}) => {
  return (
    <div className="flex flex-col">
      <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
          <div className="shadow overflow-auto border-b border-gray-200 sm:rounded-lg">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Code
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Date
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Due Date
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Total
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Status
                  </th>
                  {
                    showCase && (
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Related case
                      </th>
                    )
                  }
                  <th scope="col" className="relative px-6 py-3">
                    <span className="sr-only">Edit</span>
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {
                  invoices.data.map((invoice) => (
                    <tr key={invoice.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500">{invoice.code}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500">
                          <div className='flex'>
                            <CalendarIcon className='mr-1 h-4 w-4' />
                            {invoice.date_formatted}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500">
                          <div className='flex'>
                            <CalendarIcon className='mr-1 h-4 w-4' />
                            {invoice.due_date_formatted}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right">
                        <div className="text-sm text-gray-500">
                          {toCurrency(invoice.total)}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <Badge className={`${invoice.is_paid ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}>
                          {invoice.is_paid ? "PAID" : "UNPAID"}
                        </Badge>

                      </td>
                      {
                        showCase && (
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm">
                              <Link
                                className="text-primary-600 hover:text-primary-700"
                                href={route('caselaw.show', invoice.caselaw)}
                              >
                                {invoice.caselaw.code}
                              </Link>
                            </div>
                          </td>
                        )
                      }
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium flex">
                        {
                          permissions.includes('view-invoice') && (
                            <div>
                              <CircularButton
                                className='bg-gray-100 hover:bg-gray-200 focus:ring-gray-700'
                                onClick={() => onShowDetail(invoice)}
                              >
                                <ViewListIcon className='h-4 w-4' />
                              </CircularButton>
                            </div>
                          )
                        }
                        {
                          editable && permissions.includes('edit-invoice') && (
                            <div className='ml-2'>
                              <CircularButton
                                onClick={() => onEdit(invoice)}
                                className='bg-gray-100 hover:bg-gray-200 focus:ring-gray-700'
                              >
                                <PencilIcon className='h-4 w-4' />
                              </CircularButton>
                            </div>
                          )
                        }
                        {
                          deleteable && permissions.includes('delete-invoice') && (
                            <div className='ml-2'>
                              <CircularButton
                                className='bg-gray-100 hover:bg-gray-200 focus:ring-gray-700'
                                onClick={() => onDelete(invoice)}
                              >
                                <TrashIcon className='h-4 w-4' />
                              </CircularButton>
                            </div>
                          )
                        }
                      </td>
                    </tr>
                  ))
                }
              </tbody>
            </table>
          </div>
        </div>
      </div >
    </div >
  )
}

export default InvoiceTable;