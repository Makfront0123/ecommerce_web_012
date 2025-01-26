"use client";
import FormContent from '@/components/FormControl'
import { useGlobalContext } from '@/context/globalContext';
import { useAuth } from '@/hooks/useAuth';
import Image from 'next/image'

import { useState } from 'react';
import DialogLoading from '../../../components/DialogLoading';
import { LoginForm } from './components/LoginForm';
const Login = () => {
  const { login } = useGlobalContext();

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { loading } = useGlobalContext()

  useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    await login(email, password);
  };
  return (
    <>
      <div className='relative lg:mt-14 mt-0 grid md:grid-cols-12 overflow-hidden '>
        <div className='col-span-6'>
          <Image src="/signup/image01.png" className='object-cover' width={892} height={540} alt="" />

        </div>
        <div className='col-span-6 xl:px-24 sm:px-18 px-6 mt-10'>
          <FormContent title='Log in to Exclusive' desc='Enter your details below'
            form={
              <LoginForm
                handleSubmit={handleSubmit}
                email={email} setEmail={setEmail}
                password={password} setPassword={setPassword} />} />
        </div>

      </div>
      {loading && <DialogLoading />}
    </>
  )
}
export default Login