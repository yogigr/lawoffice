import EmptyState from '@/Components/EmptyState';
import Input from '@/Components/Input';
import Pagination from '@/Components/Pagination';
import Authenticated from '@/Layouts/Authenticated';
import { PlusIcon } from '@heroicons/react/outline';
import { Inertia } from '@inertiajs/inertia';
import { Link } from '@inertiajs/inertia-react';
import React, { useEffect, useRef, useState } from 'react';
import Table from './Table';

const Index = (props) => {
  const { auth, services } = props;
  const isMounted = useRef(false);
  const [params, setParams] = useState({
    search: '',
    page: 1
  });
  const handleChangeParams = (key, value) => {
    setParams({
      ...params,
      [key]: value,
      page: key !== 'page' ? 1 : value
    })
  }
  const getServices = () => {
    Inertia.visit(route('service.index'), {
      method: 'get',
      only: ['services'],
      data: params,
      preserveState: true,
      preserveScroll: true,
    })
  }
  useEffect(() => {
    if (isMounted.current) {
      getServices();
    } else {
      isMounted.current = true;
    }
  }, [params]);

  return (
    <Authenticated props={props} title="Service">
      <div className="bg-white overflow-x-visible shadow sm:rounded-lg divide-y divide-gray-200">
        <div className="px-4 py-5 sm:p-6">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
            <div>
              {
                auth.permissions.includes('create-service') && (
                  <Link
                    href={route("service.create")}
                    className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-gray-900 hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900"
                  >
                    <PlusIcon
                      className="-ml-0.5 mr-2 h-4 w-4"
                      aria-hidden="true"
                    />
                    Service
                  </Link>
                )
              }
            </div>
            <div className="flex flex-col sm:flex-row sm:items-center">
              <div className="mt-2 sm:mt-0">
                <Input
                  label="Pencarian"
                  value={params.search}
                  handleChange={(e) => handleChangeParams('search', e.target.value)}
                  placeholder="Cari service"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="px-4 py-5 sm:p-6">
          {
            services && services.data.length > 0 ? (
              <Table services={services} permissions={auth.permissions} />
            ) : (
              <EmptyState model="Service" />
            )
          }
        </div>
        {
          services && services.data.length > 0 && (
            <div className="px-4 py-4 sm:px-6">
              <Pagination
                meta={services}
                onChangePage={(page) => handleChangeParams('page', page)}
              />
            </div>
          )
        }
      </div>
    </Authenticated>
  )
}

export default Index;