import React from 'react';
import TodoItem from '../TodoItem/TodoItem';

const TodoList: React.FC = () => {
  return (
    <div data-testid="TodoList">
      TodoList Component
      <TodoItem />
    </div>
  );
};

export default TodoList;
