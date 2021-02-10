import * as React from "react";
import { ChangeEvent } from "react";
import { DIContext } from "@helpers";
const Todos: React.FC = () => {
  const [name, setName] = React.useState("");

  const inputValue = (e: ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };
  const dependencies = React.useContext(DIContext);
  const { todoService, translation } = dependencies;

  const submitBtn = (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    console.log(name);
    todoService.addTodo(name);
    setName("");
  };
  return (
    <>
      <form>
        <input
          type="text"
          placeholder={translation.t("ENTER_INPUTS")}
          onChange={inputValue}
          value={name}
        />
        <button type="submit" onClick={submitBtn}>
          {translation.t("ADD_INPUT")}
        </button>
      </form>
    </>
  );
};

export default Todos;
