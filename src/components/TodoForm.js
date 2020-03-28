import React, { useState, useContext, useEffect } from "react";

import TodosContext from "../Context";

export default function TodoForm() {
  const [todo, setTodo] = useState("");
  const {
    state: { currentTodo = {} },
    dispatch
  } = useContext(TodosContext);

  useEffect(() => {
    if (currentTodo.text) {
      setTodo(currentTodo.text);
    }
  }, [currentTodo.text]);

  const handleSubmit = event => {
    event.preventDefault();

    // Check if there is a current todo in state for editing existing todo
    if (currentTodo.text) {
      dispatch({ type: "UPDATE_TODO", payload: todo });
    } else {
      dispatch({ type: "ADD_TODO", payload: todo });
    }

    setTodo("");
  };

  return (
    <form onSubmit={handleSubmit} className="flex justify-center p-5">
      <input
        type="text"
        onChange={event => setTodo(event.target.value)}
        value={todo}
        className="border-black border-solid border-2"
      />
    </form>
  );
}
