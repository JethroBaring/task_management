'use client';

import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import { Button } from 'primereact/button';
import Link from 'next/link';
import { useFormState } from 'react-dom';
import { loginAction } from './loginAction';
const Login = () => {
  const [error, formAction] = useFormState(loginAction, undefined);
  return (
    <div className='bg-slate-100 rounded-md shadow border p-5 flex flex-col gap-5 text-gray-600'>
      <div className='flex flex-col gap-1'>
        <h1 className='text-2xl font-semibold'>Login</h1>
        <h2 className='text-sm'>
          Enter your email below to login to your account{' '}
        </h2>
      </div>
      <form className='flex flex-col gap-5' action={formAction}>
        <div className='flex flex-col gap-2'>
          <label htmlFor='email' className='text-sm font-semibold'>
            Email
          </label>
          <InputText
            id='email'
            name='email'
            aria-describedby='username-help'
            className='h-10 p-inputtext-sm'
          />
        </div>
        <div className='flex flex-col gap-2'>
          <label htmlFor='password' className='text-sm font-semibold'>
            Password
          </label>
          <Password toggleMask inputClassName='h-10 w-[350px]' id='password' name='password'/>
        </div>
        {error ? <p className='text-sm'>{error}</p> : ''}
        <Button label='Login' icon='pi pi-check' style={{ height: '40px' }} type='submit'/>
        <div className='flex gap-1 justify-center text-sm'>
          <p>Don&apos;t have an account?</p>
          <Link
            href='/register'
            className='text-[#4f46e5] font-semibold underline'
          >
            Register
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Login;
