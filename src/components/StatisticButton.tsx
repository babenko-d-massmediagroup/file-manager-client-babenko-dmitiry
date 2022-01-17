import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

export const StatisticButton = () => {
  const navigate = useNavigate();
  return <Button onClick={() => navigate("/statistic")}>Get Statistics</Button>;
};
