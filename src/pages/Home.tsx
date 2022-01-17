import { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Box } from "@mui/material";
import { InfoContainer } from "../components/InfoContainer";
import { StatisticButton } from "../components/StatisticButton";
import { TopNavigationBar } from "../components/TopNavigationBar";
import { UploadFileConainer } from "../components/UploadFileContainer";

export const HomePage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/login");
    }

    axios
      .get(`${process.env.REACT_APP_BACKEND}/auth/validateToken`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
      .then(({ data }) => {
        if (data.status === "invalid") {
          navigate("/login");
        }
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
        <Box>
          <StatisticButton />
        </Box>
      </Box>
    </>
  );
};
