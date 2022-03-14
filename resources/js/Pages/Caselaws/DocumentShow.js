import CircularButton from '@/Components/CircularButton';
import DescriptionList from '@/Components/DescriptionList';
import SlideOver from '@/Components/SlideOver';
import { DocumentIcon, DownloadIcon } from '@heroicons/react/outline';
import React from 'react';

const DocumentShow = ({
  open,
  document,
  onClose
}) => {
  return (
    <SlideOver
      open={open}
      onClose={onClose}
      title="Document Detail"
    >
      {
        document && (
          <DescriptionList
            title={document.code}
            lists={[
              {
                label: 'Kode dokumen',
                value: document.code
              },
              {
                label: 'Judul dokumen',
                value: document.title
              },
              {
                label: 'Deskripsi dokumen',
                value: document.desc
              },
              {
                label: 'Filename',
                value: (
                  <div className='flex items-center text-indigo-600'>
                    <DocumentIcon className='h-4 w-4 mr-1' />
                    {document.filename}
                  </div>
                )
              },
              {
                label: '',
                value: (
                  <CircularButton
                    className='bg-gray-100 hover:bg-gray-200 focus:ring-gray-200'
                    onClick={() => {
                      window.open(route('document.download', document))
                    }}
                  >
                    <DownloadIcon className='h-4 w-4' />
                  </CircularButton>
                )
              }
            ]}
          />
        )
      }

    </SlideOver>
  )
}

export default DocumentShow;