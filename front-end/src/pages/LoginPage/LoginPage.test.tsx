import React from 'react';
import { cleanup, render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import LoginPage from './LoginPage';

describe('<LoginPage />', () => {
  afterEach(cleanup);

  test('it should mount', () => {
    const { getByTestId } = render(<LoginPage />);
    const loginPage = getByTestId('LoginPage');

    expect(loginPage).toBeInTheDocument();
  });
});