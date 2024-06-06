import Column from '@/app/ui/workspaces/Column';
import { useEffect, useRef, useState } from 'react';
import { HiMiniPlus } from 'react-icons/hi2';
import { DragDropContext, Draggable, Droppable } from '@hello-pangea/dnd';

const Board = () => {
  const [columns, setColumns] = useState([
    {
      id: '1',
      title: ' 📃 To do',
      tasks: [
        {
          id: '11',
          title: 'Learn JavaScript',
        },
        {
          id: '12',
          title: 'Learn Git',
        },
        {
          id: '13',
          title: 'Learn Python',
        },
      ],
    },
    {
      id: '2',
      title: ' ✏️ In progress',
      tasks: [],
    },
    {
      id: '3',
      title: ' ✔️ Completed',
      tasks: [],
    },
  ]);
  const onDragEnd = async (result: { destination: any; source?: any }) => {
    if (!result.destination) return;
    const { source, destination } = result;

    if (source.droppableId !== destination.droppableId) {
      const sourceColIndex = columns.findIndex(
        (e) => e.id === source.droppableId
      );
      const destinationColIndex = columns.findIndex(
        (e) => e.id === destination.droppableId
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
      if (columns[destinationColIndex].title.includes('In progress')) {
        status = 'IN_PROGRESS';
      } else if (columns[destinationColIndex].title.includes('Completed')) {
        status = 'COMPLETED';
      }
    } else {
      const sourceColIndex = columns.findIndex(
        (e) => e.id === source.droppableId
      );
      const sourceCol = columns[sourceColIndex];

      const [removed] = sourceCol.tasks.splice(source.index, 1);

      sourceCol.tasks.splice(destination.index, 0, removed);
      setColumns([...columns]);
    }
  };
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className='flex gap-5  w-full h-full'>
        {columns.map((column) => (
          <Droppable key={`${column.id}`} droppableId={`${column.id}`}>
            {(provided) => (
              <Column
                key={`${column.id}`}
                tasks={column.tasks}
                provided={provided}
              />
            )}
          </Droppable>
        ))}
      </div>
    </DragDropContext>
  );
};

export default Board;
