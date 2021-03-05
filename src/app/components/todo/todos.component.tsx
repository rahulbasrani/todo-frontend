import * as React from "react";

import { useEffect } from "react";
import { ChangeEvent } from "react";
import TodoLists from "./todo.lists";
import { Todo } from "@models";
import { ComponentViewState, DIContext } from "@helpers";
import "./todo.style.css";

const Todos: React.FC = () => {
  const dependencies = React.useContext(DIContext);
  const { todoService, translation } = dependencies;

  const [todo, setTodo] = React.useState<Todo>({
    name: "",
    id: Math.floor(Math.random() * 10000),
  });

  const [objects, setObjects] = React.useState<Todo[]>([]);
  const [successReaction, setSuccessReaction] = React.useState("");

  const [
    componentState,
    setComponentState,
  ] = React.useState<ComponentViewState>(ComponentViewState.DEFAULT);

  const isError = componentState === ComponentViewState.ERROR;
  const printTodo = async () => {
    const response = await todoService.getTodos();
    if (response.data) {
      setObjects(response.data);
    } else {
      setComponentState(ComponentViewState.ERROR);
      setTimeout(setComponentState, 2000);
    }
  };
  useEffect(() => {
    printTodo();
  }, []);

  const inputValue = (e: ChangeEvent<HTMLInputElement>) => {
    setTodo({ ...todo, name: e.target.value });
  };

  const submitBtn = async (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const response = await todoService.addTodo(todo.name, todo.id);
    if (response.data) {
      setComponentState(ComponentViewState.LOADED);
      setSuccessReaction(`${translation.t("SUCCESSMSG")}`);
      setTimeout(setSuccessReaction, 2000);
    } else {
      setComponentState(ComponentViewState.ERROR);

      setTimeout(setComponentState, 2000);
    }
    let todoName = todo.name;
    setTodo({ name: "", id: Math.floor(Math.random() * 100000) });
    setObjects([
      ...objects,
      {
        name: todoName,
        id: todo.id,
      },
    ]);
  };

  const deleteItems = async (id: number) => {
    const response = await todoService.deleteTodo(id);
    if (response.data) {
      setObjects((oldItems: { name: string; id: number }[]) => {
        return oldItems.filter((arrElem: {}, index: number) => {
          return index != id;
        });
      });

      setComponentState(ComponentViewState.LOADED);
      setSuccessReaction(`${translation.t("DELETEMSG")}`);
      setTimeout(setSuccessReaction, 2000);
    } else {
      setComponentState(ComponentViewState.ERROR);
      setTimeout(setComponentState, 2000);
    }
  };

  const editItems = async (names: string, ids: number) => {
    const response = await todoService.editTodo(names, ids);
    const responseGetTodo = await todoService.getTodos();
    if (response.data && responseGetTodo.data) {
      setObjects(responseGetTodo.data);
      setComponentState(ComponentViewState.LOADED);
      setSuccessReaction(`${translation.t("SUCCESSMSG")}`);
      setTimeout(setSuccessReaction, 2000);
    } else {
      setComponentState(ComponentViewState.ERROR);
      setTimeout(setComponentState, 2000);
    }
  };

  return (
    <>
      <div className="form-center">
        <form className="form-inline center-form">
          <div className="form-group mx-sm-3 mb-2">
            <input
              type="text"
              placeholder={translation.t("ENTER_INPUTS")}
              className="form-control ml-8"
              onChange={inputValue}
              value={todo.name}
            />
            <button
              type="submit"
              onClick={submitBtn}
              className="btn btn-outline-success"
            >
              {translation.t("ADD_INPUT")}
            </button>
          </div>
        </form>
      </div>
      <div className="align-bottom">
        {objects.map((elemVal: { name: string; id: number }, index: number) => {
          return (
            <TodoLists
              key={index}
              text={elemVal}
              id={index}
              onSelect={deleteItems}
              editItems={editItems}
            />
          );
        })}
      </div>
      <div>
        <span className="success">{successReaction}</span>
        {isError && (
          <span className="danger">{`${translation.t("ERRORMSG")}`}</span>
        )}
      </div>
    </>
  );
};
export default Todos;
