import { TodoService } from "./todo.service";
import { ServiceResponse } from "../api";
import { Todo } from "@models";

export default class TodoServiceImpl implements TodoService {
  static readonly RESOURCE = "/todo";
  async addTodo(name: string, id: number): Promise<ServiceResponse<Todo>> {
    try {
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

  async deleteTodo(name: string, id: number): Promise<ServiceResponse<Todo>> {
    try {
      let todos = {
        name: name,
        id: id,
      };
      const todo = new Todo(todos);
      let data = localStorage.getItem("todo");
      if (data) {
        let dataArr = JSON.parse(data);
        todo.name = dataArr[0].name;
        dataArr.splice(id, 1);
        localStorage.setItem("todo", JSON.stringify(dataArr));
      }
      return new ServiceResponse<Todo>(todo);
    } catch (e) {
      return new ServiceResponse<Todo>(undefined, e);
    }
  }

  async editTodo(name: string, id: number): Promise<ServiceResponse<Todo>> {
    let data = localStorage.getItem("todo");
    try {
      let todos = {
        name: name,
        id: id,
      };
      const todo = new Todo(todos);
      if (data) {
        let dataArr = JSON.parse(data);
        dataArr.splice(id, 1, { name, id });
        localStorage.setItem("todo", JSON.stringify(dataArr));
      }
      return new ServiceResponse<Todo>(todo);
    } catch (e) {
      return new ServiceResponse<Todo>(undefined, e);
    }
  }

  async getTodos(): Promise<ServiceResponse<Todo[]>> {
    let data = localStorage.getItem("todo");
    try {
      let dataArr;
      if (data) {
        dataArr = JSON.parse(data);
      }
      return new ServiceResponse<Todo[]>(dataArr);
    } catch (e) {
      return new ServiceResponse<Todo[]>(undefined, e);
    }
  }
}
