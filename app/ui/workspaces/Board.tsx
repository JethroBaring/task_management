import Column from '@/app/ui/workspaces/Column';
import { useEffect, useState } from 'react';
import { HiMiniPlus } from 'react-icons/hi2';
import { DragDropContext, Droppable } from '@hello-pangea/dnd';

const Board = ({ columnData }: { columnData: any }) => {
  const [columns, setColumns] = useState(columnData);
  const onDragEnd = async (result: { destination: any; source?: any }) => {
    if (!result.destination) return;
    const { source, destination } = result;

    if (source.droppableId !== destination.droppableId) {
      const sourceColIndex = columns.findIndex(
        (e: any) => e.id.toString() === source.droppableId
      );
      const destinationColIndex = columns.findIndex(
        (e: any) => e.id.toString() === destination.droppableId
      );

      const sourceCol = columns[sourceColIndex];
      const destinationCol = columns[destinationColIndex];

      const sourceTask = [...sourceCol.tasks];
      const destinationTask = [...destinationCol.tasks];

      const [removed] = sourceTask.splice(source.index, 1);

      destinationTask.splice(destination.index, 0, removed);
      columns[sourceColIndex].tasks = sourceTask;
      columns[destinationColIndex].tasks = destinationTask;

      setColumns(columns);
      let status = 'PENDING';
      if (columns[destinationColIndex].name.includes('In progress')) {
        status = 'IN_PROGRESS';
      } else if (columns[destinationColIndex].name.includes('Completed')) {
        status = 'COMPLETED';
      }
    } else {
      const sourceColIndex = columns.findIndex(
        (e: any) => e.id === source.droppableId
      );
      const sourceCol = columns[sourceColIndex];

      const [removed] = sourceCol.tasks.splice(source.index, 1);

      sourceCol.tasks.splice(destination.index, 0, removed);
      setColumns([...columns]);
    }
  };

  // useEffect(() => {
  //   setColumns(columnData)
  // }, [columnData]);

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className='flex gap-5  w-full h-full'>
        {columns.map((column: any) => (
          <Droppable key={`${column.id}`} droppableId={`${column.id}`}>
            {(provided) => (
              <Column
                key={`${column.id}`}
                tasks={column.tasks}
                provided={provided}
                name={column.name}
              />
            )}
          </Droppable>
        ))}
      </div>
    </DragDropContext>
  );
};

export default Board;
