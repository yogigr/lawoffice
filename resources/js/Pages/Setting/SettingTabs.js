import Tabs from '@/Components/Tabs';
import React from 'react';

const SettingTabs = () => {
  return (
    <Tabs
      tabs={
        [
          { 
            name: 'CONFIG', 
            href: route('config.index'), 
            current: route().current('config.index'),
            show: true 
          },
          { 
            name: 'COMPANY', 
            href: '#', 
            current: false, 
            show: true
          }
        ]
      }
    />
  )
}

export default SettingTabs;