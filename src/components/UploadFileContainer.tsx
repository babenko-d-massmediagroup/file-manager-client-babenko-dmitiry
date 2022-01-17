import { Box } from "@mui/material";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useCustomSnackbar from "../errorHandler";
import { LoaderButton } from "./LoaderButton";
import { UploadComment } from "./UploadComment";
import { UploadDeleteDate } from "./UploadDeleteDate";
import { UploadDropZone } from "./UploadDropZone";

export const UploadFileConainer = () => {
  const { success: suces, error } = useCustomSnackbar();
  const [uploadFile, setUploadFile] = useState(false);
  const [comment, setComment] = useState("");
  const [deleteDate, setDeleteDate] = useState(new Date().toISOString().slice(0, 10));
  const [file, setFile] = useState<File>();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const uploadPhoto = () => {
    if (file) {
      setUploadFile(true);
      setLoading(true);
      setSuccess(false);
      const sendImage = () => {
        var data = new FormData();
        data.append("file", file);

        axios({
          method: "post",
          url: `${process.env.REACT_APP_BACKEND}/image?comment=${comment}&deleteDate=${deleteDate}`,
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          data: data,
        })
          .then(() => {
            setUploadFile(false);
            setLoading(false);
            setSuccess(true);
            suces("File has been uploaded");
          })
          .catch((e) => {
            if (e.response.status === 401) {
              navigate("/");
              return;
            }
            setUploadFile(false);
            setLoading(false);
            setSuccess(true);
            error("Error happend. Please, try later");
          });
      };
      sendImage();
    }
  };

  return (
    <Box
      display={"flex"}
      justifyContent={"space-between"}
      flexDirection={"column"}
      alignItems={"center"}
      height={"300px"}
    >
      <UploadDropZone
        file={file}
        setFile={setFile}
        uploadFile={uploadFile}
        setUploadFile={setUploadFile}
        comment={comment}
        deleteDate={deleteDate}
      />
      <UploadComment setComment={setComment} comment={comment} />
      <UploadDeleteDate setDeleteDate={setDeleteDate} deleteDate={deleteDate} />
      <Box>
        <LoaderButton loading={loading} success={success} onClick={uploadPhoto}></LoaderButton>
      </Box>
    </Box>
  );
};
