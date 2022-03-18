import { Menu, Transition } from '@headlessui/react';
import { Link } from '@inertiajs/inertia-react';
import React, { Fragment } from 'react';

const userNavigation = [
  { name: "Profile", href: route('profile.index'), method: "get", as: "button", link: true },
  { name: "Sign out", href: route("logout"), method: "post", as: "button", link: false },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const UserNavigation = ({ csrf_token }) => {
  return (
    <Transition
      as={Fragment}
      enter="transition ease-out duration-100"
      enterFrom="transform opacity-0 scale-95"
      enterTo="transform opacity-100 scale-100"
      leave="transition ease-in duration-75"
      leaveFrom="transform opacity-100 scale-100"
      leaveTo="transform opacity-0 scale-95"
    >
      <Menu.Items className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
        {userNavigation.map((item) => (
          <Menu.Item key={item.name}>
            {({ active }) => (
              item.link ? (
                <Link
                  href={item.href}
                  method={item.method}
                  as={item.as}
                  className={classNames(
                    active
                      ? "bg-gray-100"
                      : "",
                    "w-full text-left block px-4 py-2 text-sm text-gray-700"
                  )}
                >
                  {item.name}
                </Link>
              ) : (
                <form action={item.href} method={item.method}>
                  <input type="hidden" name="_token" value={csrf_token} />
                  <button
                    type="submit"
                    className={classNames(
                      active
                        ? "bg-gray-100"
                        : "",
                      "w-full text-left block px-4 py-2 text-sm text-gray-700"
                    )}
                  >
                    {item.name}
                  </button>
                </form>
              )
            )}
          </Menu.Item>
        ))}
      </Menu.Items>
    </Transition>

  )
}

export default UserNavigation;