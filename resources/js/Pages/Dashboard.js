import React from "react";
import Authenticated from "@/Layouts/Authenticated";

export default function Dashboard(props) {
  return (
    <Authenticated
      props={props}
      title="Dashboard"
    >
      <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
        <div className="p-6 bg-white border-b border-gray-200">
          You're logged in!
        </div>
      </div>
    </Authenticated>
  );
}
