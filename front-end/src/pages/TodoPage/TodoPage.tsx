import React from 'react';
import TodoList from '../../components/TodoList/TodoList';
import { useQuery } from '@apollo/react-hooks';
import { useHistory } from 'react-router-dom';
import styles from './TodoPage.module.less';
import { GET_TODOS } from '../../lib/graphql/query';
// TODO: fix the generator for the interface names
// eslint-disable-next-line @typescript-eslint/camelcase
import { Todos, Todos_todos } from '../../lib/graphql/types/Todos';
import { Card, Button, Row, Col, Tooltip } from 'antd';
import { PoweroffOutlined } from '@ant-design/icons';
import AddTodo from '../../components/AddTodo/AddTodo';

const TodoPage: React.FC = () => {
  const history = useHistory();
  const { data, loading, error } = useQuery<Todos>(GET_TODOS);

  const logoutHandler = () => {
    localStorage.removeItem('token');
    history.push('/login');
  };

  const addTodoHandler = (description: string) => {
    console.log(description);
  };

  // TODO: fix the generator for the interface names
  // eslint-disable-next-line @typescript-eslint/camelcase
  const removeTodoHandler = (todo: Todos_todos) => {
    console.log('remove', todo);
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
          <AddTodo
              onAddTodo={addTodoHandler}
          />
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
