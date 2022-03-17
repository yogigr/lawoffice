import Badge from '@/Components/Badge';
import ConfirmationModal from '@/Components/ConfirmationModal';
import DescriptionList from '@/Components/DescriptionList';
import Authenticated from '@/Layouts/Authenticated';
import { Inertia } from '@inertiajs/inertia';
import { Link } from '@inertiajs/inertia-react';
import React from 'react';

const Show = (props) => {
  const { auth } = props;
  const user = props.user.data;
  const [deleteModal, setDeleteModal] = React.useState(false);
  return (
    <Authenticated props={props} title={`USER DETAIL`}>
      <div className="bg-white overflow-x-visible shadow sm:rounded-lg divide-y divide-gray-200 mt-3">
        <div className="px-4 py-5 sm:p-6">
          <span className="relative z-0 inline-flex shadow-sm rounded-md">
            {
              auth.permissions.includes('edit-user') && (
                <Link
                  href={route("user.edit", user)}
                  className="relative inline-flex items-center px-4 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
                >
                  Edit
                </Link>
              )
            }
            {
              auth.permissions.includes('delete-user') && (
                <button
                  type="button"
                  onClick={() => setDeleteModal(true)}
                  className="-ml-px relative inline-flex items-center px-4 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
                >
                  Hapus
                </button>
              )
            }
          </span>
        </div>
        <div className="px-4 py-5 sm:p-6">
          <div className='py-5 text-center'>
            <img class="inline-block h-14 w-14 rounded-full" src={user.picture} alt={user.name} />
          </div>
          <DescriptionList
            title="Detail User"
            lists={[
              { label: 'ID', value: user.id },
              { label: 'Nama lengkap', value: user.name },
              { label: 'Email', value: user.email },
              { label: 'Role', value: user.role.name },
              { label: 'Tanggal lahir', value: user.date_of_birth },
              { label: 'Usia', value: `${user.age} TH` },
              { label: 'Jenis kelamin', value: user.gender === 'm' ? 'Male' : user.gender === 'f' ? 'Female' : '' },
              { label: 'Mobile', value: user.mobile },
              {
                label: 'Status',
                value: (
                  <Badge className={`text-white ${user.verified ? 'bg-green-600' : 'bg-red-600'}`}>
                    {user.verified ? 'Terverifikasi' : 'Belum verifikasi'}
                  </Badge>
                )
              },
            ]}
          />
        </div>
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
    </Authenticated>
  )
}

export default Show;