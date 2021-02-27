export class Todo {
  name: string;
  id: number;
  constructor(todo: { [k: string]: any }) {
    this.name = todo.name;
    this.id = todo.id;
  }
}
