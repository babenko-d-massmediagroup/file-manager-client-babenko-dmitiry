import { Box, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

export const InfoContainer = () => {
  const navigate = useNavigate();
  return (
    <Box justifyContent={"center"} display={"flex"}>
      <Box>
        <Button onClick={() => navigate("/info")}>My files</Button>
      </Box>
    </Box>
  );
};
