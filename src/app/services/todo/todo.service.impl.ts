import { TodoService } from "./todo.service";
import { ServiceResponse } from "../api";
import { Todo } from "@models";

export default class TodoServiceImpl implements TodoService {
  static readonly RESOURCE = "/todo";
  async addTodo(name: string, id: number): Promise<ServiceResponse<Todo>> {
    try {
      if (name === "") throw "robbert";
      let todos = {
        name: name,
        id: id,
      };
      const todo = new Todo(todos);
      let data = localStorage.getItem("todo");
      /****  Stringify setItem values that takes string or null  ****/
      if (data) {
        let dataArr = await JSON.parse(data);
        dataArr.push(todo);
        localStorage.setItem("todo", JSON.stringify(dataArr));
      } else {
        localStorage.setItem("todo", JSON.stringify([todo]));
      }
      return new ServiceResponse<Todo>(todo);
    } catch (e) {
      return new ServiceResponse<Todo>(undefined, e);
    }
  }

  deleteTodo(id: number): void {
    let data = localStorage.getItem("todo");
    if (data) {
      let dataArr = JSON.parse(data);
      dataArr.splice(id, 1);
      localStorage.setItem("todo", JSON.stringify(dataArr));
    }
  }

  editTodo(id: number, text: string): void {
    let data = localStorage.getItem("todo");
    if (data) {
      let dataArr = JSON.parse(data);
      dataArr.splice(id, 1, text);
      localStorage.setItem("todo", JSON.stringify(dataArr));
    }
  }

  getTodos(): string[] {
    let data = localStorage.getItem("todo");
    if (data) {
      let dataArr = JSON.parse(data);
      localStorage.setItem("todo", JSON.stringify(dataArr));
      return dataArr;
    } else {
      return [];
    }
  }
}
