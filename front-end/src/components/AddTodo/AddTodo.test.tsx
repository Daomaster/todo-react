import React from 'react';
import { cleanup, render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import AddTodo from './AddTodo';

describe('<AddTodo />', () => {
  afterEach(cleanup);

  test('it should mount', () => {
    const { getByTestId } = render(<AddTodo />);
    const addTodo = getByTestId('AddTodo');

    expect(addTodo).toBeInTheDocument();
  });
});