import React from "react";
import axios from 'axios'
import { Button, Container } from "@mui/material";

export const UploadField = () => {
  const [fileSelected, setFileSelected] = React.useState<File>() // also tried <string | Blob>

  const handleImageChange = function (e: React.ChangeEvent<HTMLInputElement>) {
      const fileList = e.target.files;
  
      if (!fileList) return;
      
      setFileSelected(fileList[0]);
    };
  
    const uploadFile = function (e: React.MouseEvent<HTMLSpanElement, MouseEvent>) {
      if (fileSelected) {
          const formData = new FormData();
          formData.append("image", fileSelected, fileSelected.name);
      }
  };
  return (
    <Container>
          <label htmlFor="photo">
            <input
              accept="image/*"
              style={{ display: "none" }}
              id="photo"
              name="photo"
              type="file"
              multiple={false}
              onChange={handleImageChange}
            />

            <Button
              component="span"
              variant="contained"
              onClick={uploadFile}
            >
              Choose Picture
            </Button>
          </label>
        </Container>
  )

}