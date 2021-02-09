import { List } from "lodash";
import { APIServiceImpl } from "../api";

import { TodoService } from "./todo.service";

export default class TodoServiceImpl
  extends APIServiceImpl
  implements TodoService {
  static readonly RESOURCE = "/todo";
  addTodo(name: string): void {
    let data = localStorage.getItem("todo");
    let data_arr = typeof data == "string" ? data : "";
    if (data_arr.length == 0 || data_arr[0] != "[")
      data_arr = "[" + data_arr + "]";
    let my_array = JSON.parse(data_arr);
    my_array.push(name);
    localStorage.setItem("todo", JSON.stringify(my_array));
  }
}
