import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/app/lib/prisma';
import bcrypt from 'bcrypt';
import { generateToken } from '@/app/lib/jwt';

// export const GET = async (request: Request) => {
//   try {
//   } catch (error) {

//   }
// };

export const POST = async (request: Request) => {
  try {
    const { color_one, color_two, name, position, workspaceId } =
      await request.json();

    const column = await prisma.column.create({
      data: {
        name,
        position,
        workspaceId,
      },
      include: {
        tasks: true
      }
    });

    if (!column) {
      return Response.json(
        {
          error: 'Column creation failed',
        },
        { status: 404 }
      );
    }

    return Response.json(column, { status: 200 });
  } catch (error) {
    return Response.json({ error: 'Internal Server Error!' }, { status: 500 });
  }
};

export const PATCH = async (request: Request) => {
  try {
  } catch (error) {}
};

export const DELETE = async (request: Request) => {
  try {
  } catch (error) {}
};
