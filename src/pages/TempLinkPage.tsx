import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Typography, Box } from "@mui/material";
import { ErrorComponent } from "../components/ErrorComponent";

export const TempLinkPage = () => {
  const { token } = useParams();
  const [info, setInfo] = useState({ filename: "", url: "" });
  const [error, setError] = useState({ message: "", code: 400 });

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BACKEND}/link/get-from-token/${token}`)
      .then(({ data }) => setInfo({ filename: data.filename, url: data.imageUrl }))
      .catch((e) => setError({ message: e.request.statusText, code: e.request.status }));
  }, []);

  return info.url ? (
    <Box display={"flex"} justifyContent={"center"} flexDirection={"column"} alignItems={"center"}>
      <Box display={"flex"} justifyContent={"center"} alignItems={"center"}>
        <img src={info.url} style={{ width: "60%", height: "auto" }} />
      </Box>
      <Typography>File name: {info.filename}</Typography>
    </Box>
  ) : (
    <ErrorComponent message={error.message} />
  );
};
