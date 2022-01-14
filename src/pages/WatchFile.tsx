import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ErrorComponent } from "../components/ErrorComponent";

export const WatchFile = () => {
  const { photoId } = useParams();
  const [infoObj, setInfoObj] = useState({ filename: "", link: "" });
  const [error, setError] = useState(false);
  useEffect(() => {
    axios
      .get(`http://localhost:4000/link/${photoId}`)
      .then(({ data }) => {
        console.log(data);
        setInfoObj({ filename: data.filename, link: data.imageUrl });
      })
      .catch((e) => {
        console.log(e.request);
        setError(true);
      });
  }, []);

  return (
    <>
      {error ? (
        <ErrorComponent message={"Page does not found"} />
      ) : (
        <Box>
          {infoObj.link ? (
            <Box>
              <img src={infoObj.link} width={"300px"} height={"300px"} alt="x" />
              <Typography>Image name: {infoObj.filename}</Typography>
            </Box>
          ) : null}
        </Box>
      )}
    </>
  );
};
