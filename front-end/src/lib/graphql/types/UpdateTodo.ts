/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { UpdateTodoInput } from "./../../../../types/globalTypes";

// ====================================================
// GraphQL mutation operation: UpdateTodo
// ====================================================

export interface UpdateTodo_updateTodo {
  __typename: "Todo";
  id: string;
  description: string;
}

export interface UpdateTodo {
  updateTodo: UpdateTodo_updateTodo;
}

export interface UpdateTodoVariables {
  updateInput: UpdateTodoInput;
}
