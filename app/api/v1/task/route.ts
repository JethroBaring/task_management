import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/app/lib/prisma';
import bcrypt from 'bcrypt';
import { generateToken } from '@/app/lib/jwt';

export const POST = async (request: Request) => {
  try {
    const { title, description, status, position, creatorId, columnId } =
      await request.json();

    const task = await prisma.task.create({
      data: {
        title,
        description,
        status,
        position,
        creatorId,
        columnId,
      },
    });

    if (!task) {
      return Response.json(
        {
          error: 'Task creation failed',
        },
        { status: 404 }
      );
    }

    return Response.json(task, { status: 200 });
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
