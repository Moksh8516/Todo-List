import { createContext, useContext } from "react";

export const TodoContext = createContext(
  {
    todos: [{
      id: 1,
      todo: "This is a Todo Msg",
      complete: false
    }],
    addTodo: (todo) => { },
    updateTodo: (todo, id) => { },
    removeTodo: (id) => { },
    toggleBtn: (id) => { }
  }
);

export default function useTodo() {
  return useContext(TodoContext);
}

export const TodoProvider = TodoContext.Provider;

