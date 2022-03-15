import React, { useState } from "react";
import Authenticated from "@/Layouts/Authenticated";
import { CalculatorIcon, CalendarIcon, ClipboardListIcon, UserCircleIcon, UsersIcon, ViewGridIcon } from "@heroicons/react/outline";
import Stats from "@/Components/Stats";
import AppointmentTable from "./AppointmentTable";
import InvoiceTable from "./InvoiceTable";
import AppointmentShow from "../Appointment/AppointmentShow";
import InvoiceShow from "../Invoice/InvoiceShow";

export default function Index(props) {
  const {
    auth,
    activeCaselawCount,
    nextAppointmentCount,
    unpaidInvoiceCount,
    activeClientCount,
    activeLawyerCount,
    todayAppointments,
    todayInvoices,
    serviceCount
  } = props;

  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [selectedInvoice, setSelectedInvoice] = useState(null);

  return (
    <Authenticated
      props={props}
      title="Dashboard"
    >
      <AppointmentShow
        open={selectedAppointment ? true : false}
        onClose={() => setSelectedAppointment(null)}
        appointment={selectedAppointment}
      />
      <InvoiceShow
        open={selectedInvoice ? true : false}
        onClose={() => setSelectedInvoice(null)}
        invoice={selectedInvoice}
      />
      <dl className="grid grid-cols-1 gap-5 lg:grid-cols-4">
        {
          auth.permissions.includes('view-caselaw') && (
            <Stats
              key={1}
              Icon={ClipboardListIcon}
              name="Active cases"
              stats={activeCaselawCount}
              href="/caselaw"
            />
          )
        }
        {
          auth.permissions.includes('view-appointment') && (
            <Stats
              key={2}
              Icon={CalendarIcon}
              name="Next appointment"
              stats={nextAppointmentCount}
              href="/appointment"
            />
          )
        }
        {
          auth.permissions.includes('view-invoice') && (
            <Stats
              key={3}
              Icon={CalculatorIcon}
              name="Unpaid invoices"
              stats={unpaidInvoiceCount}
              href="/invoice"
            />
          )
        }
        {
          auth.permissions.includes('view-user') && (
            <Stats
              key={4}
              Icon={UsersIcon}
              name="Active clients"
              stats={activeClientCount}
              href="/user"
            />
          )
        }

        {
          auth.permissions.includes('view-appointment') && (
            <AppointmentTable
              appointments={todayAppointments}
              onOpenDetail={v => setSelectedAppointment(v)}
            />
          )
        }

        {
          auth.permissions.includes('view-invoice') && (
            <InvoiceTable
              invoices={todayInvoices}
              onOpenDetail={v => setSelectedInvoice(v)}
            />
          )
        }

        <div>
          {
            auth.permissions.includes('view-user') && (
              <Stats
                Icon={UserCircleIcon}
                name="Active lawyers"
                stats={activeLawyerCount}
                href="/user"
              />
            )
          }
          {
            auth.permissions.includes('view-service') && (
              <div className="mt-5">
                <Stats
                  Icon={ViewGridIcon}
                  name="Active Services"
                  stats={serviceCount}
                  href="/service"
                />
              </div>
            )
          }
        </div>
      </dl>
    </Authenticated>
  );
}
