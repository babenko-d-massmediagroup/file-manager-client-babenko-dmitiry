import * as React from "react";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import { blue } from "@mui/material/colors";
import Button from "@mui/material/Button";

export const LoaderButton = ({
  onClick,
  loading,
  success,
}: {
  onClick: () => void;
  loading: boolean;
  success: boolean;
}) => {
  const buttonSx = {
    ...(success && {
      bgcolor: blue[500],
      "&:hover": {
        bgcolor: blue[700],
      },
    }),
  };

  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <Box sx={{ m: 1, position: "relative" }}>
        <Button variant="contained" sx={buttonSx} disabled={loading} onClick={onClick}>
          Upload Image
        </Button>
        {loading && (
          <CircularProgress
            size={24}
            sx={{
              color: blue[500],
              position: "absolute",
              top: "50%",
              left: "50%",
              marginTop: "-12px",
              marginLeft: "-12px",
            }}
          />
        )}
      </Box>
    </Box>
  );
};
