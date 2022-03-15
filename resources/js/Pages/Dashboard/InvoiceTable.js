import CircularButton from '@/Components/CircularButton';
import { ViewListIcon } from '@heroicons/react/outline';
import React from 'react';

const InvoiceTable = ({ invoices, onOpenDetail }) => {
  return (
    <div className="flex flex-col">
      <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
          <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th colSpan="2"
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Invoice Due Today
                  </th>
                </tr>
              </thead>
              <tbody>
                {
                  invoices.data.length > 0 ? (
                    invoices.data.map((invoice, index) => (
                      <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {`INVOICE #${invoice.code}`}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <CircularButton className="bg-gray-100 hover:bg-gray-200 focus:ring-gray-200"
                            onClick={() => onOpenDetail(invoice)}
                          >
                            <ViewListIcon className="h-4 w-4" />
                          </CircularButton>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="3" className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        No Invoice
                      </td>
                    </tr>
                  )
                }
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

export default InvoiceTable;