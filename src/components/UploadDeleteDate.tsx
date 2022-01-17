import * as React from "react";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import errorHandler from "../errorHandler";

export function UploadDeleteDate({
  setDeleteDate,
  deleteDate,
}: {
  setDeleteDate: Function;
  deleteDate: string;
}) {
  const { warning } = errorHandler();
  return (
    <Stack component="form" noValidate spacing={3}>
      <TextField
        id="date"
        label="Delete date"
        type="date"
        value={deleteDate}
        onChange={(e) => {
          if (
            Date.parse(new Date(e.target.value).toString()) <
            Date.parse(new Date().toISOString().slice(0, 10))
          ) {
            warning("You can't chose past date");
            return;
          }
          setDeleteDate(e.target.value);
        }}
        sx={{ width: 220 }}
        InputLabelProps={{
          shrink: true,
        }}
      />
    </Stack>
  );
}
