import react from "react";
import { Header } from "../../Header/Header";
import { FaHandsHelping } from "react-icons/fa";
import "./Donate-styles.css";

export const Donate = () => {
  return (
    <>
      <div className="donate-container">
        <div>
          <h2>
            Puedes colaborar para que este proyecto continue siendo posible,
            gracias!{" "}
          </h2>
          <FaHandsHelping style={{ fontSize: "70px" }} />
          <a href="https://mpago.la/2A4g4A4" target="_blank" rel="noreferrer">
            Donar
          </a>
        </div>
      </div>
    </>
  );
};
