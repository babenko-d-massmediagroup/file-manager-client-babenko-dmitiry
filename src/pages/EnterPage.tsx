import { Navigate } from "react-router-dom";

export const EnterPage = () => {
  if (!localStorage.getItem("token")) {
    return <Navigate to="/login" />;
  }

  return <Navigate to="/home" />;
};
