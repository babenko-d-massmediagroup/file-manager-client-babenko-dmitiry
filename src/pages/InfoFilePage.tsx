import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { PlainInfo } from "../components/PlainInfo";
import { TopNavigationBar } from "../components/TopNavigationBar";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Box } from "@mui/system";

export const InfoFilePage = () => {
  const navigate = useNavigate();
  return (
    <>
      <TopNavigationBar />
      <Box padding="10px 10px">
        <ArrowBackIcon onClick={() => navigate("/home")} />
      </Box>
      <PlainInfo />
    </>
  );
};
