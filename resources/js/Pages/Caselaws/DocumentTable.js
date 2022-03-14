import CircularButton from '@/Components/CircularButton';
import { DocumentIcon, PencilIcon, TrashIcon, ViewListIcon } from '@heroicons/react/outline';
import React from 'react';

const DocumentTable = ({
  documents,
  onEdit,
  onDelete,
  onShowDetail
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
                    Filename
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Document Title
                  </th>
                  <th scope="col" className="relative px-6 py-3">
                    <span className="sr-only">Edit</span>
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {
                  documents.data.map((document) => (
                    <tr key={document.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{document.code}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-indigo-600 flex items-center">
                          <DocumentIcon className='h-4 w-4 mr-1' />
                          {document.filename}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{document.title}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium flex">
                        <div>
                          <CircularButton
                            className='bg-gray-100 hover:bg-gray-200 focus:ring-gray-700'
                            onClick={() => onShowDetail(document)}
                          >
                            <ViewListIcon className='h-4 w-4' />
                          </CircularButton>
                        </div>
                        <div className='ml-2'>
                          <CircularButton
                            onClick={() => onEdit(document)}
                            className='bg-gray-100 hover:bg-gray-200 focus:ring-gray-700'
                          >
                            <PencilIcon className='h-4 w-4' />
                          </CircularButton>
                        </div>
                        <div className='ml-2'>
                          <CircularButton
                            className='bg-gray-100 hover:bg-gray-200 focus:ring-gray-700'
                            onClick={() => onDelete(document)}
                          >
                            <TrashIcon className='h-4 w-4' />
                          </CircularButton>
                        </div>
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

export default DocumentTable;