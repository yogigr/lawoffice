import { Link } from '@inertiajs/inertia-react';
import React from 'react';

const Stats = ({ Icon, name, stats, href }) => (
  <div className="relative bg-white pt-5 px-4 pb-12 sm:pt-6 sm:px-6 shadow rounded-lg overflow-hidden"
  >
    <dt>
      <div className="absolute bg-gray-900 rounded-md p-3">
        <Icon className="h-6 w-6 text-white" aria-hidden="true" />
      </div>
      <p className="ml-16 text-sm font-medium text-gray-500 truncate">{name}</p>
    </dt>
    <dd className="ml-16 pb-6 flex items-baseline sm:pb-7">
      <p className="text-2xl font-semibold text-gray-900">{stats}</p>
      <div className="absolute bottom-0 inset-x-0 bg-gray-50 px-4 py-4 sm:px-6">
        <div className="text-sm">
          <Link href={href} className="font-medium text-primary-600 hover:text-primary-500">
            {' '}
            View all<span className="sr-only"> {name} stats</span>
          </Link>
        </div>
      </div>
    </dd>
  </div>
);

export default Stats;