import React from "react";

const CaselawStatusBadge = ({ caselaw }) => {
  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 ${caselaw.status_id === 1
          ? "text-yellow-600"
          : caselaw.status_id === 2
            ? "text-green-600"
            : caselaw.status_id === 3
              ? "text-yellow-600"
              : caselaw.status_id === 4
                ? "text-yellow-600"
                : "text-red-600"
        }`}
    >
      {caselaw.status.name}
    </span>
  );
};

export default CaselawStatusBadge;
