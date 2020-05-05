import React from 'react';
import TodoList from '../../components/TodoList/TodoList';
import { useQuery } from '@apollo/react-hooks';
import { useHistory } from 'react-router-dom';
import styles from './TodoPage.module.less';
import { GET_TODOS } from '../../lib/graphql/query';
import { Todos } from '../../lib/graphql/types/Todos';
import { Card } from 'antd';
import AddTodo from '../../components/AddTodo/AddTodo';

const TodoPage: React.FC = () => {
  const history = useHistory();
  const { data, loading, error } = useQuery<Todos>(GET_TODOS);

  const logoutHandler = () => {
    localStorage.removeItem('token');
    history.push('/login');
  };

  if (loading) return <p>Loading</p>;
  if (error) return <p>ERROR</p>;
  if (!data) return <p>Not found</p>;

  return (
    <div data-testid="TodoPage">
      <button className={styles.Logout} onClick={logoutHandler}>
        Log out
      </button>
      <Card title="Add a new todo">
        <AddTodo />
      </Card>
      <Card title="Todo List">
        <TodoList />
      </Card>
    </div>
  );
};

export default TodoPage;
