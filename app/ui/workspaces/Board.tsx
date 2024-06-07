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
  addTask,
  newTitle,
  setNewTitle,
  newDescription,
  setNewDescription,
  submitTask,
  deleteTask,
  updateTitle,
  setUpdateTitle,
  updateDescription,
  setUpdateDescription,
  updateId,
  setUpdateId,
  updateTask,
  columnRef,
  newTaskFormRef,
  newTaskInputRef,
}: {
  columns: any;
  onDragEnd: any;
  columnName: any;
  setColumnName: any;
  addColumn: any;
  columnFormRef: any;
  columnInputRef: any;
  deleteColumn: any;
  addTask: any;
  newTitle: any;
  setNewTitle: any;
  newDescription: any;
  setNewDescription: any;
  submitTask: any;
  deleteTask: any;
  updateTitle: any;
  setUpdateTitle: any;
  updateDescription: any;
  setUpdateDescription: any;
  updateId: any;
  setUpdateId: any;
  updateTask: any;
  columnRef: any;
  newTaskFormRef: any;
  newTaskInputRef: any;
}) => {
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className='flex gap-5  w-full h-full overflow-scroll'>
        {columns.map((column: any) => {
          if (column.id === 9999) {
            return (
              <div
                ref={columnRef}
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
                      addTask={addTask}
                      newTitle={newTitle}
                      setNewTitle={setNewTitle}
                      newDescription={newDescription}
                      setNewDescription={setNewDescription}
                      submitTask={submitTask}
                      deleteTask={deleteTask}
                      updateTitle={updateTitle}
                      setUpdateTitle={setUpdateTitle}
                      updateDescription={updateDescription}
                      setUpdateDescription={setUpdateDescription}
                      updateId={updateId}
                      setUpdateId={setUpdateId}
                      updateTask={updateTask}
                      newTaskInputRef={newTaskInputRef}
                      newTaskFormRef={newTaskFormRef}
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
