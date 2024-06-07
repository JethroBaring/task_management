import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/app/lib/prisma';
import bcrypt from 'bcrypt';
import { generateToken } from '@/app/lib/jwt';

export const POST = async (request: Request) => {
  try {
    const data = await request.json();
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
        return Response.json(
          {
            token: await generateToken(
              exist.id,
              exist.email,
              exist.firstName,
              exist.lastName
            ),
          },
          { status: 200 }
        );
      }

      return Response.json({ error: 'Invalid credentials.' }, { status: 401 });
    }

    return Response.json({ error: `Email doesn't exists.` }, { status: 404 });
  } catch (error) {
    return Response.json({ error: 'Internal Server Error!' }, { status: 500 });
  }
};
