import prisma from '@/app/lib/prisma';

export const GET = async (
  request: Request,
  { params }: { params: { id: string } }
) => {
  try {
    const columns = await prisma.column.findMany({
      where: {
        workspaceId: Number.parseInt(params.id),
      },
      include: {
        tasks: true,
      },
    });

    if (!columns) {
      return Response.json(
        {
          error: 'Columns not found',
        },
        { status: 404 }
      );
    }

    return Response.json(columns, { status: 200 });
  } catch (error) {
    return Response.json({ error: 'Internal Server Error!' }, { status: 500 });
  }
};

export const DELETE = async (
  request: Request,
  { params }: { params: { id: string } }
) => {
  try {
    const column = await prisma.column.delete({
      where: {
        id: Number.parseInt(params.id),
      },
    });

    if (!column) {
      return Response.json({ error: 'Error deleting column' }, { status: 404 });
    }

    return Response.json(column, {
      status: 200,
    });
  } catch (error) {
    return Response.json({ error: 'Internal Server Error!' }, { status: 500 });
  }
};
