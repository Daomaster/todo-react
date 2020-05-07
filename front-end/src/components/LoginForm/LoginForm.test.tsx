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

  test('it should mount', () => {
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

    const login = getByTestId('Login');
    expect(login).toBeInTheDocument();
  });

  // it('should render loading state upon login', () => {
  //   const history = createMemoryHistory();
  //
  //   const { getByTestId, getByPlaceholderText } = render(
  //     <MockedProvider mocks={[]}>
  //       <Router history={history}>
  //         <LoginForm />
  //       </Router>
  //     </MockedProvider>
  //   );
  //
  //   const login = getByTestId('LoginForm');
  //   expect(login).toBeInTheDocument();
  //
  //   const loginBtn = document.querySelector<HTMLButtonElement>('button');
  //   expect(loginBtn).toBeInTheDocument();
  //
  //   if (!loginBtn) return;
  //
  //   const usernameInput = getByPlaceholderText('Username');
  //   expect(usernameInput).toBeInTheDocument();
  //
  //   const passwordInput = getByPlaceholderText('Password');
  //   expect(passwordInput).toBeInTheDocument();
  //
  //   // enter mock value in the inputs
  //   usernameInput.setAttribute('value', 'username');
  //   passwordInput.setAttribute('value', 'password');
  //
  //   act(() => {
  //     // click the login button
  //     loginBtn.dispatchEvent(new MouseEvent('click', { bubbles: true }));
  //   });
  //
  //   // now loading class should attached to this button
  //   const classname = loginBtn.className;
  //   expect(classname.includes('ant-btn-loading')).toBe(true);
  // });
});
