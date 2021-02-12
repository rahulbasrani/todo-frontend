import * as React from "react";
import { ChangeEvent } from "react";

import { DIContext } from "@helpers";
import "./todo.style.css";

const Todos: React.FC = () => {
  const [name, setName] = React.useState("");

  const inputValue = (e: ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };
  const dependencies = React.useContext(DIContext);
  const { todoService, translation } = dependencies;

  const submitBtn = (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    todoService.addTodo(name);
    setName("");
  };
  return (
    <>
      <form className="form-inline center-form">
        <div className="form-group mx-sm-3 mb-2">
          <input
            type="text"
            placeholder={translation.t("ENTER_INPUTS")}
            className="form-control ml-8"
            onChange={inputValue}
            value={name}
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
    </>
  );
};

export default Todos;
