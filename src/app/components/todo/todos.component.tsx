import * as React from "react";
import { useEffect } from "react";
import { ChangeEvent } from "react";
<<<<<<< Updated upstream
import { ComponentViewState, DIContext } from "@helpers";
import "./todo.style.css";

const Todos: React.FC = () => {
  const [todo, setTodo] = React.useState({
    name: "",
    index: Math.floor(Math.random() * 10000),
  });
  const [successReaction, setSuccessReaction] = React.useState("");
  const [failReaction, setFailReaction] = React.useState("");

  const [
    componentState,
    setComponentState,
  ] = React.useState<ComponentViewState>(ComponentViewState.DEFAULT);
=======
import TodoLists from "./todo.lists";
import { DIContext } from "@helpers";
import "./todo.style.css";

const Todos: React.FC = () => {
  useEffect(() => {
    setItems(() => {
      return [...todoService.getTodos()];
    });
  });
  const [name, setName] = React.useState("");
  const [items, setItems] = React.useState([] as any);
  const dependencies = React.useContext(DIContext);
  const { todoService, translation } = dependencies;
>>>>>>> Stashed changes

  const inputValue = (e: ChangeEvent<HTMLInputElement>) => {
    setTodo({ ...todo, name: e.target.value });
  };

<<<<<<< Updated upstream
  const dependencies = React.useContext(DIContext);
  const { todoService, translation } = dependencies;
  const submitBtn = async (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const response = await todoService.addTodo(todo.name, todo.index);
    if (response.data) {
      setComponentState(ComponentViewState.LOADED);
      setSuccessReaction(`${translation.t("SUCCESSMSG")}`);
      setTimeout(setSuccessReaction, 2000);
    } else {
      setComponentState(ComponentViewState.ERROR);
      setFailReaction(`${translation.t("ERRORMSG")}`);
      setTimeout(setFailReaction, 2000);
    }
    setTodo({ name: "", index: Math.floor(Math.random() * 100000) });
  };

  /* Input element to Add todo items into localStorage */

  return (
    <div className="form-center">
      <form className="form-inline center-form">
=======
  const submitBtn = (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    todoService.addTodo(name);
    setItems(() => {
      return [...todoService.getTodos()];
    });
    setName("");
  };

  const deleteItems = (id: number) => {
    todoService.deleteTodo(id);
    setItems((oldItems: string[]) => {
      return oldItems.filter((arrElem, index) => {
        return index != id;
      });
    });
  };

  const editItems = (id: number, text: string) => {
    todoService.editTodo(id, text);
    // items[id] = text;
  };

  return (
    <div className="bdy">
      <form className="form">
>>>>>>> Stashed changes
        <div className="form-group mx-sm-3 mb-2">
          <input
            type="text"
            placeholder={translation.t("ENTER_INPUTS")}
            className="form-control ml-8"
            onChange={inputValue}
<<<<<<< Updated upstream
            value={todo.name}
=======
            name={name}
            value={name}
>>>>>>> Stashed changes
          />
          <button
            type="submit"
            onClick={submitBtn}
            className="btn btn-outline-success"
          >
            {translation.t("ADD_INPUT")}
          </button>
          {items.map((elemVal: string, index: number) => {
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
      </form>
<<<<<<< Updated upstream
      <span className="success">{successReaction}</span>
      <span className="danger">{failReaction}</span>
=======
>>>>>>> Stashed changes
    </div>
  );
};
export default Todos;
