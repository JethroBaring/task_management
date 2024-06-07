import { SignJWT, jwtVerify } from 'jose';

const secretKey = new TextEncoder().encode('samplesecret');

const generateToken = async (
  id: number,
  email: string,
  firstName: string,
  lastName: string
) => {
  return await new SignJWT({ user: { id, email, firstName, lastName } })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('5h')
    .sign(secretKey);
};

const decrypt = async (token: string) => {
  try {
    const { payload } = await jwtVerify(token, secretKey, {
      algorithms: ['HS256'],
    });

    return payload;
  } catch (error) {
    console.log(error);
  }
};

export { generateToken, decrypt };
