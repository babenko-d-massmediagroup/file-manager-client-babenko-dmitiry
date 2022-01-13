import { Button, Typography } from "@mui/material";
import { Box } from "@mui/system";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { TopNavigationBar } from "../components/TopNavigationBar";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

export const FullInfoPage = () => {
  const navigate = useNavigate();
  const { photoId } = useParams();
  const [info, setInfo] = useState({ comment: "", deleteDate: "", filename: "" });

  const deleteImage = async () => {
    console.log("Delete image...");
    axios
      .delete(`http://localhost:4000/image/delete/${photoId}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
      .then((res) => {
        console.log(res);
        navigate("/info");
      })
      .catch((e) => {
        console.log(e.request);
        navigate("/info");
      });
  };

  useEffect(() => {
    axios
      .get(`http://localhost:4000/image/full-info/${photoId}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
      .then(({ data }) => {
        console.log({ data });
        setInfo({ comment: data.comment, deleteDate: data.deleteDate, filename: data.filename });
      })
      .catch((e) => {
        console.log(e);
      });
    // axios
    //   .get(`http://localhost:4000/image/${photoId}`)
    //   .then((response) => console.log(response))
    //   .catch((e) => console.log(e));
  }, [photoId]);

  return (
    <>
      <TopNavigationBar />
      <ArrowBackIcon onClick={() => navigate(-1)} />
      <div>Full info page {photoId}</div>
      <Box display={"flex"} alignItems={"center"} justifyContent={"center"}>
        <img
          style={{ width: "600px", height: "600px" }}
          src={`http://localhost:4000/image/${photoId}`}
        ></img>
      </Box>
      <Box>
        <Typography>File name: {info.filename}</Typography>
        {info.comment ? <Typography>Comment: {info.comment}</Typography> : null}
        <Typography>Delete date: {info.deleteDate}</Typography>
      </Box>
      <Button onClick={deleteImage}>Delete button</Button>
    </>
  );
};
