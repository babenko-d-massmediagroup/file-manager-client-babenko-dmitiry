import { TextField } from "@mui/material";

export const UploadComment = ({
  setComment,
  comment,
}: {
  setComment: Function;
  comment: string;
}) => {
  return (
    <TextField
      id="outlined-basic"
      label="Comment"
      variant="outlined"
      value={comment}
      sx={{ width: 220 }}
      onChange={(e) => setComment(e.target.value)}
    />
  );
};
