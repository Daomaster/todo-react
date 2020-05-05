import React from 'react';
import { cleanup, render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import LoginForm from './LoginForm';

describe('<Login />', () => {
  afterEach(cleanup);

  test('it should mount', () => {
    const { getByTestId } = render(<LoginForm />);
    const login = getByTestId('Login');

    expect(login).toBeInTheDocument();
  });
});
