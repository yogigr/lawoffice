import Button from '@/Components/Button';
import ConfirmationModal from '@/Components/ConfirmationModal';
import EmptyState from '@/Components/EmptyState';
import Pagination from '@/Components/Pagination';
import Authenticated from '@/Layouts/Authenticated';
import { Inertia } from '@inertiajs/inertia';
import React, { useState, useEffect, useRef } from 'react';
import CaselawTabs from './CaselawTabs';
import MessageForm from './MessageForm';
import MessageList from './MessageList';

const Message = (props) => {
  const { caselaw, messages, auth } = props;
  const { user } = props.auth;
  const isMounted = useRef(false);
  const [pageNum, setPageNum] = useState(1);
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [deleteModal, setDeleteModal] = useState(false);

  const getMessages = () => {
    Inertia.visit(route('caselaw.message.index', caselaw), {
      method: 'get',
      only: ['messages'],
      data: {
        page: pageNum,
      },
      preserveState: true,
      preserveScroll: true,
    });
  }
  useEffect(() => {
    if (isMounted.current) {
      getMessages();
    } else {
      isMounted.current = true;
    }
  }, [pageNum]);

  return (
    <Authenticated props={props} title={`MESSAGE ${caselaw.code}`}>
      <CaselawTabs caselaw={caselaw} permissions={auth.permissions} />
      <div className="bg-white overflow-x-visible shadow sm:rounded-lg divide-y divide-gray-200 mt-3">
        <div className="px-4 py-5 sm:p-6">
          {
            messages && messages.data.length > 0 ? (
              <MessageList 
                messages={messages}  
                onDelete={v => {
                  setSelectedMessage(v)
                  setDeleteModal(true)
                }}
                auth={auth}
              />
            ) : (
              <EmptyState model="Message" />
            )
          }
        </div>
        {
          messages && messages.data.length > 0 && (
            <div className="px-4 py-4 sm:px-6">
              <Pagination
                meta={messages.meta}
                onChangePage={(page) => setPageNum(page)}
              />
            </div>
          )
        }
        <div className='px-4 py-4 sm:px-6'>
          <MessageForm user={user} caselaw={caselaw} />
        </div>
      </div>
      <ConfirmationModal
        title="Konfirmasi hapus message"
        message="Yakin hapus message?"
        open={deleteModal}
        onCancel={() => {
          setSelectedMessage(null)
          setDeleteModal(false)
        }}
        onConfirm={() =>
          Inertia.visit(`/message/${selectedMessage.id}`, {
            method: "delete",
          })
        }
      />
    </Authenticated>
  );
}

export default Message;