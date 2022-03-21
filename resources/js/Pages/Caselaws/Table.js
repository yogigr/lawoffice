import CaselawStatusBadge from "@/Components/CaselawStatusBadge";
import Options from "@/Components/Options";
import { Menu } from "@headlessui/react";
import { Link } from "@inertiajs/inertia-react";
import React from "react";

const Table = ({ caselaws }) => {
  return (
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
                    Case Number
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Case Title
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Start Date
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Client
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Lawyers
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Status
                  </th>
                  <th scope="col" className="relative px-6 py-3">
                    <span className="sr-only">Edit</span>
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {
                  caselaws.data.map((caselaw) => (
                    <tr key={caselaw.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{caselaw.code}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{caselaw.title}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{caselaw.start_date_formatted}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-center">
                        <img
                          className="inline-block h-6 w-6 rounded-full"
                          src={caselaw.client.picture}
                          alt={caselaw.client.name}
                        />
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-center">
                        <div className="flex -space-x-1 relative z-0 overflow-hidden">
                          {
                            caselaw.lawyers.map((lawyer) => (
                              <img
                                key={lawyer.id}
                                className="relative z-30 inline-block h-6 w-6 rounded-full ring-2 ring-white"
                                src={lawyer.picture}
                                alt={lawyer.name}
                              />
                            ))
                          }
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <CaselawStatusBadge caselaw={caselaw} />
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <Options>
                          <Menu.Item>
                            <Link
                              href={route("caselaw.show", caselaw.id)}
                              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                            >
                              Detail
                            </Link>
                          </Menu.Item>
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
  );
};

export default Table;