import { Todo } from "@models";
import { ServiceResponse } from "../api";
export interface TodoService {
  addTodo: (name: string, id: number) => Promise<ServiceResponse<Todo>>;
}
