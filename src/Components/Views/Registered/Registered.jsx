import react from "react";
import { useParams } from "react-router-dom";

export default function Registered() {
  const { teamID } = useParams();

  return (
    <>
      <div className="container">
        <h1>Registered </h1>
        <p>El teamID de tu equipo es: {teamID}</p>
      </div>
    </>
  );
}
