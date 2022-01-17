import React, { useCallback, useEffect, useRef, useState, Dispatch, SetStateAction } from "react";
import axios from "axios";
import FormData from "form-data";
import { Button, Typography } from "@mui/material";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import useCustomSnackbar from "../errorHandler";

export const UploadDropZone = ({
  uploadFile,
  setUploadFile,
  comment,
  deleteDate,
  setFile,
  file,
}: {
  uploadFile: boolean;
  setUploadFile: Function;
  comment: string;
  deleteDate: string;
  setFile: Dispatch<SetStateAction<File | undefined>>;
  file: File | undefined;
}) => {
  const { warning } = useCustomSnackbar();

  useEffect(() => {
    if (!uploadFile) {
      return;
    }

    if (ref && ref.current && ref.current.value) {
      ref.current.value = "";
    }

    setUploadFile(false);
  }, [uploadFile, setUploadFile]);

  const ref = useRef<any>(null);
  return (
    <>
      <input
        color="primary"
        accept="image/*"
        type="file"
        onChange={({ target }) => {
          if (target.files && target.files.length && target.files[0].size < 5 * 1024 * 1024 + 1) {
            console.log(target.files[0]);
            setFile(target.files[0]);
            return;
          }
          warning("You can't upload image that have size more then 5mb");
        }}
        id="icon-button-file"
        style={{ display: "none" }}
      />
      <label htmlFor="icon-button-file">
        <Button variant="contained" component="span" size="large" color="primary">
          <UploadFileIcon />
        </Button>
      </label>
      {file ? (
        <Typography variant="h6">Image {file.name} is chosen</Typography>
      ) : (
        <Typography variant="h5">Chose image</Typography>
      )}
    </>
  );
};
