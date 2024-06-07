'use client';

import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import { Button } from 'primereact/button';
import Link from 'next/link';
import { useFormState } from 'react-dom';
import { registerAction } from './registerAction';

const Register = () => {
  const [error, formAction] = useFormState(registerAction, undefined);
  return (
    <div className='bg-slate-100 rounded-md shadow border p-5 flex flex-col gap-5 text-gray-600'>
      <div className='flex flex-col gap-1'>
        <h1 className='text-2xl font-semibold'>Register</h1>
        <h2 className='text-sm'>
          Enter your information to create an account{' '}
        </h2>
      </div>
      <form className='flex flex-col gap-5' action={formAction}>
        <div className='flex gap-2 w-[350px]'>
          <div className='flex flex-col gap-2 flex-1'>
            <label htmlFor='username' className='text-sm font-semibold'>
              First name
            </label>
            <InputText
              id='username'
              aria-describedby='username-help'
              className='h-10'
              style={{ width: '100%' }}
            />
          </div>
          <div className='flex flex-col gap-2 flex-1'>
            <label htmlFor='username' className='text-sm font-semibold'>
              Last name
            </label>
            <InputText
              id='username'
              aria-describedby='username-help'
              className='h-10'
              style={{ width: '100%' }}
            />
          </div>
        </div>
        <div className='flex flex-col gap-2'>
          <label htmlFor='username' className='text-sm font-semibold'>
            Email
          </label>
          <InputText
            id='username'
            aria-describedby='username-help'
            className='h-10 p-inputtext-sm'
          />
        </div>
        <div className='flex flex-col gap-2'>
          <label htmlFor='username' className='text-sm font-semibold'>
            Password
          </label>
          <Password toggleMask inputClassName='h-10 w-[350px]' />
        </div>
        {error ? <p className='text-sm'>{error}</p> : ''}
        <Button
          label='Create an Account'
          icon='pi pi-check'
          style={{ height: '40px' }}
        />
        <div className='flex gap-1 justify-center text-sm'>
          <p>Already have an account?</p>
          <Link
            href='/login'
            className='text-[#4f46e5] font-semibold underline'
          >
            Login
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Register;
