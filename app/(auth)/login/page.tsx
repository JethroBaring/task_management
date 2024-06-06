'use client';

import { InputText } from 'primereact/inputtext';
import { useState } from 'react';

const Login = () => {
  const [value, setValue] = useState<string>('');
  return (
    <form method='post'>
      <div>Login</div>
      <InputText value={value} onChange={(e) => setValue(e.target.value)} />
    </form>
  );
};

export default Login;
