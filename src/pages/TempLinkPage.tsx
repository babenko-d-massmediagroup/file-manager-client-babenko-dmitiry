import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ErrorComponent } from "../components/ErrorComponent";

export const TempLinkPage = () => {
  const { token } = useParams();
  const [info, setInfo] = useState({ filename: "", url: "" });
  const [error, setError] = useState({ message: "", code: 400 });
  useEffect(() => {
    axios
      .get(`http://localhost:4000/link/get-from-token/${token}`)
      .then(({ data }) => setInfo({ filename: data.filename, url: data.imageUrl }))
      .catch((e) => setError({ message: e.request.statusText, code: e.request.status }));
  }, []);
  return info.url ? (
    <Box>
      <img src={info.url} />
      <Typography>File name: {info.filename}</Typography>
    </Box>
  ) : (
    <ErrorComponent message={error.message} />
  );
};
