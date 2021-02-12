import { APIServiceImpl } from "../api";

import { TodoService } from "./todo.service";

export default class TodoServiceImpl
  extends APIServiceImpl
  implements TodoService {
  addTodo(name: string): void {
    let data = localStorage.getItem("todo");
    /****  Stringify setItem values that takes string or null  ****/
    if (data) {
      let dataArr = JSON.parse(data);
      dataArr.push(name);
      localStorage.setItem("todo", JSON.stringify(dataArr));
    } else {
      localStorage.setItem("todo", JSON.stringify([name]));
    }
  }
}
