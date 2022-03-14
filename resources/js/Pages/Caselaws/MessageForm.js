import Avatar from '@/Components/Avatar';
import Button from '@/Components/Button';
import Textarea from '@/Components/Textarea';
import { useForm } from '@inertiajs/inertia-react';
import React, { useEffect } from 'react';

const MessageForm = ({ caselaw, user }) => {
  const { data, setData, post, processing, reset, errors } = useForm({
    user_id: user.id,
    caselaw_id: caselaw.id,
    text: ''
  });
  const submit = (e) => {
    e.preventDefault();
    post(`/message`, {
      onSuccess: () => reset()
    });
  }
  useEffect(() => {
    return () => {
      reset()
    };
  }, []);
  return (
    <form onSubmit={submit} className=''>
      <div className='flex items-center'>
        <div className='hidden sm:block sm:mr-2'>
          <Avatar src={user.picture} alt={user.name} />
        </div>
        <div className='w-full'>
          <Textarea
            name="text"
            value={data.text}
            placeholder="Text message"
            showLabel={false}
            handleChange={e => setData('text', e.target.value)}
          />
        </div>
      </div>
      <div className='mt-2 flex justify-center sm:justify-end'>
        <div className='w-1/2 sm:w-1/6'>
          <Button processing={processing}>
            Send
          </Button>
        </div>
      </div>
    </form>
  )
}

export default MessageForm;