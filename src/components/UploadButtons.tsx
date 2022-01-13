import { Box, Button } from "@mui/material";
import { LoaderButton } from "./LoaderButton";

export const UploadButtons = ({
  uploadFile,
  setUploadFile,
}: {
  uploadFile: boolean;
  setUploadFile: Function;
}) => {
  return (
    <Box>
      <LoaderButton onClick={() => setUploadFile(true)}></LoaderButton>
    </Box>
  );
};
