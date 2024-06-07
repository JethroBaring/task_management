import { cookies } from 'next/headers';
import { decrypt } from './jwt';

const getUser = async () => {
  const session = cookies().get('session')?.value;
  if (!session) return;

  const data = await decrypt(session);

  return data?.user;
};

export default getUser