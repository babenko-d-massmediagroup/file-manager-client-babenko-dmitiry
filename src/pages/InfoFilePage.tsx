import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { PlainInfo } from "../components/PlainInfo";
import { TopNavigationBar } from "../components/TopNavigationBar";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

export const InfoFilePage = () => {
  const navigate = useNavigate();
  return (
    <>
      <TopNavigationBar />
      <ArrowBackIcon onClick={() => navigate("/home")} />
      <PlainInfo />
    </>
  );
};
