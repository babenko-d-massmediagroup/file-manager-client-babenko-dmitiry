import { Box } from "@mui/material";
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
      <Box
        display={"flex"}
        flexDirection={"column"}
        marginTop={"100px"}
        alignItems={"center"}
        justifyContent={"space-between"}
        height={"400px"}
      >
        <InfoContainer />
        <Box>
          <UploadFileConainer />
        </Box>
      </Box>
    </>
  );
};
