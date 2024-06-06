import React from 'react';
import { Draggable } from '@hello-pangea/dnd';

type Props = {
  task: any;
  index: number;
  provided: any;
};

const TaskCard: React.FC<Props> = ({ task, index, provided }) => {
  return (
    <Draggable key={`${task.id}`} draggableId={`${task.id}`} index={index}>
      {(provided, snapshot) => (
        <div
          className='rounded-md border text-card-foreground shadow h-28 bg-white p-3 cursor-pointer'
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          style={{
            ...provided.draggableProps.style,
            opacity: snapshot.isDragging ? '0.5' : '1',
          }}
        >
          <h1 className='text-lg font-semibold'>{task.title}</h1>
        </div>
      )}
    </Draggable>
  );
};

export default TaskCard;
