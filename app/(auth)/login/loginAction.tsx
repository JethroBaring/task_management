'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export const loginAction = async (currentState: any, formData: FormData) => {
  const email = formData.get('email');
  const password = formData.get('password');

  const response = await fetch(`/api/v1/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  });

  const data = await response.json();

  if (response.ok) {
    cookies().set('session', data.token, {
      secure: true,
      httpOnly: true,
      sameSite: true,
      expires: Date.now() + 24 * 60 * 60 * 1000 * 7,
      path: '/',
    });

    redirect('/workspaces');
  }
};
