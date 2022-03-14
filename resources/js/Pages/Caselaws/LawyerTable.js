import AvatarLink from '@/Components/AvatarLink';
import CircularButton from '@/Components/CircularButton';
import ConfirmationModal from '@/Components/ConfirmationModal';
import { TrashIcon } from '@heroicons/react/outline';
import { Inertia } from '@inertiajs/inertia';
import React, { useState, useEffect } from 'react';

const LaywerTable = ({ lawyers, caselaw, permissions }) => {
  const [deleteModal, setDeleteModal] = useState(false);
  const [selectedLawyerId, setSelectedLawyerId] = useState(null);
  useEffect(() => {
    if (selectedLawyerId) {
      setDeleteModal(true);
    } else {
      setDeleteModal(false);
    }
    return () => {
      setDeleteModal(false);
    };
  }, [selectedLawyerId]);
  return (
    <>
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
                      No
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Name
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Email
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Mobile
                    </th>
                    <th scope="col" className="relative px-6 py-3">
                      <span className="sr-only">Edit</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {
                    lawyers.data.map((lawyer, index) => (
                      <tr key={lawyer.id}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900 text-right">{index + 1}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <AvatarLink href="#" avatar={lawyer.picture} name={lawyer.name} />
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{lawyer.email}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{lawyer.mobile}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          {
                            permissions.includes('delete-lawyer') && (
                              <CircularButton
                                className='text-white bg-red-600 hover:bg-red-700 focus:ring-red-500'
                                onClick={() => setSelectedLawyerId(lawyer.id)}
                              >
                                <TrashIcon className="h-5 w-5" />
                              </CircularButton>
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
        </div>
      </div>
      <ConfirmationModal
        title="Konfirmasi hapus lawyer"
        message="Yakin hapus lawyer?"
        open={deleteModal}
        onCancel={() => setSelectedLawyerId(null)}
        onConfirm={() =>
          Inertia.visit(`/caselaw/${caselaw.id}/lawyer/${selectedLawyerId}`, {
            method: "delete",
          })
        }
      />
    </>
  )
}

export default LaywerTable;