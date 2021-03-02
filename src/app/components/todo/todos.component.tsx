import * as React from "react";
import { ChangeEvent } from "react";
import { ComponentViewState, DIContext } from "@helpers";
import { Todo } from "@models";
import "./todo.style.css";

const Todos: React.FC = () => {
  const [todo, setTodo] = React.useState<Todo>({
    name: "",
    id: Math.floor(Math.random() * 10000),
  });
  const [successReaction, setSuccessReaction] = React.useState("");
  const [failReaction, setFailReaction] = React.useState("");

  const [
    componentState,
    setComponentState,
  ] = React.useState<ComponentViewState>(ComponentViewState.DEFAULT);

  const inputValue = (e: ChangeEvent<HTMLInputElement>) => {
    setTodo({ ...todo, name: e.target.value });
  };

  const dependencies = React.useContext(DIContext);
  const { todoService, translation } = dependencies;
  const submitBtn = async (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const response = await todoService.addTodo(todo.name, todo.id);
    if (response.data) {
      setComponentState(ComponentViewState.LOADED);
      setSuccessReaction(`${translation.t("SUCCESSMSG")}`);
      setTimeout(setSuccessReaction, 2000);
    } else {
      setComponentState(ComponentViewState.ERROR);
      setFailReaction(`${translation.t("ERRORMSG")}`);
      setTimeout(setFailReaction, 2000);
    }
    setTodo({ name: "", id: Math.floor(Math.random() * 100000) });
  };

  /* Input element to Add todo items into localStorage */

  return (
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
      <span className="success">{successReaction}</span>
      <span className="danger">{failReaction}</span>
    </div>
  );
};
export default Todos;
