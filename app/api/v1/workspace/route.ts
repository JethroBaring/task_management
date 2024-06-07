import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/app/lib/prisma';
import bcrypt from 'bcrypt';
import { generateToken } from '@/app/lib/jwt';

export const GET = async (request: Request) => {
  try {
  } catch (error) {}
};

export const POST = async (request: Request) => {
  try {
    const { name, creatorId } = await request.json();

    const workspace = await prisma.workspace.create({
      data: {
        name,
        creatorId,
      },
    });

    if (!workspace) {
      return Response.json(
        {
          error: 'Workspace creation failed',
        },
        { status: 404 }
      );
    }

    return Response.json(workspace, { status: 200 });
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
