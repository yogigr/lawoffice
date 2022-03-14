import Tabs from '@/Components/Tabs';
import React from 'react';

const CaselawTabs = ({ caselaw }) => {
  return (
    <Tabs
      tabs={
        [
          { name: 'DETAIL', href: route('caselaw.show', caselaw), current: route().current('caselaw.show', caselaw) },
          { name: 'LAWYER', href: route('caselaw.lawyer.index', caselaw), current: route().current('caselaw.lawyer.index', caselaw) },
          { name: 'APPOINTMENT', href: route('caselaw.appointment.index', caselaw), current: route().current('caselaw.appointment.index', caselaw) },
          { name: 'INVOICE', href: route('caselaw.invoice.index', caselaw), current: route().current('caselaw.invoice.index', caselaw) },
          { name: 'MESSAGE', href: route('caselaw.message.index', caselaw), current: route().current('caselaw.message.index', caselaw) },
          { name: 'DOCUMENT', href: route('caselaw.document.index', caselaw), current: route().current('caselaw.document.index', caselaw) },
        ]
      }
    />
  )
}

export default CaselawTabs;