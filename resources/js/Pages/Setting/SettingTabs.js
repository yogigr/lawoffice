import Tabs from '@/Components/Tabs';
import React from 'react';

const SettingTabs = () => {
  return (
    <Tabs
      tabs={
        [
          {
            name: 'COMPANY',
            href: route('company.index'),
            current: route().current('company.index'),
            show: true
          },
          {
            name: 'BANK',
            href: route('bank.index'),
            current: route().current('bank.index') || route().current('bank.create') || route().current('bank.edit'),
            show: true
          },
          {
            name: 'SYSTEM',
            href: route('config.index'),
            current: route().current('config.index'),
            show: true
          }
        ]
      }
    />
  )
}

export default SettingTabs;