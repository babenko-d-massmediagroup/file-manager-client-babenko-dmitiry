import { Box } from "@mui/system";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { PlainInfoOne } from "./PlainInfoOne";

export interface Info {
  _id: string;
  length: number;
  chunkSize: number;
  uploadDate: Date;
  filename: string;
  contentType: string;
  metadata: {
    userId: string;
    fileInfo: string;
  };
}

export const PlainInfo = () => {
  const navigate = useNavigate();
  const [imageCount, setImageCount] = useState<number>(0);
  const [info, setInfo] = useState<Info[]>([]);

  useEffect(() => {
    const getImageCount = async () => {
      axios
        .get("http://localhost:4000/image/count", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then((response) => setImageCount(response.data))
        .catch((e) => console.error(e.request));
    };

    getImageCount();

    const sendImage = async () => {
      axios
        .get("http://localhost:4000/image/plain-all", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then((response) => {
          setInfo(response.data);
        })
        .catch((error) => {
          console.log(error.request.status);
          if (error.request.status === 401) {
            navigate("/login");
          }
        });
    };
    sendImage();
  }, []);

  return (
    <Box>
      <Box>Image count: {imageCount}</Box>
      <Box display={"flex"} justifyContent={"space-evenly"}>
        <Box>Number</Box>
        <Box>Image Name</Box>
        <Box>Uploaded Time</Box>
      </Box>
      {info.length
        ? info.map((item, index) => {
            return (
              <Box key={item._id}>
                <PlainInfoOne item={item} index={index} />
              </Box>
            );
          })
        : null}
    </Box>
  );
};
