import * as React from "react";
import { useState } from "react";
import { ChangeEvent } from "react";
import { DIContext } from "@helpers";
import "./todo.style.css";

/***  To show the list of todos but not implemented yet ***/

interface Props {
  text: string;
  id: number;
  onSelect: (id: number) => void;
  editItems: (id: number, text: string) => void;
}
const TodoLists = ({ text, id, onSelect, editItems }: Props) => {
  const [state, setState] = useState(false);
  const toggle = () => {
    setState(!state);
  };

  const [name, setName] = useState("");
  const inputVal = (e: ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const submitEdit = (e: React.FormEvent<HTMLFormElement>) => {
    editItems(id, name);
    setName("");
  };

  const dependencies = React.useContext(DIContext);
  const { todoService, translation } = dependencies;

  return (
    <>
      {state ? (
        <form onSubmit={submitEdit}>
          <div className="form-group">
            <div className="todo_style">
              <div className="todo_style">
                <div className="small_input">
                  <input
                    type="text"
                    className="form-control"
                    value={name}
                    name={name}
                    onChange={inputVal}
                  />
                </div>
              </div>
              <button type="submit" className="btn btn-primary">
                {translation.t("SAVE")}
              </button>
            </div>
          </div>
        </form>
      ) : (
        <div className="todo_style">
          <button
            type="button"
            className="btn btn-danger"
            onClick={() => {
              onSelect(id);
            }}
          >
            {translation.t("DELETE")}
          </button>
          <li>{text}</li>
          <div className="todo_style">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => {
                toggle();
                editItems(id, name);
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
