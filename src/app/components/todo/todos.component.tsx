import * as React from "react";
import { ChangeEvent } from "react";
import { ComponentViewState, DIContext } from "@helpers";
import "./todo.style.css";

const Todos: React.FC = () => {
  const [name, setName] = React.useState({
    names: "",
    index: Math.floor(Math.random() * 10000),
  });

  const [
    componentState,
    setComponentState,
  ] = React.useState<ComponentViewState>(ComponentViewState.DEFAULT);
  const inputValue = (e: ChangeEvent<HTMLInputElement>) => {
    setName({ ...name, names: e.target.value });
  };
  let reaction = "";
  let clsName = "";
  const dependencies = React.useContext(DIContext);
  const { todoService, translation } = dependencies;
  const submitBtn = async (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const response = await todoService.addTodo(name.names, name.index);
    if (response.data) {
      setComponentState(ComponentViewState.LOADED);
    } else {
      setComponentState(ComponentViewState.ERROR);
    }
    setName({ names: "", index: Math.floor(Math.random() * 10000) });
  };
  if (componentState == ComponentViewState.LOADED) {
    reaction = `${translation.t("SUCCESSMSG")}`;
    clsName = `${translation.t("CLSNAMEMSUCCESS")}`;
  } else if (componentState == ComponentViewState.ERROR) {
    reaction = `${translation.t("ERRORMSG")}`;
    clsName = `${translation.t("CLSNAMEREJECT")}`;
  }
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
            value={name.names}
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
      <div className={clsName}>{reaction}</div>
    </div>
  );
};
export default Todos;
