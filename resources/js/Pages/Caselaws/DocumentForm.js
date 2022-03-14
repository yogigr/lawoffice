import FileInput from '@/Components/FileInput';
import Input from '@/Components/Input';
import SlideForm from '@/Components/SlideForm';
import Textarea from '@/Components/Textarea';
import { useForm } from '@inertiajs/inertia-react';
import React, { useEffect } from 'react';

const DocumentForm = ({
  open,
  caselaw,
  user,
  document,
  onClose
}) => {
  const { data, setData, post, processing, reset, errors } = useForm({
    _method: 'POST',
    document_id: '',
    caselaw_id: caselaw.id,
    user_id: user.id,
    title: '',
    desc: '',
    fileupload: null
  });

  const submit = (e) => {
    e.preventDefault();
    const url = document ? `/document/${document.id}` : "/document";
    post(url, {
      onSuccess: () => reset()
    })
    onClose()
  }

  useEffect(() => {
    return () => {
      reset()
    };
  }, []);

  useEffect(() => {
    if (document) {
      setData((data) => (
        {
          ...data,
          _method: 'PATCH',
          document_id: document.id,
          title: document.title,
          desc: document.desc,
        }))
    } else {
      reset()
    }
  }, [document]);
  return (
    <SlideForm
      open={open}
      title="Document Form"
      onClose={onClose}
      onSubmit={submit}
      submitText={document ? "Update" : "Save"}
    >
      <div>
        <FileInput
          label="Upload file dokumen"
          id='filename'
          name='filename'
          info="Maksimal 1MB"
          value={data.fileupload}
          multiple={false}
          handleChange={(e) => setData('fileupload', e.target.files[0])}
          handleReset={() => setData('fileupload', null)}
        />
      </div>
      <div className='mt-3'>
        <Input
          type='text'
          name="title"
          value={data.title}
          label='Judul Dokumen'
          placeholder='Judul Dokumen'
          handleChange={(e) => setData('title', e.target.value)}
        />
      </div>
      <div className='mt-3'>
        <Textarea
          name="desc"
          label='Deskripsi dokumen'
          value={data.desc}
          handleChange={e => setData('desc', e.target.value)}
        />
      </div>
    </SlideForm>
  )
}

export default DocumentForm;