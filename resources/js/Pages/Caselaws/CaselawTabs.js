import Tabs from '@/Components/Tabs';
import React from 'react';

const CaselawTabs = ({ caselaw, permissions = [] }) => {
  return (
    <Tabs
      tabs={
        [
          { 
            name: 'DETAIL', 
            href: route('caselaw.show', caselaw), 
            current: route().current('caselaw.show', caselaw),
            show: permissions.includes('view-caselaw') 
          },
          { 
            name: 'LAWYER', 
            href: route('caselaw.lawyer.index', caselaw), 
            current: route().current('caselaw.lawyer.index', caselaw), 
            show: permissions.includes('view-lawyer')
          },
          { 
            name: 'APPOINTMENT', 
            href: route('caselaw.appointment.index', caselaw), 
            current: route().current('caselaw.appointment.index', caselaw),
            show: permissions.includes('view-appointment')
          },
          { 
            name: 'INVOICE', 
            href: route('caselaw.invoice.index', caselaw), 
            current: route().current('caselaw.invoice.index', caselaw),
            show: permissions.includes('view-invoice')
          },
          { 
            name: 'MESSAGE', 
            href: route('caselaw.message.index', caselaw), 
            current: route().current('caselaw.message.index', caselaw),
            show: permissions.includes('view-message')
          },
          { 
            name: 'DOCUMENT', 
            href: route('caselaw.document.index', caselaw), 
            current: route().current('caselaw.document.index', caselaw),
            show: permissions.includes('view-document')
          },
        ]
      }
    />
  )
}

export default CaselawTabs;