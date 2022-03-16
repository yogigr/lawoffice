import Button from '@/Components/Button';
import Input from '@/Components/Input';
import Textarea from '@/Components/Textarea';
import Authenticated from '@/Layouts/Authenticated';
import { useForm } from '@inertiajs/inertia-react';
import React, { useEffect } from 'react';

const Create = (props) => {

  const { captcha_question, auth } = props;

  let formData = {
    _method: "POST",
    consultation_text: '',
    captcha_answer: ''
  }

  const { data, setData, post, processing, reset, errors } = useForm(formData);

  const submit = (e) => {
    e.preventDefault();
    const url = '/consultation';
    post(url)
  }

  useEffect(() => {
    return () => {
      reset()
    };
  }, []);


  return (
    <Authenticated props={props} title="Konsultasi">
      <div className="bg-white overflow-x-visible shadow sm:rounded-lg divide-y divide-gray-200">
        <div className="px-4 py-5 sm:p-6">
          <form className='space-y-8 divide-y divide-gray-200' onSubmit={submit}>
            <div>
              <h3 className="text-lg leading-6 font-medium text-gray-900">
                Form Konsultasi
              </h3>
              <p className="mt-1 max-w-2xl text-sm text-gray-500">
                Silahkan isi kolom dibawah dengan mengutarakan masalah hukum anda
              </p>
            </div>
            <div className='space-y-6 sm:space-y-5'>
              <div className='mt-5'>
                <Textarea
                  label='Pesan Konsultasi'
                  placeholder='Pesan Konsultasi'
                  value={data.consultation_text}
                  handleChange={e => setData('consultation_text', e.target.value)}
                  isFocused={true}
                />
              </div>
              <div className='mt-5'>
                <Input
                  name="captcha"
                  value={data.captcha_answer}
                  label="Pertanyaan keamanan"
                  placeholder={captcha_question}
                  handleChange={(e) => setData('captcha_answer', e.target.value)}
                />
              </div>
              <div className='mt-5 grid grid-cols-1 md:grid-cols-6'>
                <Button processing={processing}>
                  Kirim
                </Button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </Authenticated>
  );
}

export default Create;