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
  const [info, setInfo] = useState<Info[]>([]);
  useEffect(() => {
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
