import { TASKS_REQUEST, TASKS_SUCCESS, TASKS_FAILURE } from "../types";
import { ToastContainer, toast } from "react-toastify";

const notify = (message) =>
  toast.success(message, {
    position: "top-center",
    autoClose: 2500,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });

const { REACT_APP_API_ENDPOINT } = process.env;
const url = REACT_APP_API_ENDPOINT;

export const tasksRequest = () => ({
  type: TASKS_REQUEST,
});
export const tasksSuccess = (data) => ({
  type: TASKS_SUCCESS,
  payload: data,
});
export const tasksFailure = (error) => ({
  type: TASKS_FAILURE,
  payload: error,
});

const token = localStorage.getItem("token");

export const getTasks = (path) => (dispatch) => {
  dispatch(tasksRequest());
  fetch(`${url}/task${path}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((data) => dispatch(tasksSuccess(data.result)))
    .catch((error) => dispatch(tasksFailure(error)));
};

export const deleteTask = (id) => (dispatch) => {
  dispatch(tasksRequest());
  fetch(`${url}/task/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((data) => {
      dispatch(getTasks(""));
      notify("Tarea eliminada correctamente ");
    })
    .catch((error) => dispatch(tasksFailure(error)));
};

export const editCardStatus = (data) => (dispatch) => {
  //dispatch(tasksRequest());

  const statusArray = ["NEW", "IN PROGRESS", "FINISHED"];

  console.log(data);

  const newStatusIndex =
    statusArray.indexOf(data.status) > 1
      ? 0
      : statusArray.indexOf(data.status) + 1;

  fetch(`${url}/task/${data._id}`, {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      task: {
        title: data.title,
        importance: data.importance,
        status: statusArray[newStatusIndex],
        description: data.description,
      },
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      dispatch(getTasks(""));
    })
    .catch((error) => dispatch(tasksFailure(error)));
};

export const toCreateTask = (task) => (dispatch) => {
  dispatch(tasksRequest());
  fetch(`${url}/task`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ task }),
  })
    .then((response) => response.json())
    .then((data) => {
      dispatch(getTasks(""));
      notify("Tarea creada correctamente");
    })
    .catch((error) => dispatch(tasksFailure(error)));
};
