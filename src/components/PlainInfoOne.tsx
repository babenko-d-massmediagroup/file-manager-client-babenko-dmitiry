import { Button, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useNavigate } from "react-router-dom";
import { Info } from "./PlainInfo";

export const PlainInfoOne = ({ item, index }: { item: Info; index: number }) => {
  const navigate = useNavigate();

  const fullInfo = () => {
    navigate(`/info/${item._id}`);
  };

  return (
    <Box display={"flex"} justifyContent={"space-evenly"}>
      <Typography>{index + 1}</Typography>
      <Typography>{item.filename}</Typography>
      <Typography>{item.uploadDate}</Typography>
      <Button onClick={fullInfo}>Watch File</Button>
    </Box>
  );
};
