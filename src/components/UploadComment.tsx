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
      onChange={(e) => setComment(e.target.value)}
    />
  );
};
