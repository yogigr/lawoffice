import ConfirmationModal from "@/Components/ConfirmationModal";
import Options from "@/Components/Options";
import { Menu } from "@headlessui/react";
import { Inertia } from "@inertiajs/inertia";
import { Link } from "@inertiajs/inertia-react";
import React, { useState } from "react";

const Table = ({ banks, permissions }) => {
  const [selectedBank, setSelectedBank] = useState(null);

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
                    ></th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Nama bank
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-"
                    >
                      No Rek
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-"
                    >
                      ATAS NAMA
                    </th>
                    <th scope="col" className="w-1/4 relative px-6 py-3">
                      <span className="sr-only">Edit</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {
                    banks.map((bank, index) => (
                      <tr key={index}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-500">{index + 1}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-500">{bank.name}</div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm text-gray-500">{bank.number}</div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm text-gray-500">{bank.owner}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <Options>
                            {
                              permissions.includes('edit-setting') && (
                                <Menu.Item>
                                  <Link
                                    href={route("bank.edit", bank)}
                                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                  >
                                    Edit
                                  </Link>
                                </Menu.Item>
                              )
                            }
                            {
                              permissions.includes('edit-setting') && (
                                <Menu.Item>
                                  <button
                                    className="w-full block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 text-left"
                                    onClick={() => setSelectedBank(bank)}
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
        open={selectedBank ? true : false}
        title="Konfirmasi hapus bank"
        message="Yakin hapus bank?"
        onCancel={() => setSelectedBank(null)}
        onConfirm={() => {
          Inertia.visit(route('bank.destroy', selectedBank), {
            method: 'delete'
          })
        }}
      />
    </>
  );
};

export default Table;