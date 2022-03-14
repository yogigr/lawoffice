import React from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/solid";
import { getPageNumber } from "@/utils/helper";

const Pagination = ({ meta, onChangePage }) => {
  return (
    <div className="sm:flex-1 sm:flex sm:items-center sm:justify-between overflow-x-auto">
      <div>
        <p className="text-sm text-gray-700">
          Showing <span className="font-medium">{meta.from}</span> to{" "}
          <span className="font-medium">{meta.to}</span> of{" "}
          <span className="font-medium">{meta.total}</span> results
        </p>
      </div>
      <div>
        <nav
          className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px"
          aria-label="Pagination"
        >
          {meta.links.map((link, index) => {
            const label =
              link.label === "&laquo; Previous" ? (
                <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
              ) : link.label === "Next &raquo;" ? (
                <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
              ) : (
                link.label
              );
            if (link.url) {
              return (
                <button
                  key={index}
                  type="button"
                  onClick={() => onChangePage(getPageNumber(link.url))}
                  className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium 
                    ${link.active
                      ? "z-10 bg-indigo-600 border-indigo-800 text-white"
                      : "bg-white border-gray-300 text-gray-500 hover:bg-gray-50"
                    }`}
                >
                  {label}
                </button>
              );
            }
            return (
              <span
                key={index}
                className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700"
              >
                {label}
              </span>
            );
          })}
        </nav>
      </div>
    </div>
  );
};

export default Pagination;