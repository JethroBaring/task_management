import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/app/lib/prisma';
import bcrypt from 'bcrypt';

export const POST = async (request: Request) => {
  try {
    const data = await request.json();
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
        return Response.json(
          {
            id: user.id,
            email: user.email,
          },
          { status: 200 }
        );
      }

      return Response.json({ error: 'User creation failed.' }, { status: 500 });
    }

    return Response.json({ error: `Email already exists.` }, { status: 409 });
  } catch (error) {
    return Response.json({ error: 'Internal Server Error!' }, { status: 500 });
  }
};
