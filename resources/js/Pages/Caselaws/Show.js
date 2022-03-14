import AvatarLink from '@/Components/AvatarLink';
import CaselawStatusBadge from '@/Components/CaselawStatusBadge';
import ConfirmationModal from '@/Components/ConfirmationModal';
import DescriptionList from '@/Components/DescriptionList';
import Tabs from '@/Components/Tabs';
import Authenticated from '@/Layouts/Authenticated';
import { Inertia } from '@inertiajs/inertia';
import { Link } from '@inertiajs/inertia-react';
import React from 'react';
import CaselawTabs from './CaselawTabs';

const Show = (props) => {
  const { auth } = props;
  const caselaw = props.caselaw.data;
  const [deleteModal, setDeleteModal] = React.useState(false);
  return (
    <Authenticated props={props} title={`CASE DETAIL ${caselaw.code}`}>
      <CaselawTabs caselaw={caselaw} permissions={auth.permissions} />
      <div className="bg-white overflow-x-visible shadow sm:rounded-lg divide-y divide-gray-200 mt-3">
        <div className="px-4 py-5 sm:p-6">
          <span className="relative z-0 inline-flex shadow-sm rounded-md">
            {
              auth.permissions.includes('edit-caselaw') && (
                <Link
                  href={route("caselaw.edit", caselaw.id)}
                  className="relative inline-flex items-center px-4 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
                >
                  Edit
                </Link>
              )
            }
            {
              auth.permissions.includes('delete-caselaw') && (
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
          <DescriptionList
            title="Detail Kasus"
            lists={[
              { label: 'Kode kasus', value: caselaw.code },
              { label: 'Judul kasus', value: caselaw.title },
              { label: 'Deskripsi', value: caselaw.desc },
              { label: 'Start date', value: caselaw.start_date },
              { label: 'End date', value: caselaw.end_date },
              { label: 'Layanan Hukum', value: caselaw.service.name },
              { label: 'Status', value: <CaselawStatusBadge caselaw={caselaw} /> },
              { label: 'Client', value: <AvatarLink href="#" avatar={caselaw.client.picture} name={caselaw.client.name} /> },
            ]}
          />
        </div>
      </div>
      <ConfirmationModal
        title="Konfirmasi hapus case"
        message="Yakin hapus case?"
        open={deleteModal}
        onCancel={() => setDeleteModal(false)}
        onConfirm={() =>
          Inertia.visit(`/caselaw/${caselaw.id}`, {
            method: "delete",
          })
        }
      />
    </Authenticated>
  )
}

export default Show;