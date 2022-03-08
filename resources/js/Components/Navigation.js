import React from 'react';
import {
  CalculatorIcon,
  CalendarIcon,
  ClipboardListIcon,
  CogIcon,
  HomeIcon,
  TagIcon,
  UsersIcon,
  ViewGridIcon,
} from "@heroicons/react/outline";
import { Link } from '@inertiajs/inertia-react';

const navigation = [
  { name: "Dashboard", href: "#", icon: HomeIcon, current: true },
  { name: "Cases", href: "#", icon: ClipboardListIcon, current: false },
  { name: "Appointments", href: "#", icon: CalendarIcon, current: false },
  { name: "Invoices", href: "#", icon: CalculatorIcon, current: false },
  { name: "Services", href: "#", icon: ViewGridIcon, current: false },
  { name: "Users", href: "#", icon: UsersIcon, current: false },
  { name: "Blogs", href: "#", icon: TagIcon, current: false },
  { name: "Settings", href: "#", icon: CogIcon, current: false },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const Navigation = ({ className, desktop = true}) => {
  return (
    <nav className={className}>
      {navigation.map((item) => (
        <Link
          key={item.name}
          href={item.href}
          className={classNames(
            item.current
              ? "bg-indigo-800 text-white"
              : "text-indigo-100 hover:bg-indigo-600",
            "group flex items-center px-2 py-2 text-base font-medium rounded-md"
          )}
        >
          <item.icon
            className={classNames(
              desktop ? 'mr-3' : 'mr-4',
              "flex-shrink-0 h-6 w-6 text-indigo-300"
            )}
            aria-hidden="true"
          />
          {item.name}
        </Link>
      ))}
    </nav>
  )
}

export default Navigation;