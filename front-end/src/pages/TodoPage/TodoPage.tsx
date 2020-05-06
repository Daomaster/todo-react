import React from 'react';
import TodoList from '../../components/TodoList/TodoList';
import { useMutation, useQuery } from '@apollo/react-hooks';
import { useHistory } from 'react-router-dom';
import styles from './TodoPage.module.less';
import { CREATE_TODOS, DELETE_TODOS, GET_TODOS } from '../../lib/graphql/query';
// TODO: fix the generator for the interface names
// eslint-disable-next-line @typescript-eslint/camelcase
import { Todos, Todos_todos } from '../../lib/graphql/types/Todos';
import { Card, Button, Row, Col, Tooltip } from 'antd';
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
import { CreateTodoInput, DeleteTodoInput } from '../../../types/globalTypes';

const TodoPage: React.FC = () => {
  const history = useHistory();

  // check if user has signed in
  const isLoggedIn = localStorage.getItem('token');
  if (!isLoggedIn) {
    history.push('/login');
  }

  const { data, loading, error } = useQuery<Todos>(GET_TODOS);
  const [deleteTodo] = useMutation<DeleteTodo, DeleteTodoVariables>(
    DELETE_TODOS,
    {
      refetchQueries: [{ query: GET_TODOS }],
      onCompleted() {
        console.log('The todo has been deleted');
      },
    }
  );
  const [createTodo] = useMutation<CreateTodo, CreateTodoVariables>(
    CREATE_TODOS,
    {
      refetchQueries: [{ query: GET_TODOS }],
      onCompleted() {
        console.log('The todo has been created');
      },
    }
  );

  const logoutHandler = () => {
    localStorage.removeItem('auth');
    history.push('/login');
  };

  const addTodoHandler = async (description: string) => {
    const input: CreateTodoInput = {
      description: description,
    };

    await createTodo({ variables: { createInput: input } });
  };

  // TODO: fix the generator for the interface names
  // eslint-disable-next-line @typescript-eslint/camelcase
  const removeTodoHandler = async (todo: Todos_todos) => {
    const input: DeleteTodoInput = {
      todoId: todo.id,
    };

    await deleteTodo({ variables: { deleteInput: input } });
  };

  // TODO: fix the generator for the interface names
  // eslint-disable-next-line @typescript-eslint/camelcase
  const updateTodoHandler = (todo: Todos_todos) => {
    console.log('update', todo);
  };

  if (loading) return <p>Loading</p>;
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
        <TodoList
          todos={data.todos}
          onRemoveTodo={removeTodoHandler}
          onUpdateTodo={updateTodoHandler}
        />
      </Card>
    </div>
  );
};

export default TodoPage;
