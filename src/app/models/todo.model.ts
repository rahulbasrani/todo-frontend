export class Todo {
  name: string;
  id: number;
  constructor(todo: { name: string; id: number }) {
    this.name = todo.name;
    this.id = todo.id;
  }
}
