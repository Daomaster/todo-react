import React from 'react';
import { cleanup, render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Todo from './Todo';

describe('<Todo />', () => {
  afterEach(cleanup);

  test('it should mount', () => {
    const { getByTestId } = render(<Todo />);
    const todo = getByTestId('Todo');

    expect(todo).toBeInTheDocument();
  });
});