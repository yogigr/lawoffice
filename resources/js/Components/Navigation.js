import React from 'react';
import {
  CalculatorIcon,
  CalendarIcon,
  ChatIcon,
  ClipboardListIcon,
  CogIcon,
  HomeIcon,
  TagIcon,
  UsersIcon,
  ViewGridIcon,
} from "@heroicons/react/outline";
import { Link } from '@inertiajs/inertia-react';

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const Navigation = ({ className, permissions, roleId, desktop = true }) => {
  const navigation = [
    {
      name: "Dashboard",
      href: route('dashboard'),
      icon: HomeIcon,
      current: route().current('dashboard'),
      show: true,
    },
    {
      name: "Konsultasi",
      href: route('consultation.create'),
      icon: ChatIcon,
      current: route().current('consultation.create'),
      show: permissions.includes('create-consultation') && roleId === 3,
    },
    {
      name: "Cases",
      href: route('caselaw.index'),
      icon: ClipboardListIcon,
      current: route().current('caselaw.index') || route().current('caselaw.show')
        || route().current('caselaw.create') || route().current('caselaw.edit')
        || route().current('caselaw.lawyer.index') || route().current('caselaw.appointment.index')
        || route().current('caselaw.invoice.index') || route().current('caselaw.message.index')
        || route().current('caselaw.document.index'),
      show: permissions.includes('view-caselaw')
    },
    {
      name: "Appointments",
      href: route('appointment.index'),
      icon: CalendarIcon,
      current: route().current('appointment.index'),
      show: permissions.includes('view-appointment')
    },
    {
      name: "Invoices",
      href: route('invoice.index'),
      icon: CalculatorIcon,
      current: route().current('invoice.index'),
      show: permissions.includes('view-invoice')
    },
    {
      name: "Services",
      href: route('service.index'),
      icon: ViewGridIcon,
      current: route().current('service.index') || route().current('service.create') || route().current('service.edit'),
      show: permissions.includes('view-service')
    },
    {
      name: "Users",
      href: route('user.index'),
      icon: UsersIcon,
      current: route().current('user.index') || route().current('user.show')
        || route().current('user.create') || route().current('user.edit')
        || route().current('user.address'),
      show: permissions.includes('view-user')
    },
    {
      name: "Blogs",
      href: "#",
      icon: TagIcon,
      current: false,
      show: permissions.includes('view-blog')
    },
    {
      name: "Settings",
      href: route('company.index'),
      icon: CogIcon,
      current: route().current('config.index') || route().current('company.index')
          || route().current('bank.index') || route().current('bank.create')
          || route().current('bank.edit'),
      show: permissions.includes('view-setting')
    },
  ];
  return (
    <nav className={className}>
      {navigation.map((item) => (
        item.show && (
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
        )

      ))}
    </nav>
  )
}

export default Navigation;