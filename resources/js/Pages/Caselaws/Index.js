import EmptyState from '@/Components/EmptyState';
import Input from '@/Components/Input';
import Pagination from '@/Components/Pagination';
import Select from '@/Components/Select';
import Authenticated from '@/Layouts/Authenticated';
import { PlusIcon } from '@heroicons/react/outline';
import { Inertia } from '@inertiajs/inertia';
import { Link } from '@inertiajs/inertia-react';
import React, { useEffect, useState } from 'react';
import Table from './Table';

const Index = (props) => {
  const { statuses, services, caselaws } = props;
  const [pageNum, setPageNum] = useState(1);
  const [statusId, setStatusId] = useState("");
  const [serviceId, setServiceId] = useState("");
  const [code, setCode] = useState("");
  const [inertia, setInertia] = useState(props.inertia);

  const getCaselaws = () => {
    Inertia.visit(route('caselaw.index'), {
      method: 'get',
      only: ['caselaws'],
      data: {
        status_id: statusId,
        service_id: serviceId,
        code: code,
        page: pageNum,
      },
      preserveState: true,
      preserveScroll: true,
    });
  }

  useEffect(() => {
    if (inertia) {
      getCaselaws();
    }
  }, [pageNum, statusId, serviceId, code]);

  useEffect(() => {
    setPageNum(1);
  }, [statusId, serviceId, code]);

  useEffect(() => {
    if (!inertia) {
      setInertia(true);
    }
  }, []);

  return (
    <Authenticated props={props} title="Cases">
      <div className="bg-white overflow-x-visible shadow sm:rounded-lg divide-y divide-gray-200">
        <div className="px-4 py-5 sm:p-6">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
            <div>
              <Link
                href={route("caselaw.create")}
                className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <PlusIcon
                  className="-ml-0.5 mr-2 h-4 w-4"
                  aria-hidden="true"
                />
                Case
              </Link>
            </div>
            <div className="flex flex-col sm:flex-row sm:items-center">
              <div className="mt-2 sm:mt-0 sm:mr-2">
                <Select
                  options={statuses}
                  label="Status"
                  className="w-full"
                  selected={statusId}
                  onChange={(v) => setStatusId(v)}
                />
              </div>
              <div className="mt-2 sm:mt-0 sm:mr-2">
                <Select
                  options={services}
                  label="Service"
                  className="w-full"
                  selected={serviceId}
                  onChange={(v) => setServiceId(v)}
                />
              </div>
              <div className="mt-2 sm:mt-0">
                <Input
                  label="Pencarian"
                  value={code}
                  handleChange={(e) => setCode(e.target.value)}
                  placeholder="Cari kode case"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="px-4 py-5 sm:p-6">
          {
            caselaws && caselaws.data.length > 0 ? (
              <Table caselaws={caselaws} />
            ) : (
              <EmptyState model="Case" />
            )
          }
        </div>
        {
          caselaws && caselaws.data.length > 0 && (
            <div className="px-4 py-4 sm:px-6">
              <Pagination
                meta={caselaws.meta}
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