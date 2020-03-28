import uuidv4 from "uuid/v4";

export default function reducer(state, action) {
  switch (action.type) {
    case "GET_TODOS":
      return {
        ...state,
        todos: action.payload
      };

    case "ADD_TODO":
      if (!action.payload) {
        return state;
      }
      // Same text as existing todo
      if (state.todos.findIndex(todo => todo.text === action.payload) > -1) {
        return state;
      }

      return {
        ...state,
        todos: [...state.todos, action.payload]
      };

    case "SET_CURRENT_TODO":
      return {
        ...state,
        currentTodo: action.payload
      };

    case "TOGGLE_TODO":
      const toggledTodos = state.todos.map(todo =>
        todo.id === action.payload.id ? action.payload : todo
      );
      return {
        ...state,
        todos: toggledTodos
      };

    case "UPDATE_TODO":
      if (!action.payload) {
        return state;
      }
      // Same text as existing todo
      if (state.todos.findIndex(todo => todo.text === action.payload) > -1) {
        return state;
      }
      const updatedTodo = {
        ...action.payload
      };
      const updatedTodoIndex = state.todos.findIndex(
        todo => todo.id === state.currentTodo.id
      );
      const updatedTodos = [
        ...state.todos.slice(0, updatedTodoIndex),
        updatedTodo,
        ...state.todos.slice(updatedTodoIndex + 1)
      ];
      return {
        ...state,
        todos: updatedTodos,
        currentTodo: {}
      };

    case "REMOVE_TODO":
      const filteredTodos = state.todos.filter(
        todo => todo.id !== action.payload.id
      );
      const isRemovedTodo =
        state.currentTodo.id === action.payload.id ? {} : state.currentTodo;
      return {
        ...state,
        currentTodo: isRemovedTodo,
        todos: filteredTodos
      };

    default:
      return state;
  }
}
