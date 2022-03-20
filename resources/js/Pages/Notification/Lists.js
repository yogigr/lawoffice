import { BellIcon, CalculatorIcon, CalendarIcon, CheckCircleIcon, ClipboardListIcon, ClockIcon, MailIcon } from "@heroicons/react/outline";
import { Link } from "@inertiajs/inertia-react";
import React from "react";

const Lists = ({ notifications }) => {
  return (
    <ul role="list" className="divide-y divide-gray-200">
      {notifications.map((notification) => (
        <li
          key={notification.id}
          className="relative bg-white py-5 px-4 hover:bg-gray-50 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600"
        >
          <div className="flex justify-between space-x-3">
            <div className="min-w-0 flex-1">
              <div className="block focus:outline-none">
                <p
                  className={`flex items-center text-gray-500 truncate ${notification.is_unread ? "font-bold" : ""
                    }`}
                >
                  {
                    notification.type === 'App\\Notifications\\NewMessageCreated' ? (
                      <MailIcon className="h-5 w-5 mr-2 text-gray-500" />
                    ) : notification.type === 'App\\Notifications\\PleaseFollowUpNewCase' ? (
                      <ClipboardListIcon className="h-5 w-5 mr-2 text-gray-500" />
                    ) : notification.type === 'App\\Notifications\\NewInvoiceCreated' ? (
                      <CalculatorIcon className="h-5 w-5 mr-2 text-gray-500" />
                    ) : notification.type === 'App\\Notifications\\NewAppointmentCreated' ? (
                      <CalendarIcon className="h-5 w-5 mr-2 text-gray-500" />
                    ) : (
                      <BellIcon className="h-5 w-5 mr-2 text-gray-500" />
                    )
                  }

                  {notification.data.title}
                </p>
              </div>
            </div>
            <time
              dateTime={notification.created_at_formatted}
              className={`flex items-center whitespace-nowrap text-gray-500 ${notification.is_unread ? "font-bold" : ""
                }`}
            >
              <ClockIcon className="h-5 w-5 mr-2 text-gray-500" />
              {notification.created_at_human_read}
            </time>
          </div>
          <div className="mt-1">
            <p
              className={`text-sm line-clamp-2 text-gray-500 ${notification.is_unread ? "font-bold" : ""
                }`}
            >
              {notification.data.message}
            </p>
          </div>
          <div className="mt-2 flex justify-between items-center">
            {notification.data.action && (
              <Link
                className="text-indigo-600 hover:text-indigo-700 focus:text-indigo-700 text-sm"
                href={notification.data.action.link}
              >
                {notification.data.action.text}
              </Link>
            )}
            {notification.is_unread && (
              <Link
                className="text-indigo-600 hover:text-indigo-700 focus:text-indigo-700 text-sm"
                href={route("notification.mark_as_read", notification.id)}
                method="patch"
                as="button"
              >
                Mark as read
              </Link>
            )}
          </div>
        </li>
      ))}
    </ul>
  );
};

export default Lists;