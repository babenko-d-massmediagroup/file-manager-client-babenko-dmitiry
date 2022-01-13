import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import { Info } from "./PlainInfo";

export const PlainInfoOne = ({ item, index }: { item: Info; index: number }) => {
  return (
    <Box display={"flex"} justifyContent={"space-evenly"}>
      <Typography>{index + 1}</Typography>
      <Typography>{item.filename}</Typography>
      <Typography>{item.uploadDate}</Typography>
    </Box>
  );
};
