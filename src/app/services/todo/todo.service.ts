export interface TodoService {
  addTodo: (name: string) => Promise<void>;
}
