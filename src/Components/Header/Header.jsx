import react from "react";
import "./Header-styles.css";
import logo from "../../img/logo.png";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export const Header = () => {
  const navigate = useNavigate();

  const { tasks } = useSelector((state) => {
    return state.tasksReducer;
  });

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userName");
  };

  return (
    <>
      <header>
        <img src={logo} alt="go-scrum" />

        <div className="wrapper_right_header">
          {/*<span>
            Estamos en el entorno: {process.env.NODE_ENV} corriendo en el puerto
            : {process.env.REACT_APP_PORT}
  </span>*/}
          <div>
            <button onClick={() => navigate("/donate", { replace: true })}>
              Donate
            </button>
          </div>
          <div className="numero-tareas">Tareas creadas: {tasks?.length} </div>
          <div>{localStorage.getItem("userName")}</div>
        </div>
        <div
          className="logout"
          onClick={() => {
            handleLogout();
            navigate("/", { replace: true });
          }}
        >
          x
        </div>
      </header>
    </>
  );
};
