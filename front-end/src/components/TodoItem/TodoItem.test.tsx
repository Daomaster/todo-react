import React from 'react';
import { cleanup, render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import TodoItem from './TodoItem';

describe('<TodoItem />', () => {
  afterEach(cleanup);

  test('it should mount', () => {
    const { getByTestId } = render(<TodoItem />);
    const todo = getByTestId('Todo');

    expect(todo).toBeInTheDocument();
  });
});
