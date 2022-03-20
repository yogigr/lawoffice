import EmptyState from '@/Components/EmptyState';
import Pagination from '@/Components/Pagination';
import Authenticated from '@/Layouts/Authenticated';
import { Inertia } from '@inertiajs/inertia';
import { Link } from '@inertiajs/inertia-react';
import React from 'react';
import Lists from './Lists';

const Index = (props) => {
  const { notifications } = props;
  const getNotifications = (page) => {
    Inertia.visit(route("notification.index"), {
      method: "get",
      only: ["notifications"],
      data: {
        page: page,
      },
      preserveState: true,
      preserveScroll: true,
    });
  };
  return (
    <Authenticated props={props} title="Notification">
      <div className="bg-white overflow-x-visible shadow sm:rounded-lg divide-y divide-gray-200">
        <div className="px-4 py-5 sm:p-6">
          <div className='grid grid-cols-1 gap-y-2 sm:grid-cols-4 md:grid-cols-6 sm:gap-x-2'>
            <div>
              <Link
                className="w-full bg-indigo-600 hover:bg-indigo-700 focus:bg-indigo-700 
                focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600
                text-white px-3 py-2 rounded-md"
                href={route('notification.mark_all_as_read')}
                method="patch"
                as="button"
              >
                Mark all as read
              </Link>
            </div>
            <div>
              <Link
                className="w-full bg-indigo-50 hover:bg-indigo-100 focus:bg-indigo-100 
                focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600
                text-indigo-600 px-3 py-2 rounded-md"
                href={route('notification.destroy')}
                method="delete"
                as="button"
              >
                Delete all
              </Link>
            </div>
          </div>
        </div>
        <div className="px-4 py-5 sm:p-6">
          {notifications && notifications.data.length > 0 ? (
            <Lists notifications={notifications.data} />
          ) : (
            <EmptyState model="Notification" />
          )}
        </div>
        {notifications && notifications.data.length > 0 && (
          <div className="px-4 py-4 sm:px-6">
            <Pagination
              meta={notifications.meta}
              onChangePage={(page) => getNotifications(page)}
            />
          </div>
        )}
      </div>
    </Authenticated>
  )
}

export default Index;