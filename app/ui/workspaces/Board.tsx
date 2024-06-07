import Column from '@/app/ui/workspaces/Column';
import { DragDropContext, Droppable } from '@hello-pangea/dnd';

const Board = ({ columns, onDragEnd }: { columns: any; onDragEnd: any }) => {
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
