import React from 'react'
import { useDispatch } from "react-redux"

import { authLogin } from '@/store/authSlice'
import { Input, ActionButton } from '@/components'
import bg from '@/assets/images/patternpad.png'

const Login = () => {
  const dispatch = useDispatch()
  const handleLogin = () => dispatch(authLogin({ token: '123abc' }))

  return (
    <div className='w-screen h-screen flex flex-row'>
      <div className='bg-blend-darken w-6/12 h-full bg-primary-500'>
        <img className="h-full object-cover object-center" src={bg} alt="" />
      </div>

      <div className='w-6/12 h-full flex flex-col justify-center items-start px-48 bg-gray-800'>
        <h1 className='mb-4 text-3xl text-white font-light '>Login</h1>
        <Input
          label="Email Address"
          placeholder="Enter your email address"
          isError={false}
          error=""
        />
        <Input
          label="Password"
          type="password"
          placeholder="Enter your password"
          isError={false}
          error=""
        />
        <ActionButton
          text="Login"
          onClick={() => handleLogin()}
          outerClassName="w-full mt-3 h-8"
          innerClassName="text-sm font-semibold text-white uppercase" />
      </div>
    </div>
  )
}

export default Login