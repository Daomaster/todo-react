import React from 'react';
import { cleanup, render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import TodoList from './TodoList';
import MatchMediaMock from '../../test/matchMediaMock';
import { Todos_todos } from '../../lib/graphql/types/Todos';

describe('<TodoList />', () => {
  beforeAll(MatchMediaMock);

  afterEach(cleanup);

  test('it should mount', () => {
    const mockUpdateTodo = jest.fn();
    const mockDeleteTodo = jest.fn();

    const mockTodos: Todos_todos[] = [
      {
        __typename: 'Todo',
        id: '1',
        description: 'this is a mock',
      },
    ];

    const { getByTestId } = render(
      <TodoList
        onRemoveTodo={mockDeleteTodo}
        onUpdateTodo={mockUpdateTodo}
        todos={mockTodos}
      />
    );
    const todoList = getByTestId('TodoList');

    expect(todoList).toBeInTheDocument();
  });

  test('it should render multiple todo item', () => {
    const mockUpdateTodo = jest.fn();
    const mockDeleteTodo = jest.fn();

    const mockTodos: Todos_todos[] = [
      {
        __typename: 'Todo',
        id: '1',
        description: 'this is a mock 1',
      },
      {
        __typename: 'Todo',
        id: '2',
        description: 'this is a mock 2',
      },
    ];

    const { getByTestId, getAllByTestId } = render(
      <TodoList
        onRemoveTodo={mockDeleteTodo}
        onUpdateTodo={mockUpdateTodo}
        todos={mockTodos}
      />
    );

    const todoList = getByTestId('TodoList');
    expect(todoList).toBeInTheDocument();

    const todoItems = getAllByTestId('TodoItem');
    expect(todoItems.length).toBe(mockTodos.length);
  });
});
