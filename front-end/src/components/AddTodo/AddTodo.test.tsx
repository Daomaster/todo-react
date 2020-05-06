import React from 'react';
import { cleanup, render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import AddTodo from './AddTodo';
import MatchMediaMock from '../../test/matchMediaMock';

describe('<AddTodo />', () => {
  beforeAll(MatchMediaMock);

  afterEach(cleanup);

  test('it should mount', () => {
    const mockAddTodo = jest.fn();
    const { getByTestId } = render(<AddTodo onAddTodo={mockAddTodo} />);
    const addTodo = getByTestId('AddTodo');

    expect(addTodo).toBeInTheDocument();
  });
});
