import { Todo } from "@models";
import { ServiceResponse } from "../api";
export interface TodoService {
<<<<<<< Updated upstream
  addTodo: (name: string, id: number) => Promise<ServiceResponse<Todo>>;
=======
  addTodo: (name: string) => void;
  deleteTodo: (id: number) => void;
  editTodo: (id: number, text: string) => void;
  getTodos: () => string[];
>>>>>>> Stashed changes
}
