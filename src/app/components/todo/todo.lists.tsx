import * as React from "react";
import { useState } from "react";
import { ChangeEvent } from "react";
import { DIContext } from "@helpers";
import { Todo } from "@models";
import "./todo.style.css";

/***  To show the list of todos but not implemented yet ***/

interface Props {
  todo: Todo;
  id: number;
  onSelect: (id: number) => void;
  editItem: (names: string, ids: number) => void;
}
const TodoLists = ({ todo, id, onSelect, editItem }: Props) => {
  const dependencies = React.useContext(DIContext);
  const { translation } = dependencies;
  const [state, setState] = useState(false);
  const toggle = (id: number) => {
    setState(!state);
  };

  const [name, setName] = React.useState("");
  const inputVal = (e: ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const submitEdit = () => {
    editItem(name, id);
    setState(false);
  };

  return (
    <>
      {state ? (
        <form onSubmit={submitEdit} className="form-center">
          <div className="form-group mx-sm-3 mb-2">
            <div className="todo-style">
              <div className="small-input">
                <input
                  type="text"
                  className="form-control"
                  value={name}
                  name={name}
                  onChange={inputVal}
                  required
                />
              </div>
              <div className="save-btn">
                <button type="submit" className="btn btn-primary">
                  {translation.t("SAVE")}
                </button>
              </div>
            </div>
          </div>
        </form>
      ) : (
        <div className="todo-style">
          <div className="list-items">
            <li>{todo.name}</li>
          </div>
          <div className="btn-align">
            <button
              type="button"
              className="btn btn-outline-danger"
              onClick={() => {
                onSelect(id);
              }}
            >
              {translation.t("DELETE")}
            </button>
            <button
              type="button"
              className="btn btn-outline-secondary"
              onClick={() => {
                toggle(id);
              }}
            >
              {translation.t("EDIT")}
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default TodoLists;
