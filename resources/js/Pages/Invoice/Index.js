import EmptyState from '@/Components/EmptyState';
import Input from '@/Components/Input';
import Pagination from '@/Components/Pagination';
import Authenticated from '@/Layouts/Authenticated';
import { Inertia } from '@inertiajs/inertia';
import React, { useEffect, useState } from 'react';
import InvoiceShow from '../Invoice/InvoiceShow';
import InvoiceTable from './InvoiceTable';

const Index = (props) => {
  const { invoices, auth } = props;
  const [pageNum, setPageNum] = useState(1);
  const [code, setCode] = useState("");
  const [inertia, setInertia] = useState(props.inertia);
  const [selectedInvoice, setSelectedInvoice] = useState(null);

  const getInvoices = () => {
    Inertia.visit(route('invoice.index'), {
      method: 'get',
      only: ['invoices'],
      data: {
        page: pageNum,
        code: code,
      },
      preserveState: true,
      preserveScroll: true,
    });
  }
  useEffect(() => {
    if (inertia) {
      getInvoices();
    }
  }, [pageNum, code]);

  useEffect(() => {
    setPageNum(1);
  }, [code]);

  useEffect(() => {
    if (!inertia) {
      setInertia(true);
    }
  }, []);

  return (
    <Authenticated props={props} title="Invoices">
      <InvoiceShow
        open={selectedInvoice ? true : false}
        onClose={() => setSelectedInvoice(null)}
        invoice={selectedInvoice}
      />
      <div className="bg-white overflow-x-visible shadow sm:rounded-lg divide-y divide-gray-200 mt-3">
        <div className="px-4 py-5 sm:p-6">
          <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5'>
            <Input
              name="code"
              value={code}
              showlabel={false}
              placeholder="Cari nomor invoice"
              className="place-self-end"
              handleChange={e => setCode(e.target.value)}
            />
          </div>
        </div>
        <div className="px-4 py-5 sm:p-6">
          {
            invoices && invoices.data.length > 0 ? (
              <InvoiceTable
                invoices={invoices}
                editable={false}
                deleteable={false}
                showCase={true}
                onShowDetail={v => setSelectedInvoice(v)}
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
    </Authenticated>
  );
}

export default Index;