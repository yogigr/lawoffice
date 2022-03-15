import Button from '@/Components/Button';
import ConfirmationModal from '@/Components/ConfirmationModal';
import EmptyState from '@/Components/EmptyState';
import Pagination from '@/Components/Pagination';
import Authenticated from '@/Layouts/Authenticated';
import { PlusIcon } from '@heroicons/react/outline';
import { Inertia } from '@inertiajs/inertia';
import React, { useEffect, useState } from 'react';
import InvoiceForm from '../Invoice/InvoiceForm';
import InvoiceShow from '../Invoice/InvoiceShow';
import InvoiceTable from '../Invoice/InvoiceTable';
import CaselawTabs from './CaselawTabs';

const Invoice = (props) => {
  const { caselaw, invoices, auth } = props;
  const [formOpen, setFormOpen] = useState(false)
  const [pageNum, setPageNum] = useState(1);
  const [inertia, setInertia] = useState(props.inertia);
  const [selectedInvoice, setSelectedInvoice] = useState(null);
  const [deleteModal, setDeleteModal] = useState(false);
  const [openDetail, setOpenDetail] = useState(false);

  const getInvoices = () => {
    Inertia.visit(route('caselaw.invoice.index', caselaw), {
      method: 'get',
      only: ['invoices'],
      data: {
        page: pageNum,
      },
      preserveState: true,
      preserveScroll: true,
    });
  }
  useEffect(() => {
    if (inertia) {
      getInvoices();
    }
  }, [pageNum]);

  useEffect(() => {
    if (!inertia) {
      setInertia(true);
    }
  }, []);

  return (
    <Authenticated props={props} title={`INVOICE ${caselaw.code}`}>
      <CaselawTabs caselaw={caselaw} permissions={auth.permissions} />
      <InvoiceForm
        open={formOpen}
        caselaw={caselaw}
        invoice={selectedInvoice}
        onClose={() => {
          setFormOpen(false)
          setSelectedInvoice(null)
        }}
      />
      <InvoiceShow
        open={openDetail}
        onClose={() => {
          setOpenDetail(false);
          setSelectedInvoice(null);
        }}
        invoice={selectedInvoice}
      />
      <div className="bg-white overflow-x-visible shadow sm:rounded-lg divide-y divide-gray-200 mt-3">
        {
          auth.permissions.includes('create-invoice') && (
            <div className="px-4 py-5 sm:p-6">
              <div className='grid grid-cols-1 sm:grid-cols-6'>
                <div>
                  <Button type='button' onClick={() => setFormOpen(true)} processing={formOpen}>
                    <PlusIcon className='mr-1 h-4 w-4' />
                    Invoice
                  </Button>
                </div>
              </div>
            </div>
          )
        }
        <div className="px-4 py-5 sm:p-6">
          {
            invoices && invoices.data.length > 0 ? (
              <InvoiceTable
                invoices={invoices}
                onEdit={v => {
                  setSelectedInvoice(v)
                  setFormOpen(true);
                }}
                onDelete={v => {
                  setSelectedInvoice(v)
                  setDeleteModal(true)
                }}
                onShowDetail={v => {
                  setSelectedInvoice(v)
                  setOpenDetail(true)
                }}
                permissions={auth.permissions}
              />
            ) : (
              <EmptyState model="Invoice" />
            )
          }
        </div>
        {
          invoices && invoices.data.length > 0 && (
            <div className="px-4 py-4 sm:px-6">
              <Pagination
                meta={invoices.meta}
                onChangePage={(page) => setPageNum(page)}
              />
            </div>
          )
        }
      </div>
      <ConfirmationModal
        title="Konfirmasi hapus invoice"
        message="Yakin hapus invoice?"
        open={deleteModal}
        onCancel={() => {
          setSelectedInvoice(null)
          setDeleteModal(false)
        }}
        onConfirm={() =>
          Inertia.visit(`/invoice/${selectedInvoice.id}`, {
            method: "delete",
          })
        }
      />
    </Authenticated>
  );
}

export default Invoice;