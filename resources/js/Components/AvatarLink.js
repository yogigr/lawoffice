import { Link } from '@inertiajs/inertia-react';
import React from 'react';

const AvatarLink = ({ avatar, name = null, email = null, href }) => {
  return (
    <Link href={href} className="flex items-center">
      <img
        className="inline-block h-6 w-6 rounded-full"
        src={avatar}
        alt={name}
      />

      {
        name && (
          <div className='ml-1'>
            <p className='text-gray-900'>{name}</p>
            {
              email && (
                <p className='text-gray-500 text-xs'>{email}</p>
              )
            }
          </div>
        )
      }
    </Link>
  );
}

export default AvatarLink;