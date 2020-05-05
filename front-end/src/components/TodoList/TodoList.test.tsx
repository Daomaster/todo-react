import React from 'react';
import { cleanup, render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import TodoList from './TodoList';

describe('<TodoList />', () => {
  afterEach(cleanup);

  test('it should mount', () => {
    const { getByTestId } = render(<TodoList />);
    const todoList = getByTestId('TodoList');

    expect(todoList).toBeInTheDocument();
  });
});