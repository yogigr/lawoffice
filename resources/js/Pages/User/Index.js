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
  const { auth, roles, users } = props;
  const isMounted = useRef(false);
  const [params, setParams] = useState({
    role_id: '',
    search: '',
    page: 1
  });
  const handleChangeParams = (key, value) => {
    setParams({
      ...params,
      [key]: value,
      page: key === 'role_id' || key === 'search' ? 1 : value
    })
  }
  const getUsers = () => {
    Inertia.visit(route('user.index'), {
      method: 'get',
      only: ['users'],
      data: params,
      preserveState: true,
      preserveScroll: true,
    })
  }
  useEffect(() => {
    if (isMounted.current) {
      getUsers();
    } else {
      isMounted.current = true;
    }
  }, [params]);

  return (
    <Authenticated props={props} title="User">
      <div className="bg-white overflow-x-visible shadow sm:rounded-lg divide-y divide-gray-200">
        <div className="px-4 py-5 sm:p-6">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
            <div>
              {
                auth.permissions.includes('create-user') && (
                  <Link
                    href={route("user.create")}
                    className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-gray-900 hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900"
                  >
                    <PlusIcon
                      className="-ml-0.5 mr-2 h-4 w-4"
                      aria-hidden="true"
                    />
                    User
                  </Link>
                )
              }
            </div>
            <div className="flex flex-col sm:flex-row sm:items-center">
              <div className="mt-2 sm:mt-0 sm:mr-2">
                <Select
                  options={roles}
                  label="Role"
                  className="w-full"
                  selected={params.role_id}
                  onChange={(v) => handleChangeParams('role_id', v)}
                />
              </div>
              <div className="mt-2 sm:mt-0">
                <Input
                  label="Pencarian"
                  value={params.search}
                  handleChange={(e) => handleChangeParams('search', e.target.value)}
                  placeholder="Cari user"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="px-4 py-5 sm:p-6">
          {
            users && users.data.length > 0 ? (
              <Table users={users} permissions={auth.permissions} />
            ) : (
              <EmptyState model="User" />
            )
          }
        </div>
        {
          users && users.data.length > 0 && (
            <div className="px-4 py-4 sm:px-6">
              <Pagination
                meta={users.meta}
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