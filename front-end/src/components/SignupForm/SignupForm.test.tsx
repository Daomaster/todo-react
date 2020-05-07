import React from 'react';
import { cleanup, render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import SignupForm from './SignupForm';
import { createMemoryHistory } from 'history';
import MatchMediaMock from '../../test/matchMediaMock';
import { MockedProvider } from '@apollo/react-testing';
import { Router } from 'react-router-dom';
import {
  CreateUser,
  CreateUserVariables,
} from '../../lib/graphql/types/CreateUser';
import { CREATE_USER } from '../../lib/graphql/query';

describe('<SignupForm />', () => {
  beforeAll(MatchMediaMock);

  afterEach(cleanup);

  test('it should mount', async () => {
    const mockSignupVariables: CreateUserVariables = {
      createInput: {
        username: 'username',
        password: 'password',
      },
    };

    const mockSignupResult: CreateUser = {
      createUser: { __typename: 'AuthData', userId: '1', token: 'token' },
    };

    const mocks = [
      {
        request: {
          query: CREATE_USER,
          variables: mockSignupVariables,
        },
        result: () => {
          return {
            data: {
              mockSignupResult,
            },
          };
        },
      },
    ];

    const history = createMemoryHistory();

    const { getByTestId } = render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <Router history={history}>
          <SignupForm />
        </Router>
      </MockedProvider>
    );
    const signupForm = await getByTestId('SignupForm');

    expect(signupForm).toBeInTheDocument();
  });
});
