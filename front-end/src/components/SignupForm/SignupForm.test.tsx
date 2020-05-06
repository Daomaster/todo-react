import React from 'react';
import { cleanup, render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import SignupForm from './SignupForm';

describe('<SignupForm />', () => {
  afterEach(cleanup);

  test('it should mount', () => {
    const { getByTestId } = render(<SignupForm />);
    const signupForm = getByTestId('SignupForm');

    expect(signupForm).toBeInTheDocument();
  });
});