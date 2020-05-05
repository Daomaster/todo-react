import React from 'react';
import { cleanup, render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import TodoPage from './TodoPage';

describe('<TodoPage />', () => {
  afterEach(cleanup);

  test('it should mount', () => {
    const { getByTestId } = render(<TodoPage />);
    const todoPage = getByTestId('TodoPage');

    expect(todoPage).toBeInTheDocument();
  });
});
