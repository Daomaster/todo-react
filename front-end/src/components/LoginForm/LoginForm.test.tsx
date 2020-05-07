import React from 'react';
import { createMemoryHistory } from 'history';
import { MockedProvider } from '@apollo/react-testing';
import { Router } from 'react-router-dom';
import { cleanup, render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import LoginForm from './LoginForm';
import MatchMediaMock from '../../test/matchMediaMock';
import { LOGIN } from '../../lib/graphql/query';
import { Login } from '../../lib/graphql/types/Login';

describe('<LoginForm />', () => {
  beforeAll(MatchMediaMock);

  afterEach(cleanup);

  test('it should mount', async () => {
    const mockLoginResult: Login = {
      login: { __typename: 'AuthData', userId: '1', token: 'token' },
    };

    const mocks = [
      {
        request: {
          query: LOGIN,
          variables: {
            username: 'test',
            password: 'password',
          },
        },
        result: () => {
          return {
            data: {
              mockLoginResult,
            },
          };
        },
      },
    ];

    const history = createMemoryHistory();

    const { getByTestId } = render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <Router history={history}>
          <LoginForm />
        </Router>
      </MockedProvider>
    );

    const login = await getByTestId('Login');
    expect(login).toBeInTheDocument();
  });
});
