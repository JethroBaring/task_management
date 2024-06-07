import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/app/lib/prisma';
import bcrypt from 'bcrypt';
import { generateToken } from '@/app/lib/jwt';

export const GET = async (
  request: Request,
  { params }: { params: { id: string } }
) => {
  try {
    const workspace = await prisma.workspace.findFirst({
      where: {
        id: Number.parseInt(params.id)
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
