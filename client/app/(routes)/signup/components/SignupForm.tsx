import Link from "next/link"
import {Icon} from "@iconify/react"
export const SignUpForm = ({ handleSubmit, email, setEmail, password, setPassword, name, setName }: any) => {

    return (
      <form onSubmit={handleSubmit} method='POST' className='flex flex-col gap-y-3 mt-6 [&>input]:outline-none'>
        <input
          name='name'
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className='focus:border-red-600 duration-400 transition-colors   border-b-2 border-gray-200 p-2' placeholder='Name' />
        <input
          name='email'
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className='focus:border-red-600 duration-400 transition-colors border-b-2 border-gray-200 p-2' placeholder='Email or Phone Number' />
        <input
          name='password'
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className='focus:border-red-600 duration-400 transition-colors border-b-2 border-gray-200 p-2' placeholder='Password' />
        <button className='mt-5 px-10 font-semibold py-4 rounded-md bg-red-600 text-white hover:bg-blue-500 duration-500 transition-colors'>
          Create Account
        </button>
        <button className=' mt-5 px-10 font-semibold py-3 rounded-md border-2 border-gray-300 hover:bg-blue-500 duration-500 transition-colors'>
          <div className="flex items-center justify-center gap-x-4">
            <Icon icon="devicon:google" width="35" height="35" />Sign up with Google
          </div>
        </button>
        <span className='flex mx-auto gap-x-3 mt-5 '>Already Have account?
          <Link href="/login" className='text-gray-700 font-semibold hover:underline'>
            Login</Link></span>
      </form>
    )
  
  }