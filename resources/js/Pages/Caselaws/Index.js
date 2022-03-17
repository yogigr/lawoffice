import EmptyState from '@/Components/EmptyState';
import Input from '@/Components/Input';
import Pagination from '@/Components/Pagination';
import Select from '@/Components/Select';
import Authenticated from '@/Layouts/Authenticated';
import { PlusIcon } from '@heroicons/react/outline';
import { Inertia } from '@inertiajs/inertia';
import { Link } from '@inertiajs/inertia-react';
import React, { useEffect, useRef, useState } from 'react';
import Table from './Table';

const Index = (props) => {
  const { statuses, services, caselaws, auth } = props;
  const isMounted = useRef(false);
  const [params, setParams] = useState({
    status_id: '',
    service_id: '',
    code: '',
    page: 1,
  });

  const handleChangeParams = (key, value) => {
    setParams({
      ...params,
      [key]: value,
      page: key == 'page' ? value : 1
    })
  }

  const getCaselaws = () => {
    Inertia.visit(route('caselaw.index'), {
      method: 'get',
      only: ['caselaws'],
      data: params,
      preserveState: true,
      preserveScroll: true,
    });
  }

  useEffect(() => {
    if (isMounted.current) {
      getCaselaws();
    } else {
      isMounted.current = true;
    }
  }, [params]);

  return (
    <Authenticated props={props} title="Cases">
      <div className="bg-white overflow-x-visible shadow sm:rounded-lg divide-y divide-gray-200">
        <div className="px-4 py-5 sm:p-6">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
            <div>
              {
                auth.permissions.includes('create-caselaw') && (
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
                )
              }

            </div>
            <div className="flex flex-col sm:flex-row sm:items-center">
              <div className="mt-2 sm:mt-0 sm:mr-2">
                <Select
                  options={statuses}
                  label="Status"
                  className="w-full"
                  selected={params.status_id}
                  onChange={(v) => handleChangeParams('status_id', v)}
                />
              </div>
              <div className="mt-2 sm:mt-0 sm:mr-2">
                <Select
                  options={services}
                  label="Service"
                  className="w-full"
                  selected={params.service_id}
                  onChange={(v) => handleChangeParams('service_id', v)}
                />
              </div>
              <div className="mt-2 sm:mt-0">
                <Input
                  label="Pencarian"
                  value={params.code}
                  handleChange={(e) => handleChangeParams('code', e.target.value)}
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
                onChangePage={(page) => handleChangeParams('page', page)}
              />
            </div>
          )
        }
      </div>
    </Authenticated>
  );
}

export default Index;