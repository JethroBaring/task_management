'use server';

import { redirect } from 'next/navigation';

export const registerAction = async (currentState: any, formData: FormData) => {
  const firstName = formData.get('firstName');
  const lastName = formData.get('lastName');
  const email = formData.get('email');
  const password = formData.get('password');

  const response = await fetch('http://localhost:3000/api/v1/auth/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ firstName, lastName, email, password }),
  });

  if (response.ok) {
    redirect('/login');
  }

  console.log(response)
};
