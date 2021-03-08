import { TodoService } from "@services";
import i18next from "i18next";
import { RouteComponentProps } from "react-router";
export interface AppDependenciesProps {
  todoService: TodoService;
  translation: i18next.i18n;
}

export type AppProps = RouteComponentProps;
