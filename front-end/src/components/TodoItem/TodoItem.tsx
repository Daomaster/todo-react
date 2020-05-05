import React from 'react';
import { Button, List, Popconfirm } from 'antd';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
// TODO: fix the generator for the interface names
// eslint-disable-next-line @typescript-eslint/camelcase
import { Todos_todos } from '../../lib/graphql/types/Todos';

interface TodoItemProps {
  // TODO: fix the generator for the interface names
  // eslint-disable-next-line @typescript-eslint/camelcase
  todo: Todos_todos | null;
  // TODO: fix the generator for the interface names

  // eslint-disable-next-line @typescript-eslint/camelcase
  onRemoveTodo: (todo: Todos_todos) => void;
  // TODO: fix the generator for the interface names

  // eslint-disable-next-line @typescript-eslint/camelcase
  onUpdateTodo: (todo: Todos_todos) => void;
}

const TodoItem: React.FC<TodoItemProps> = ({
  todo,
  onRemoveTodo,
  onUpdateTodo,
}) => {
  return (
    <List.Item
      actions={[
        <Button
          icon={<EditOutlined />}
          type="primary"
          key={todo?.id}
          shape="circle"
          className="update-todo-button"
        />,
        <Popconfirm
          key={todo?.id}
          title="Are you sure you want to delete?"
          onConfirm={() => {
            if (todo) {
              onRemoveTodo(todo);
            }
          }}
        >
          <Button
            danger
            className="remove-todo-button"
            icon={<DeleteOutlined />}
            shape="circle"
          />
        </Popconfirm>,
      ]}
      className="list-item"
      key={todo?.id}
    >
      <p>{todo?.description}</p>
    </List.Item>
  );
};

export default TodoItem;
