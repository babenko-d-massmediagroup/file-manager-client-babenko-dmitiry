import { Typography } from "@mui/material";
import { Box } from "@mui/system";

export const ErrorComponent = ({ message }: { message: string }) => {
  return (
    <Box>
      <Typography>404</Typography>
      <Typography>{message}</Typography>
    </Box>
  );
};
