import react, { useState } from "react";

//Formik
import { Formik, Form, Field, ErrorMessage } from "formik";

//React-router-dom
import { useNavigate, Link } from "react-router-dom";

//Css
import "../Auth-styles.css";

//Libraries
import * as Yup from "yup";
import Swal from "sweetalert2";

//utils
import { swal } from "../../../../utils/swal";

export const Login = () => {
  const navigate = useNavigate();
  const required = "* Campo obligatorio";

  const { REACT_APP_API_ENDPOINT } = process.env;

  const url = `${REACT_APP_API_ENDPOINT}/auth/login`;

  function toLogin(user) {
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.status_code === 200) {
          localStorage.setItem("token", data?.result?.token);
          localStorage.setItem("userName", data?.result?.user?.userName);
          navigate("/", { replace: true });
        } else {
          swal();
        }
      });
  }

  const validationSchema = Yup.object().shape({
    userName: Yup.string()
      .min(4, "El titulo debe ser mayor a 4 caracteres.")
      .required(required),
    password: Yup.string().required(required),
  });

  return (
    <>
      <div className="auth">
        <Formik
          initialValues={{ userName: "", password: "" }}
          validationSchema={validationSchema}
          onSubmit={(values, { resetForm }) => {
            resetForm();
            let user = {};
            user = {
              userName: values.userName,
              password: values.password,
            };

            toLogin(user);

            console.log(user);
          }}
        >
          {({ errors }) => (
            <Form>
              <h2>Inicia sesion</h2>
              <div>
                <label>Username</label>
                <Field
                  type="text"
                  name="userName"
                  placeholder="Nombre de usuario"
                  className={errors.userName ? "input error-border" : "input"}
                />
                <ErrorMessage
                  name="userName"
                  component={() => {
                    return <div className="error">{errors.userName}</div>;
                  }}
                />
              </div>
              <div>
                <label>Password</label>
                <Field
                  type="password"
                  name="password"
                  placeholder="Ingrese la contraseña"
                  className={errors.password ? "input error-border" : "input"}
                />
                <ErrorMessage
                  name="password"
                  component={() => {
                    return <div className="error">{errors.password}</div>;
                  }}
                />
              </div>
              <button
                style={{ cursor: "pointer" }}
                className="btn-login"
                type="submit"
              >
                Enviar
              </button>
              <div className="link-to">
                No tienes cuenta?, <Link to="/register"> Registrame</Link>
              </div>
            </Form>
          )}

          {/*<form onSubmit={formik.handleSubmit}>
          <h1>Iniciar Sesion</h1>
          <div>
            <label>Email</label>
            <input
              type="mail"
              name="mail"
              value={formik.values}
              onChange={formik.handleChange}
            />
            {formik.errors.email && (
              <div style={{ color: "red" }}>{formik.errors.email}</div>
            )}
          </div>
          <div>
            <label>Contraseña</label>
            <input
              type="password"
              name="password"
              value={formik.values}
              onChange={formik.handleChange}
            />
            {formik.errors.password && (
              <div style={{ color: "red" }}>{formik.errors.password}</div>
            )}
          </div>
          <button type="submit">Enviar</button>
            </form>*/}
        </Formik>
      </div>
    </>
  );
};
