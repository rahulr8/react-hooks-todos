import React, { useState, useContext, useEffect } from "react";
import Axios from "axios";
import uuidv4 from "uuid/v4";

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
    } else {
      setTodo("");
    }
  }, [currentTodo.text]);

  const handleSubmit = async event => {
    event.preventDefault();

    // Check if there is a current todo in state for editing existing todo
    if (currentTodo.text) {
      const response = await Axios.patch(
        `https://hooks-api-pi.now.sh/todos/${currentTodo.id}`,
        {
          text: todo
        }
      );
      dispatch({ type: "UPDATE_TODO", payload: response.data });
    } else {
      const response = await Axios.post("https://hooks-api-pi.now.sh/todos", {
        id: uuidv4(),
        text: todo,
        complete: false
      });
      dispatch({ type: "ADD_TODO", payload: response.data });
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
