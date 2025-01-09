export const LoginForm = ({ handleSubmit, email, setEmail, password, setPassword }: any) => {
    return (
      <form onSubmit={handleSubmit} method='POST' className='flex flex-col gap-y-3 mt-10 [&>input]:outline-none'>
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
        <div className="flex items-center justify-between mt-5">
          <button className='mt-5 px-10 font-semibold py-4 rounded-md bg-red-600 text-white hover:bg-blue-500 duration-500 transition-colors'>
            Log In
          </button>
          <button className='mt-5 text-red-600 font-medium  hover:text-blue-500 duration-500 transition-colors'>
            Forget Password
          </button>
        </div>
  
      </form>
    )
  
  }
  