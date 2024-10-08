import prisma from '@/app/lib/prisma';

export const GET = async (
  request: Request,
  { params }: { params: { id: string } }
) => {
  try {
    const tasks = await prisma.task.findMany({
      where: {
        id: Number.parseInt(params.id),
      },
    });

    if (!tasks) {
      return Response.json(
        {
          error: 'Tasks not found',
        },
        { status: 404 }
      );
    }

    return Response.json(tasks, { status: 200 });
  } catch (error) {
    return Response.json({ error: 'Internal Server Error!' }, { status: 500 });
  }
};

export const PATCH = async (
  request: Request,
  { params }: { params: { id: string } }
) => {
  try {
    const { title, description, columnId } = await request.json();
    const tasks = await prisma.task.update({
      where: {
        id: Number.parseInt(params.id),
      },
      data: {
        title: title,
        description: description,
        columnId: Number.parseInt(columnId),
      },
    });

    if (!tasks) {
      return Response.json(
        {
          error: 'Tasks not found',
        },
        { status: 404 }
      );
    }

    return Response.json(tasks, { status: 200 });
  } catch (error) {
    return Response.json({ error: 'Internal Server Error!' }, { status: 500 });
  }
};

export const DELETE = async (
  request: Request,
  { params }: { params: { id: string } }
) => {
  try {
    const tasks = await prisma.task.delete({
      where: {
        id: Number.parseInt(params.id),
      }
    });

    if (!tasks) {
      return Response.json(
        {
          error: 'Tasks not found',
        },
        { status: 404 }
      );
    }

    return Response.json(tasks, { status: 200 });
  } catch (error) {
    return Response.json({ error: 'Internal Server Error!' }, { status: 500 });
  }
};
