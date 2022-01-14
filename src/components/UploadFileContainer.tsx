import { Box } from "@mui/material";
import { useState } from "react";
import { UploadButtons } from "./UploadButtons";
import { UploadComment } from "./UploadComment";
import { UploadDeleteDate } from "./UploadDeleteDate";
import { UploadDropZone } from "./UploadDropZone";
import { UploadField } from "./UploadField";

export const UploadFileConainer = () => {
  const [uploadFile, setUploadFile] = useState(false);
  const [comment, setComment] = useState("");
  const [deleteDate, setDeleteDate] = useState(new Date().toISOString().slice(0, 10));

  return (
    <Box
      display={"flex"}
      justifyContent={"space-between"}
      flexDirection={"column"}
      alignItems={"center"}
      height={"300px"}
    >
      <UploadDropZone
        uploadFile={uploadFile}
        setUploadFile={setUploadFile}
        comment={comment}
        deleteDate={deleteDate}
      />
      {/* <UploadField/> */}
      <UploadComment setComment={setComment} comment={comment} />
      <UploadDeleteDate setDeleteDate={setDeleteDate} deleteDate={deleteDate} />
      <UploadButtons uploadFile={uploadFile} setUploadFile={setUploadFile} />
    </Box>
  );
};
