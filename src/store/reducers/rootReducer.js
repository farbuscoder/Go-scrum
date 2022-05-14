//Funcion que nos permite agrupar todas las funciones reductoras
import { combineReducers } from "redux";

// Funcion reductora de tareas
import { tasksReducer } from "./tasksReducer";

//Funcion root Reducer

const rootReducer = combineReducers({
  tasksReducer,
});

export default rootReducer;
