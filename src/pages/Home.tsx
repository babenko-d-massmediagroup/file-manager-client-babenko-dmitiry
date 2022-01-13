import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { InfoContainer } from "../components/InfoContainer";
import { TopNavigationBar } from "../components/TopNavigationBar";
import { UploadFileConainer } from "../components/UploadFileContainer";

export const HomePage = () => {
  const navigate = useNavigate();
  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/login");
    }

    axios
      .get(`http://localhost:4000/auth/validateToken`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
      .catch((e) => {
        navigate("/login");
      });
  }, []);
  return (
    <>
      <TopNavigationBar />
      <InfoContainer />
      <UploadFileConainer />
    </>
  );
};
