import Button from '@/Components/Button';
import ConfirmationModal from '@/Components/ConfirmationModal';
import EmptyState from '@/Components/EmptyState';
import Pagination from '@/Components/Pagination';
import Authenticated from '@/Layouts/Authenticated';
import { PlusIcon } from '@heroicons/react/outline';
import { Inertia } from '@inertiajs/inertia';
import React, { useEffect, useState } from 'react';
import CaselawTabs from './CaselawTabs';
import DocumentForm from './DocumentForm';
import DocumentShow from './DocumentShow';
import DocumentTable from './DocumentTable';

const Document = (props) => {
  const { caselaw, documents, auth } = props;
  const [formOpen, setFormOpen] = useState(false)
  const [pageNum, setPageNum] = useState(1);
  const [inertia, setInertia] = useState(props.inertia);
  const [selectedDocument, setSelectedDocument] = useState(null);
  const [deleteModal, setDeleteModal] = useState(false);
  const [openDetail, setOpenDetail] = useState(false);

  const getDocuments = () => {
    Inertia.visit(route('caselaw.document.index', caselaw), {
      method: 'get',
      only: ['documents'],
      data: {
        page: pageNum,
      },
      preserveState: true,
      preserveScroll: true,
    });
  }
  useEffect(() => {
    if (inertia) {
      getDocuments();
    }
  }, [pageNum]);

  useEffect(() => {
    if (!inertia) {
      setInertia(true);
    }
  }, []);

  return (
    <Authenticated props={props} title={`DOCUMENTS ${caselaw.code}`}>
      <CaselawTabs caselaw={caselaw} />
      <DocumentForm
        open={formOpen}
        caselaw={caselaw}
        document={selectedDocument}
        user={auth.user}
        onClose={() => {
          setFormOpen(false)
          setSelectedDocument(null)
        }}
      />
      <DocumentShow
        open={openDetail}
        onClose={() => {
          setOpenDetail(false);
          setSelectedDocument(null);
        }}
        document={selectedDocument}
      />
      <div className="bg-white overflow-x-visible shadow sm:rounded-lg divide-y divide-gray-200 mt-3">
        <div className="px-4 py-5 sm:p-6">
          <div className='grid grid-cols-1 sm:grid-cols-6'>
            <div>
              <Button type='button' onClick={() => setFormOpen(true)} processing={formOpen}>
                <PlusIcon className='mr-1 h-4 w-4' />
                Document
              </Button>
            </div>
          </div>
        </div>
        <div className="px-4 py-5 sm:p-6">
          {
            documents && documents.data.length > 0 ? (
              <DocumentTable
                documents={documents}
                onEdit={v => {
                  setSelectedDocument(v)
                  setFormOpen(true);
                }}
                onDelete={v => {
                  setSelectedDocument(v)
                  setDeleteModal(true)
                }}
                onShowDetail={v => {
                  setSelectedDocument(v)
                  setOpenDetail(true)
                }}
              />
            ) : (
              <EmptyState model="Document" />
            )
          }
        </div>
        {
          documents && documents.data.length > 0 && (
            <div className="px-4 py-4 sm:px-6">
              <Pagination
                meta={documents.meta}
                onChangePage={(page) => setPageNum(page)}
              />
            </div>
          )
        }
      </div>
      <ConfirmationModal
        title="Konfirmasi hapus document"
        message="Yakin hapus document?"
        open={deleteModal}
        onCancel={() => {
          setSelectedDocument(null)
          setDeleteModal(false)
        }}
        onConfirm={() =>
          Inertia.visit(`/document/${selectedDocument.id}`, {
            method: "delete",
          })
        }
      />
    </Authenticated>
  );
}

export default Document;