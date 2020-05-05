import { gql } from 'apollo-boost';

export const LOGIN = gql`
  mutation Login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      userId
      token
    }
  }
`;

export const GET_TODOS = gql`
  query Todos {
    todos {
      id
      description
    }
  }
`;
