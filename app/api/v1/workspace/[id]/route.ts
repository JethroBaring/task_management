import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/app/lib/prisma';
import bcrypt from 'bcrypt';
import { generateToken } from '@/app/lib/jwt';
import path from 'path';

export const GET = async (
  request: Request,
  { params }: { params: { id: string } }
) => {
  try {
    const workspaces = await prisma.workspace.findMany({
      where: {
        creatorId: Number.parseInt(params.id),
      },
    });

    if (!workspaces) {
      return Response.json(
        { error: 'Error fetching workspaces' },
        { status: 404 }
      );
    }

    return Response.json(workspaces, {
      status: 200,
    });
  } catch (error) {
    return Response.json(
      { error: 'Internal Server Error!' },
      { status: 500 }
    );
  }
};

// export const POST = async (request: Request) => {
//   try {

//   } catch (error) {

//   }
// };

// export const PATCH = async (request: Request) => {
//   try {

//   } catch (error) {

//   }
// };

// export const DELETE = async (request: Request) => {
//   try {

//   } catch (error) {

//   }
// };
