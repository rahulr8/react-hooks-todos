import React, { useState, useEffect, useContext, useReducer } from "react";
import ReactDOM from "react-dom";
import Axios from "axios";

import TodosContext from "./Context";
import todosReducer from "./Reducer";
import TodoList from "./components/TodoList";
import TodoForm from "./components/TodoForm";

import * as serviceWorker from "./serviceWorker";

const useAPI = endpoint => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const response = await Axios.get(endpoint);
      setData(response.data);
    };

    getData();
  }, [endpoint]);

  return data;
};

const App = () => {
  const initialState = useContext(TodosContext);
  const [state, dispatch] = useReducer(todosReducer, initialState);
  const savedTodos = useAPI("https://hooks-api-pi.now.sh/todos");

  useEffect(() => {
    dispatch({
      type: "GET_TODOS",
      payload: savedTodos
    });
  }, [savedTodos]);

  return (
    <TodosContext.Provider value={{ state, dispatch }}>
      <TodoForm />
      <TodoList />
    </TodosContext.Provider>
  );
};

ReactDOM.render(
  <React.StrictMode>
    {/* Wrap the App with the Provider */}
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);

serviceWorker.unregister();
