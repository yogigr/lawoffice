import EmptyState from '@/Components/EmptyState';
import Authenticated from '@/Layouts/Authenticated';
import { PlusIcon } from '@heroicons/react/outline';
import { Inertia } from '@inertiajs/inertia';
import { Link } from '@inertiajs/inertia-react';
import React, { useEffect, useRef, useState } from 'react';
import SettingTabs from '../Setting/SettingTabs';
import Table from './Table';

const Index = (props) => {
  const { auth, banks } = props;

  return (
    <Authenticated props={props} title="Bank setting">
      <SettingTabs />
      <div className="bg-white overflow-x-visible shadow sm:rounded-lg divide-y divide-gray-200 mt-3">
        <div className="px-4 py-5 sm:p-6">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
            <div>
              {
                auth.permissions.includes('edit-setting') && (
                  <Link
                    href={route("bank.create")}
                    className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-gray-900 hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900"
                  >
                    <PlusIcon
                      className="-ml-0.5 mr-2 h-4 w-4"
                      aria-hidden="true"
                    />
                    Bank
                  </Link>
                )
              }
            </div>
          </div>
        </div>
        <div className="px-4 py-5 sm:p-6">
          {
            banks.length > 0 ? (
              <Table banks={banks} permissions={auth.permissions} />
            ) : (
              <EmptyState model="Bank" />
            )
          }
        </div>
      </div>
    </Authenticated>
  )
}

export default Index;