import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/app/lib/prisma';
import bcrypt from 'bcrypt';
import { generateToken } from '@/app/lib/jwt';

export const GET = async (req: NextRequest, res: NextResponse) => {
  try {
    const data = await req.json();
    const exist = await prisma.user.findFirst({
      where: {
        email: data.email,
      },
    });

    if (exist) {
      const passwordMatched = await bcrypt.compare(
        data.password,
        exist.password
      );

      if (passwordMatched) {
        return NextResponse.json(generateToken(exist.id));
      }

      return NextResponse.json({ error: 'Invalid credentials.' });
    }

    return NextResponse.json({ error: `Email doesn't exists.` });
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error!' });
  }
};
