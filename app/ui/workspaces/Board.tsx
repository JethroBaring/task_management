import Column from '@/app/ui/workspaces/Column';
import { DragDropContext, Droppable } from '@hello-pangea/dnd';
import { useState } from 'react';

const Board = ({
  columns,
  onDragEnd,
  columnName,
  setColumnName,
  addColumn,
  columnFormRef,
  columnInputRef,
  deleteColumn,
}: {
  columns: any;
  onDragEnd: any;
  columnName: any;
  setColumnName: any;
  addColumn: any;
  columnFormRef: any;
  columnInputRef: any;
  deleteColumn: any;
}) => {
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className='flex gap-5  w-full h-full overflow-scroll'>
        {columns.map((column: any) => {
          if (column.id === 9999) {
            return (
              <div
                key={`${column.id}`}
                className='w-[400px] rounded-md p-3 flex flex-col gap-3 bg-slate-100'
              >
                <div className='flex items-center justify-between'>
                  <form onSubmit={addColumn} ref={columnFormRef}>
                    <input
                      ref={columnInputRef}
                      type='text'
                      className='outline-none bg-slate-100'
                      value={columnName}
                      onChange={(e) => setColumnName(e.target.value)}
                    />
                  </form>
                </div>
              </div>
            );
          } else {
            return (
              <div key={`${column.id}`} className='h-full'>
                <Droppable key={`${column.id}`} droppableId={`${column.id}`}>
                  {(provided) => (
                    <Column
                      key={`${column.id}`}
                      column={column}
                      provided={provided}
                      name={column.name}
                      deleteColumn={deleteColumn}
                    />
                  )}
                </Droppable>
              </div>
            );
          }
        })}
      </div>
    </DragDropContext>
  );
};

export default Board;
