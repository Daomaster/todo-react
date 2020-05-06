import React, { useState } from 'react';
import styles from './TodoItem.module.less';
import { Button, Col, Form, Input, List, Popconfirm, Row } from 'antd';
import {
  CheckOutlined,
  CloseOutlined,
  DeleteOutlined,
  EditOutlined,
} from '@ant-design/icons';
import { Todos_todos } from '../../lib/graphql/types/Todos';

interface TodoItemProps {
  todo: Todos_todos | null;
  onRemoveTodo: (todo: Todos_todos) => void;
  onUpdateTodo: (todo: Todos_todos) => void;
}

const TodoItem: React.FC<TodoItemProps> = ({
  todo,
  onRemoveTodo,
  onUpdateTodo,
}) => {
  const descriptionEl = React.createRef<Input>();
  const [form] = Form.useForm();

  const [editMode, setEditMode] = useState(false);

  const toggleEditModeHandler = () => {
    setEditMode(!editMode);
  };

  // TODO: fix the generator for the interface names
  // eslint-disable-next-line @typescript-eslint/camelcase
  const updateTodoHandler = (todo: Todos_todos | null) => {
    if (!todo || !descriptionEl.current) return;
    descriptionEl.current.blur();
    todo.description = form.getFieldValue('description');

    onUpdateTodo(todo);

    // reset the value in the form
    form.resetFields();

    // toggle the edit mode
    toggleEditModeHandler();
  };

  const normalModeActions = [
    <Button
      icon={<EditOutlined />}
      type="primary"
      key={`edit${todo?.id}`}
      shape="circle"
      onClick={toggleEditModeHandler}
    />,
    <Popconfirm
      key={`delete${todo?.id}`}
      title="Are you sure you want to delete?"
      onConfirm={() => {
        if (todo) {
          onRemoveTodo(todo);
        }
      }}
    >
      <Button danger type="primary" icon={<DeleteOutlined />} shape="circle" />
    </Popconfirm>,
  ];

  const editModeActions = [
    <Button
      icon={<CheckOutlined />}
      type="primary"
      key={`update${todo?.id}`}
      shape="circle"
      onClick={() => {
        updateTodoHandler(todo);
      }}
    />,
    <Button
      danger
      icon={<CloseOutlined />}
      type="primary"
      key={`update${todo?.id}`}
      shape="circle"
      onClick={() => {
        toggleEditModeHandler();
      }}
    />,
  ];

  return (
    <div data-testid={'TodoItem'}>
      <List.Item
        actions={editMode ? editModeActions : normalModeActions}
        key={todo?.id}
      >
        <Row gutter={20} className={styles.EditTodoRow}>
          <Col xs={25} sm={25} md={18} lg={20} xl={21}>
            {editMode ? (
              <Form form={form} layout="horizontal">
                <Form.Item
                  className={styles.EditInput}
                  name={'description'}
                  rules={[
                    {
                      required: true,
                      message: 'You need to have a actual todo :)',
                    },
                  ]}
                >
                  <Input
                    autoFocus={true}
                    onPressEnter={() => {
                      updateTodoHandler(todo);
                    }}
                    placeholder={todo?.description}
                    ref={descriptionEl}
                  />
                </Form.Item>
              </Form>
            ) : (
              <span>{todo?.description}</span>
            )}
          </Col>
        </Row>
      </List.Item>
    </div>
  );
};

export default TodoItem;
