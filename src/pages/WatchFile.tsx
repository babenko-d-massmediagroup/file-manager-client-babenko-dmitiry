import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import { ErrorComponent } from "../components/ErrorComponent";

export const WatchFile = () => {
  const { photoId } = useParams();
  const [infoObj, setInfoObj] = useState({ filename: "", link: "" });
  const [error, setError] = useState(false);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BACKEND}/link/${photoId}`)
      .then(({ data }) => {
        setInfoObj({ filename: data.filename, link: data.imageUrl });
      })
      .catch((e) => {
        setError(true);
      });
  }, []);

  return (
    <>
      {error ? (
        <ErrorComponent message={"Page does not found"} />
      ) : (
        <Box
          display={"flex"}
          justifyContent={"center"}
          flexDirection={"column"}
          alignItems={"center"}
        >
          {infoObj.link ? (
            <Box
              display={"flex"}
              justifyContent={"center"}
              flexDirection={"column"}
              alignItems={"center"}
            >
              <img src={infoObj.link} width={"300px"} height={"300px"} alt="x" />
              <Typography>Image name: {infoObj.filename}</Typography>
            </Box>
          ) : null}
        </Box>
      )}
    </>
  );
};
