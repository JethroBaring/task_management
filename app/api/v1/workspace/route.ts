import prisma from '@/app/lib/prisma';

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