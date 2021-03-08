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
  const successAddMsg = () => {
    setSuccessReaction(`${translation.t("SUCCESSMSG")}`);
    setTimeout(setSuccessReaction.bind(null, ""), 2000);
  };
  const successDelMsg = () => {
    setSuccessReaction(`${translation.t("DELETEMSG")}`);
    setTimeout(setSuccessReaction.bind(null, ""), 2000);
  };
  const failMsg = () => {
    setTimeout(setComponentState.bind(null, ""), 2000);
  };
  const getTodo = async () => {
    const response = await todoService.getTodos();
    if (response.data) {
      setObjects(response.data);
    } else {
      setComponentState(ComponentViewState.ERROR);
    }
  };
  useEffect(() => {
    getTodo();
  }, []);

  const inputValue = (e: ChangeEvent<HTMLInputElement>) => {
    setTodo({ ...todo, name: e.target.value });
  };

  const submitBtn = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const response = await todoService.addTodo(todo.name, todo.id);
    if (response.data) {
      setComponentState(ComponentViewState.LOADED);
      successAddMsg();
    } else {
      setComponentState(ComponentViewState.ERROR);
      failMsg();
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

  const deleteItem = async (id: number) => {
    const response = await todoService.deleteTodo(todo.name, id);
    if (response.data) {
      setObjects((oldItems: { name: string; id: number }[]) => {
        return oldItems.filter((arrElem: {}, index: number) => {
          return index != id;
        });
      });
      setComponentState(ComponentViewState.LOADED);
      successDelMsg();
    } else {
      setComponentState(ComponentViewState.ERROR);
      failMsg();
    }
  };

  const editItem = async (names: string, ids: number) => {
    const response = await todoService.editTodo(names, ids);
    const responseGetTodo = await todoService.getTodos();
    if (response.data && responseGetTodo.data) {
      setObjects(responseGetTodo.data);
      setComponentState(ComponentViewState.LOADED);
      successAddMsg();
    } else {
      setComponentState(ComponentViewState.ERROR);
      failMsg();
    }
  };

  return (
    <>
      <div className="form-center">
        <form className="form-inline center-form" onSubmit={submitBtn}>
          <input
            type="text"
            placeholder={translation.t("ENTER_INPUTS")}
            className="form-control ml-8"
            onChange={inputValue}
            value={todo.name}
            required
          />
          <button type="submit" className="btn btn-outline-success">
            {translation.t("ADD_INPUT")}
          </button>
        </form>
      </div>
      <div className="align-bottom">
        {objects.map((elemVal: { name: string; id: number }, index: number) => {
          return (
            <TodoLists
              key={index}
              todo={elemVal}
              id={index}
              onSelect={deleteItem}
              editItem={editItem}
            />
          );
        })}
      </div>
      <div className="msg-for-reaction">
        <span className="success">{successReaction}</span>
        {isError && (
          <span className="danger">{`${translation.t("ERRORMSG")}`}</span>
        )}
      </div>
    </>
  );
};
export default Todos;
