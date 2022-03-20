import ConfirmationModal from "@/Components/ConfirmationModal";
import Options from "@/Components/Options";
import { Menu } from "@headlessui/react";
import { Inertia } from "@inertiajs/inertia";
import { Link } from "@inertiajs/inertia-react";
import React, { useState } from "react";

const Table = ({ services, permissions }) => {
  const [selectedService, setSelectedService] = useState(null);

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
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-"
                    >
                      Desc
                    </th>
                    <th scope="col" className="w-1/4 relative px-6 py-3">
                      <span className="sr-only">Edit</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {
                    services.data.map((service) => (
                      <tr key={service.id}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-500">{service.id}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-500">{service.name}</div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm text-gray-500">{service.description}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <Options>
                            {
                              permissions.includes('edit-service') && (
                                <Menu.Item>
                                  <Link
                                    href={route("service.edit", service)}
                                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                  >
                                    Edit
                                  </Link>
                                </Menu.Item>
                              )
                            }
                            {
                              permissions.includes('delete-service') && (
                                <Menu.Item>
                                  <button
                                    className="w-full block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 text-left"
                                    onClick={() => setSelectedService(service)}
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
        open={selectedService ? true : false}
        title="Konfirmasi hapus service"
        message="Yakin hapus service?"
        onCancel={() => setSelectedService(null)}
        onConfirm={() => {
          Inertia.visit(route('service.destroy', selectedService), {
            method: 'delete'
          })
        }}
      />
    </>
  );
};

export default Table;