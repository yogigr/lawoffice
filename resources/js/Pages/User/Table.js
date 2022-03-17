import Avatar from "@/Components/Avatar";
import ConfirmationModal from "@/Components/ConfirmationModal";
import Options from "@/Components/Options";
import { Menu } from "@headlessui/react";
import { Inertia } from "@inertiajs/inertia";
import { Link } from "@inertiajs/inertia-react";
import React, { useState } from "react";

const Table = ({ users, permissions }) => {
  const [selectedUser, setSelectedUser] = useState(null);

  return (
    <>
    <div className="flex flex-col">
      <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
          <div className="shadow overflow-auto border-b border-gray-200 sm:rounded-lg">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    ID
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Name
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Role
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    gender
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Age
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Mobile
                  </th>
                  <th scope="col" className="relative px-6 py-3">
                    <span className="sr-only">Edit</span>
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {
                  users.data.map((user) => (
                    <tr key={user.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500">{user.id}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center space-x-2">
                          <Avatar
                            src={user.picture}
                            alt={user.name}
                          />
                          <div className="space-y-1">
                            <p className="text-sm text-gray-500">{user.name}</p>
                            <p className="text-xs text-gray-400">{user.email}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500">{user.role.name}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500">
                          {user.gender === 'm' ? 'Male' : user.gender === 'f' ? 'Female' : ''}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500">
                          {user.age}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500">
                          {user.mobile}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <Options>
                          <Menu.Item>
                            <Link
                              href={route("user.show", user)}
                              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                            >
                              Detail
                            </Link>
                          </Menu.Item>
                          {
                            permissions.includes('edit-user') && (
                              <Menu.Item>
                                <Link
                                  href={route("user.edit", user)}
                                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                >
                                  Edit
                                </Link>
                              </Menu.Item>
                            )
                          }
                          {
                            permissions.includes('delete-user') && (
                              <Menu.Item>
                                <button
                                  className="w-full block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 text-left"
                                  onClick={() => setSelectedUser(user)}
                                >
                                  Delete
                                </button>
                              </Menu.Item>
                            )
                          }
                        </Options>
                      </td>
                    </tr>
                  ))
                }
              </tbody>
            </table>
          </div>
        </div>
      </div >
    </div >
    <ConfirmationModal
      open={selectedUser ? true : false}
      title="Konfirmasi hapus user"
      message="Yakin hapus user?"
      onCancel={() => setSelectedUser(null)}
      onConfirm={() => {
        Inertia.visit(route('user.destroy', selectedUser), {
          method: 'delete'
        })
      }}
    />
    </>
    
  );
};

export default Table;