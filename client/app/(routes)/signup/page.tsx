"use client"
import React, { useState } from 'react'

import FormContent from '@/components/FormControl'

import Image from 'next/image'
import { useAuth } from '@/hooks/useAuth'
import { useGlobalContext } from '@/context/globalContext'
import DialogLoading from '@/components/DialogLoading'
import { SignUpForm } from './components/SignupForm'


const SignUp = () => {
  const { register, loading } = useGlobalContext();
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  useAuth();


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    await register(name, email, password)

  }
  return (
    <>
      <div className='md:mt-14 mt-0 grid md:grid-cols-12' id="signup">
        <div className='col-span-6'>
          <Image src="/signup/image01.png" className='object-contain' width={752} height={500} alt="" />
        </div>
        <div className='col-span-6 lg:px-32 md:px-14 px-12 mt-10'>
          <FormContent title='Log in to Exclusive' desc='Enter your details below'
            form={
              <SignUpForm
                handleSubmit={handleSubmit}
                email={email} setEmail={setEmail}
                name={name} setName={setName}
                password={password} setPassword={setPassword} />} />
        </div>
      </div>
      {loading && <DialogLoading />}
    </>



  )
}




export default SignUp