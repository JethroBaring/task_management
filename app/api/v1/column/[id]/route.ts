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
        tasks: true
      }
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
