import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/app/lib/prisma';
import bcrypt from 'bcrypt';

export const GET = async (req: NextRequest, res: NextResponse) => {
  try {
    const data = await req.json();
    const exist = await prisma.user.findFirst({
      where: {
        email: data.email,
      },
    });

    if (!exist) {
      const salt = await bcrypt.genSalt();
      const hashedPassword = await bcrypt.hash(data.password, salt);

      const user = await prisma.user.create({
        data: {
          email: data.email,
          password: hashedPassword,
          firstName: data.firstName,
          lastName: data.lastName,
        },
      });

      if (user) {
        return NextResponse.json({
          id: user.id,
          email: user.email,
        });
      }

      return NextResponse.json({ error: 'Email already exists.' });
    }

    return NextResponse.json({ error: `Email already exists.` });
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error!' });
  }
};
