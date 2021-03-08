import { Todo } from "@models";
import { ServiceResponse } from "../api";
export interface TodoService {
  addTodo: (name: string, id: number) => Promise<ServiceResponse<Todo>>;
  deleteTodo: (name: string, id: number) => Promise<ServiceResponse<Todo>>;
  editTodo: (name: string, id: number) => Promise<ServiceResponse<Todo>>;
  getTodos: () => Promise<ServiceResponse<Todo[]>>;
}
