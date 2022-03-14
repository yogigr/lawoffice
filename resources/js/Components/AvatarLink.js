import { Link } from '@inertiajs/inertia-react';
import React from 'react';

const AvatarLink = ({ avatar, name, href, withName = true }) => {
  return (
    <Link href={href} className="flex items-center">
      <img
        className="inline-block h-6 w-6 rounded-full"
        src={avatar}
        alt={name}
      />
      {
        withName && (
          <span className='ml-1'>{name}</span>
        )
      }
    </Link>
  );
}

export default AvatarLink;