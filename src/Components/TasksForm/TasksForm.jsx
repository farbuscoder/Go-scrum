import React from "react";

//Css
import "./TasksForm-styles.css";
import "react-toastify/dist/ReactToastify.css";

//Formik
import { Formik, Form, Field, ErrorMessage } from "formik";

//Libraries
import * as Yup from "yup";
import { ToastContainer, toast } from "react-toastify";

//redux
import { useDispatch, useSelector } from "react-redux";

import { toCreateTask } from "../../store/actions/tasksActions";

const { REACT_APP_API_ENDPOINT } = process.env;
export const TasksForm = () => {
  const required = "* Campo obligatorio";

  const dispatch = useDispatch();

  const url = `${REACT_APP_API_ENDPOINT}/task`;

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

  const token = localStorage.getItem("token");

  const creatingNewTask = (task) => dispatch(toCreateTask(task));

  const validationSchema = Yup.object().shape({
    title: Yup.string()
      .min(6, "El titulo debe ser mayor a 6 caracteres.")
      .max(50, "El titulo no debe ser mayor a 50 caracteres")
      .required(required),
    status: Yup.string().required(required),
    importance: Yup.string().required(required),
    description: Yup.string()
      .max(
        400,
        "La descripcion no puede superar los 400 caracteres de longitud"
      )
      .min(6, "La descripcion debe superar los 6 caracteres")
      .required(required),
  });

  return (
    <>
      <section className="tasks-form">
        <h2>Crear Tarea</h2>
        <p>Crea tus tareas</p>
        <Formik
          initialValues={{
            title: "",
            status: "",
            importance: "",
            description: "",
          }}
          validationSchema={validationSchema}
          onSubmit={(values, { resetForm }) => {
            resetForm();
            let tasksList = [];
            let task = {};

            task = {
              title: values.title,
              status: values.status,
              importance: values.importance,
              description: values.description,
            };

            creatingNewTask(task);
          }}
        >
          {({ errors }) => (
            <Form>
              <div>
                <label>Titulo:</label>
                <Field
                  type="title"
                  name="title"
                  placeholder="Titulo de la tarea"
                  className={errors.title ? "error-border" : ""}
                />
                <ErrorMessage
                  name="title"
                  component={() => {
                    return <div className="error">{errors.title}</div>;
                  }}
                />
              </div>
              <div>
                <label>Estado:</label>
                <Field
                  className={
                    errors.status ? "input-select error-border" : "input-select"
                  }
                  as="select"
                  name="status"
                >
                  <option value="">Elige un estado</option>
                  <option value="NEW">Nuevo</option>
                  <option value="IN PROGRESS">En proceso</option>
                  <option value="FINISHED">Finalizada</option>
                </Field>
                <ErrorMessage
                  name="status"
                  component={() => {
                    return <div className="error">{errors.status}</div>;
                  }}
                />
              </div>
              <div>
                <label>Prioridad:</label>
                <Field
                  className={
                    errors.importance
                      ? "input-select error-border"
                      : "input-select"
                  }
                  as="select"
                  name="importance"
                >
                  <option value="">Elige la prioridad</option>
                  <option value="LOW">Baja</option>
                  <option value="MEDIUM">Media</option>
                  <option value="HIGH">Alta</option>
                </Field>
                <ErrorMessage
                  name="importance"
                  component={() => {
                    return <div className="error">{errors.importance}</div>;
                  }}
                />
              </div>
              <div>
                <label>Descripcion:</label>
                <Field
                  as="textarea"
                  id="description"
                  name="description"
                  className={
                    errors.description
                      ? "input-textArea error-border"
                      : "input-textArea"
                  }
                  placeholder="Escribe una descripcion"
                />
                <ErrorMessage
                  name="description"
                  component={() => {
                    return <div className="error">{errors.description}</div>;
                  }}
                />
              </div>
              <button type="submit">Crear</button>
            </Form>
          )}
        </Formik>
        <ToastContainer
          position="top-center"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </section>
    </>
  );
};
