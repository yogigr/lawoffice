import ConfirmationModal from '@/Components/ConfirmationModal';
import Tabs from '@/Components/Tabs';
import { Inertia } from '@inertiajs/inertia';
import { Link } from '@inertiajs/inertia-react';
import React, { useState } from 'react';

const UserTabs = ({ user, permissions }) => {
  const [deleteModal, setDeleteModal] = useState(false);
  return (
    <>
      <div className='flex flex-col space-y-4'>
        <div className='flex flex-col space-y-3 items-center'>
          <div className='rounded-full border-8 border-solid border-gray-100 shadow'>
            <img
              className="inline-block h-20 w-20 rounded-full"
              src={user.picture}
              alt={user.name}
            />
          </div>
          <div className='text-center'>
            <p className='text-gray-600'>{user.name}</p>
            <p className='text-xs text-gray-400'>{user.role.name}</p>
          </div>
          <div className="relative z-0 inline-flex shadow-sm rounded-md">
            {
              permissions.includes('edit-user') && (
                <Link
                  href={route("user.edit", user)}
                  className="relative inline-flex items-center px-4 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
                >
                  Edit
                </Link>
              )
            }
            {
              permissions.includes('delete-user') && (
                <button
                  type="button"
                  onClick={() => setDeleteModal(true)}
                  className="-ml-px relative inline-flex items-center px-4 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
                >
                  Hapus
                </button>
              )
            }
          </div>
        </div>
        <Tabs
          tabs={[
            {
              name: 'PROFILE',
              href: route('user.show', user),
              current: route().current('user.show', user),
              show: true
            },
            {
              name: 'ADDRESS',
              href: route('user.address', user),
              current: route().current('user.address', user),
              show: true
            }
          ]}
        />
      </div>
      <ConfirmationModal
        title="Konfirmasi hapus user"
        message="Yakin hapus user?"
        open={deleteModal}
        onCancel={() => setDeleteModal(false)}
        onConfirm={() =>
          Inertia.visit(`/user/${user.id}`, {
            method: "delete",
          })
        }
      />
    </>
  )
}

export default UserTabs;