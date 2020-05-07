import React from 'react';
import TodoList from '../../components/TodoList/TodoList';
import { useMutation, useQuery } from '@apollo/react-hooks';
import { useHistory } from 'react-router-dom';
import styles from './TodoPage.module.less';
import {
  CREATE_TODOS,
  DELETE_TODOS,
  GET_TODOS,
  UPDATE_TODOS,
} from '../../lib/graphql/query';
import { Todos, Todos_todos } from '../../lib/graphql/types/Todos';
import { Card, Button, Row, Col, Tooltip, message, Spin } from 'antd';
import { PoweroffOutlined } from '@ant-design/icons';
import AddTodo from '../../components/AddTodo/AddTodo';
import {
  CreateTodo,
  CreateTodoVariables,
} from '../../lib/graphql/types/CreateTodo';
import {
  DeleteTodo,
  DeleteTodoVariables,
} from '../../lib/graphql/types/DeleteTodo';
import {
  CreateTodoInput,
  DeleteTodoInput,
  UpdateTodoInput,
} from '../../../types/globalTypes';
import {
  UpdateTodo,
  UpdateTodoVariables,
} from '../../lib/graphql/types/UpdateTodo';

const TodoPage: React.FC = () => {
  const history = useHistory();

  // check if user has signed in
  const isLoggedIn = localStorage.getItem('token');
  if (!isLoggedIn) {
    history.push('/login');
  }

  // query for query items
  const { client, data, loading, error } = useQuery<Todos>(GET_TODOS);
  // mutation for delete item
  const [deleteTodo] = useMutation<DeleteTodo, DeleteTodoVariables>(
    DELETE_TODOS,
    {
      refetchQueries: [{ query: GET_TODOS }],
      onCompleted() {
        message.success('Todo has been deleted', 1);
      },
    }
  );
  // mutation for add item
  const [createTodo] = useMutation<CreateTodo, CreateTodoVariables>(
    CREATE_TODOS,
    {
      refetchQueries: [{ query: GET_TODOS }],
      onCompleted() {
        message.success('Todo has been created', 1);
      },
    }
  );
  // mutation for update item
  const [updateTodo] = useMutation<UpdateTodo, UpdateTodoVariables>(
    UPDATE_TODOS,
    {
      refetchQueries: [{ query: GET_TODOS }],
      onCompleted() {
        message.success('Todo has been updated', 1);
      },
    }
  );

  const logoutHandler = async () => {
    // this will force the apollo client to refecth
    await client.clearStore();

    // remove the token
    localStorage.removeItem('token');

    // redirect to login
    history.push('/login');
  };

  const addTodoHandler = async (description: string) => {
    const input: CreateTodoInput = {
      description: description,
    };

    await createTodo({ variables: { createInput: input } });
  };

  const removeTodoHandler = async (todo: Todos_todos) => {
    const input: DeleteTodoInput = {
      todoId: todo.id,
    };

    await deleteTodo({ variables: { deleteInput: input } });
  };

  const updateTodoHandler = async (todo: Todos_todos) => {
    const input: UpdateTodoInput = {
      todoId: todo.id,
      description: todo.description,
    };

    await updateTodo({ variables: { updateInput: input } });
  };

  if (error) return <p>ERROR</p>;
  if (!data) return <p>Not found</p>;

  return (
    <div data-testid="TodoPage">
      <Row>
        <Col span={22} />
        <Col span={2}>
          <Tooltip placement="bottomRight" title="Log Out">
            <Button
              danger
              type="primary"
              shape="round"
              size={'large'}
              icon={<PoweroffOutlined />}
              className={styles.Logout}
              onClick={logoutHandler}
            />
          </Tooltip>
        </Col>
      </Row>

      <Card title="Todo List" className={styles.ContainerCard}>
        <div className={styles.AddContainer}>
          <AddTodo onAddTodo={addTodoHandler} />
        </div>
        {loading ? (
          <Spin tip="Loading..." />
        ) : (
          <TodoList
            todos={data.todos}
            onRemoveTodo={removeTodoHandler}
            onUpdateTodo={updateTodoHandler}
          />
        )}
      </Card>
    </div>
  );
};

export default TodoPage;
