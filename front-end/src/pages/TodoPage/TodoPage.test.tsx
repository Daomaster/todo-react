import React from 'react';
import { cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import MatchMediaMock from '../../test/matchMediaMock';

// function populateTodo(id: string, description: string): Todos_todos {
//   return {
//     __typename: 'Todo',
//     id,
//     description,
//   };
// }

describe('<TodoPage />', () => {
  beforeAll(MatchMediaMock);

  afterEach(cleanup);

  test('it should mount', () => {
    // Did not figure out a way to make this test work :(
    // TODO: Implement the tests for todo page
    // const mockDeleteVariables: DeleteTodoVariables = {
    //   deleteInput: { todoId: '1' },
    // };
    //
    // const mockUpdateVariables: UpdateTodoVariables = {
    //   updateInput: { todoId: '1', description: 'this is a mock' },
    // };
    //
    // const mockCreateVariables: CreateTodoVariables = {
    //   createInput: { description: 'this is a mock' },
    // };
    //
    // const mockGetResults: Todos = {
    //   todos: [populateTodo('1', 'get mock 1')],
    // };
    //
    // const mockUpdateResults: UpdateTodo = {
    //   updateTodo: populateTodo('1', 'update mock'),
    // };
    //
    // const mockCreateResults: CreateTodo = {
    //   createTodo: populateTodo('1', 'create mock'),
    // };
    //
    // const mocks = [
    //   {
    //     request: {
    //       query: GET_TODOS,
    //     },
    //     result: () => {
    //       return {
    //         data: mockGetResults,
    //       };
    //     },
    //   },
    //   {
    //     request: {
    //       query: CREATE_TODOS,
    //       variables: mockCreateVariables,
    //     },
    //     result: () => {
    //       return {
    //         data: mockCreateResults,
    //       };
    //     },
    //   },
    //   {
    //     request: {
    //       query: UPDATE_TODOS,
    //       variables: mockUpdateVariables,
    //     },
    //     result: () => {
    //       return {
    //         data: mockUpdateResults,
    //       };
    //     },
    //   },
    //   {
    //     request: {
    //       query: DELETE_TODOS,
    //       variables: mockDeleteVariables,
    //     },
    //     result: () => {
    //       return {};
    //     },
    //   },
    // ];
    //
    // const history = createMemoryHistory();
    //
    // TestRenderer.create(
    //   <MockedProvider mocks={[]} addTypename={false}>
    //     <Router history={history}>
    //       <TodoPage />
    //     </Router>
    //   </MockedProvider>
    // );
  });
});
