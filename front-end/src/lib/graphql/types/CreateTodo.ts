/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { CreateTodoInput } from "./../../../../types/globalTypes";

// ====================================================
// GraphQL mutation operation: CreateTodo
// ====================================================

export interface CreateTodo_createTodo {
  __typename: "Todo";
  id: string;
  description: string;
}

export interface CreateTodo {
  createTodo: CreateTodo_createTodo;
}

export interface CreateTodoVariables {
  createInput: CreateTodoInput;
}
