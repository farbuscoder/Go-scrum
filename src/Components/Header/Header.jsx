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
        <h1 className="title">
          <span style={{ color: "orange" }}>Go</span>Scrum
        </h1>

        <div className="wrapper_right_header">
          {/*<span>
            Estamos en el entorno: {process.env.NODE_ENV} corriendo en el puerto
            : {process.env.REACT_APP_PORT}
  </span>*/}
          <div>
            <button
              className="donate"
              onClick={() => navigate("/donate", { replace: true })}
            >
              Donate
            </button>
          </div>
          <div>{localStorage.getItem("userName")}</div>
          <div
            className="logout"
            onClick={() => {
              handleLogout();
              navigate("/", { replace: true });
            }}
          >
            x
          </div>
        </div>
      </header>
    </>
  );
};
