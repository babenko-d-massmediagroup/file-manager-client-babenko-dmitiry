import React, { useCallback, useEffect, useRef, useState } from "react";
import axios from "axios";
import FormData from "form-data";
import { Button } from "@mui/material";
import UploadFileIcon from "@mui/icons-material/UploadFile";

export const UploadDropZone = ({
  uploadFile,
  setUploadFile,
  comment,
  deleteDate,
}: {
  uploadFile: boolean;
  setUploadFile: Function;
  comment: string;
  deleteDate: string;
}) => {
  useEffect(() => {
    if (!uploadFile) {
      return;
    }

    if (file) {
      const sendImage = async () => {
        var data = new FormData();
        data.append("file", file);
        data.append("comment", "Hellow world");

        axios({
          method: "post",
          url: `http://localhost:4000/image?comment=${comment}&deleteDate=${deleteDate}`,
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          data: data,
        })
          .then((response) => {
            console.log(JSON.stringify(response.data));
          })
          .catch((error) => {
            console.log(error);
          });
      };
      sendImage();
    }

    if (ref && ref.current && ref.current.value) {
      ref.current.value = "";
    }

    setUploadFile(false);
  }, [uploadFile, setUploadFile]);

  const [file, upload] = useState<File>();
  const ref = useRef<any>(null);
  return (
    <>
      <input
        color="primary"
        accept="image/*"
        type="file"
        onChange={(e) => {
          if (e.target.files && e.target.files.length) {
            upload(e.target.files[0]);
          }
        }}
        id="icon-button-file"
        style={{ display: "none" }}
      />
      <label htmlFor="icon-button-file">
        <Button variant="contained" component="span" size="large" color="primary">
          <UploadFileIcon />
        </Button>
      </label>
    </>
  );
};
