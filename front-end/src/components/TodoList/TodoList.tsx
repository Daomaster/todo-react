import React from 'react';
import Todo from "../Todo/Todo";

const TodoList: React.FC = () => (
  <div data-testid="TodoList">
    TodoList Component
      <Todo/>
  </div>
);

export default TodoList;
