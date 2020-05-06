import React from 'react';
import TodoItem from '../TodoItem/TodoItem';
import { List } from 'antd';
// TODO: fix the generator for the interface names
// eslint-disable-next-line @typescript-eslint/camelcase
import { Todos_todos } from '../../lib/graphql/types/Todos';

interface TodoListProps {
  // TODO: fix the generator for the interface names
  // eslint-disable-next-line @typescript-eslint/camelcase
  todos: Todos_todos[] | null;
  // TODO: fix the generator for the interface names

  // eslint-disable-next-line @typescript-eslint/camelcase
  onRemoveTodo: (todo: Todos_todos) => void;
  // TODO: fix the generator for the interface names

  // eslint-disable-next-line @typescript-eslint/camelcase
  onUpdateTodo: (todo: Todos_todos) => void;
}

const TodoList: React.FC<TodoListProps> = ({
  todos,
  onRemoveTodo,
  onUpdateTodo,
}) => {
  // check if data is empty
  if (!todos) return <p>You do not have any todos, go add one :)</p>;

  return (
    <div data-testid={'TodoList'}>
      <List
        dataSource={todos}
        /* eslint-disable-next-line @typescript-eslint/camelcase */
        renderItem={(todo: Todos_todos) => (
          <TodoItem
            todo={todo}
            onRemoveTodo={onRemoveTodo}
            onUpdateTodo={onUpdateTodo}
          />
        )}
        pagination={{
          position: 'bottom',
          pageSize: 10,
        }}
      />
    </div>
  );
};

export default TodoList;
