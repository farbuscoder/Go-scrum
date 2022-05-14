//React
import react, { useState, useEffect } from "react";

//React router dom
import { Link, useNavigate } from "react-router-dom";

//Formik
import { Formik, Form, Field, ErrorMessage } from "formik";

//Css
import "../Auth-styles.css";

//Libraries
import * as Yup from "yup";
import { v4 as uuidv4 } from "uuid";
import Switch from "react-switch";

const { REACT_APP_API_ENDPOINT } = process.env;

export const Register = () => {
  const [data, setData] = useState([]);
  const [checked, setChecked] = useState(false);
  const handleChange = (nextChecked) => {
    setChecked(nextChecked);
  };
  const navigate = useNavigate();

  const url = `${REACT_APP_API_ENDPOINT}/auth/data`;
  const urlRegister = `${REACT_APP_API_ENDPOINT}/auth/register`;

  function toRegister(user) {
    fetch(urlRegister, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ user }),
    })
      .then((response) => response.json())
      .then((data) =>
        navigate("/registered/" + data?.result?.user?.teamID, { replace: true })
      );
  }

  useEffect(() => {
    fetch(url)
      .then((response) => response.json())
      .then((data) => setData(data.result));
  }, []);

  const required = "* Campo obligatorio";

  //ValidationSchema
  const validationSchema = Yup.object().shape({
    userName: Yup.string()
      .min(4, "El titulo debe ser mayor a 4 caracteres.")
      .required(required),
    password: Yup.string().required(required),
    email: Yup.string().email("Debe ser un email valido").required(required),
    teamID: Yup.string(),
    role: Yup.string().required(required),
    continent: Yup.string().required(required),
    region: Yup.string(),
  });

  return (
    <>
      <div className="auth">
        <Formik
          initialValues={{
            email: "",
            password: "",
            userName: "",
            teamID: "",
            role: "",
            continent: "",
            region: "",
            switch: false,
          }}
          validationSchema={validationSchema}
          onSubmit={(values, { resetForm }) => {
            resetForm();
            let user = {};

            let region = "";

            if (values.region === "Brasil") {
              region = "Brazil";
            } else if (values.region === "America del Norte") {
              region = "Otro";
            } else {
              region = values.region;
            }

            const teamID = checked ? values.teamID : uuidv4();

            user = {
              email: values.email,
              password: values.password,
              userName: values.userName,
              role: values.role,
              teamID: teamID,
              continent: values.continent,
              region: region,
            };
            toRegister(user);
          }}
        >
          {({ errors, values }) => (
            <Form>
              <h2>Registro</h2>
              <div>
                <label>Nombre de usuario:</label>
                <Field
                  type="text"
                  name="userName"
                  placeholder="Ingrese un nombre de usuario"
                  className={errors.userName ? "input error-border" : "input"}
                />
                <ErrorMessage
                  name="username"
                  component={() => {
                    return <div className="error">{errors.username}</div>;
                  }}
                />
              </div>
              <div>
                <label>Email</label>
                <Field
                  type="mail"
                  name="email"
                  placeholder="Ingrese un corre electronico"
                  className={errors.email ? "input error-border" : "input"}
                />
                <ErrorMessage
                  name="email"
                  component={() => {
                    return <div className="error">{errors.email}</div>;
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

              <div>
                <label>
                  Perteneces a un equipo de go-scrum?
                  <Switch
                    onChange={handleChange}
                    checked={checked}
                    className="react-switch"
                  />
                </label>

                {checked ? (values.switch = true) : (values.switch = false)}
              </div>
              <>
                {values.switch ? (
                  <div>
                    <label>Por introduce el identificador de equipo:</label>

                    <Field
                      name="teamID"
                      placeholder="teamID"
                      value={values.teamID}
                      type="text"
                    />
                  </div>
                ) : null}
              </>
              <div>
                <label>Rol:</label>
                <Field
                  className={
                    errors.role ? "input-select error-border" : "input-select"
                  }
                  as="select"
                  name="role"
                >
                  <option value="">Elige una opcion</option>
                  {(data.Rol ? data.Rol : []).map((option, idx) => {
                    return (
                      <option key={idx} value={option}>
                        {option}
                      </option>
                    );
                  })}
                </Field>
                <ErrorMessage
                  name="role"
                  component={() => {
                    return <div className="error">{errors.role}</div>;
                  }}
                />
              </div>
              <div>
                <label>Continente:</label>
                <Field
                  className={
                    errors.continent
                      ? "input-select error-border"
                      : "input-select"
                  }
                  as="select"
                  name="continent"
                >
                  <option value="">Elige una categoria</option>
                  {(data.continente ? data.continente : []).map(
                    (option, idx) => {
                      return (
                        <option key={idx} value={option}>
                          {option}
                        </option>
                      );
                    }
                  )}
                </Field>
                <ErrorMessage
                  name="continent"
                  component={() => {
                    return <div className="error">{errors.continent}</div>;
                  }}
                />
              </div>
              {values.continent === "America" ? (
                <div>
                  <label>Region:</label>
                  <Field
                    className={
                      errors.region
                        ? "input-select error-border"
                        : "input-select"
                    }
                    as="select"
                    name="region"
                  >
                    <option value="">Elige una categoria</option>
                    {(data.region ? data.region : []).map((option, idx) => {
                      return (
                        <option key={idx} value={option}>
                          {option}
                        </option>
                      );
                    })}
                  </Field>
                  <ErrorMessage
                    name="region"
                    component={() => {
                      return <div className="error">{errors.region}</div>;
                    }}
                  />
                </div>
              ) : (
                <>
                  <div style={{ display: "none" }}>
                    {(values.region = "Otro")}
                  </div>
                </>
              )}

              <button
                style={{ cursor: "pointer" }}
                className="btn-login"
                type="submit"
              >
                Enviar
              </button>
              <div className="link-to">
                Ya tienes cuenta?, <Link to="/login"> Inicia sesion.</Link>
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
