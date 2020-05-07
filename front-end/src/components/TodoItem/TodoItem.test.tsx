import React from 'react';
import { cleanup, render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import TodoItem from './TodoItem';
import MatchMediaMock from '../../test/matchMediaMock';
import { Todos_todos } from '../../lib/graphql/types/Todos';

describe('<TodoItem />', () => {
  beforeAll(MatchMediaMock);

  afterEach(cleanup);

  test('it should mount', async () => {
    const mockUpdateTodo = jest.fn();
    const mockDeleteTodo = jest.fn();

    const mockTodo: Todos_todos = {
      __typename: 'Todo',
      id: '1',
      description: 'this is a mock',
    };

    const { getByTestId } = render(
      <TodoItem
        onRemoveTodo={mockDeleteTodo}
        onUpdateTodo={mockUpdateTodo}
        todo={mockTodo}
      />
    );
    const todo = await getByTestId('TodoItem');

    expect(todo).toBeInTheDocument();
  });

  test('it should show the proper description', async () => {
    const mockUpdateTodo = jest.fn();
    const mockDeleteTodo = jest.fn();

    const mockTodo: Todos_todos = {
      __typename: 'Todo',
      id: '1',
      description: 'this is a mock',
    };

    const { getByTestId } = render(
      <TodoItem
        onRemoveTodo={mockDeleteTodo}
        onUpdateTodo={mockUpdateTodo}
        todo={mockTodo}
      />
    );
    const todo = await getByTestId('TodoItem');
    expect(todo).toBeInTheDocument();

    const descriptionEl = document.querySelector('span');
    expect(document.querySelector('span')).toBeInTheDocument();

    if (!descriptionEl) return;

    expect(descriptionEl.innerHTML).toBe(mockTodo.description);
  });
});
