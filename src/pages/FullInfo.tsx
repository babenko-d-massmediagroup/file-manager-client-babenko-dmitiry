import { Button, Typography, Link, TextField } from "@mui/material";
import { Box } from "@mui/system";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { TopNavigationBar } from "../components/TopNavigationBar";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

export const FullInfoPage = () => {
  const navigate = useNavigate();
  const { photoId } = useParams();
  const [temporaryLinksCount, setTemporaryLinksCount] = useState(1);
  const [temporaryLinks, setTemporaryLinks] = useState<string[]>([]);
  const [info, setInfo] = useState({
    comment: "",
    deleteDate: "",
    filename: "",
    watchedTimes: 0,
    isActiveLink: false,
    link: "",
  });

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

  const generateTemporaryLinks = async () => {
    axios
      .post(
        "http://localhost:4000/link/generate-temporary-tokens",
        {
          count: temporaryLinksCount,
          fileId: photoId,
        },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      )
      .then(({ data }: { data: string[] }) =>
        setTemporaryLinks((prev) => [
          ...prev,
          ...data.map((item) => `http://localhost:3000/temp/${item}`),
        ])
      )
      .catch((e) => console.log(e.request));
  };

  useEffect(() => {
    axios
      .get(`http://localhost:4000/image/full-info/${photoId}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
      .then(({ data }) => {
        console.log({ data });
        setInfo({
          comment: data.comment,
          deleteDate: data.deleteDate,
          filename: data.filename,
          watchedTimes: data.watchedTimes,
          isActiveLink: data.isActiveLink,
          link: data.link,
        });
      })
      .catch((e) => {
        console.log(e.request);
        if (e.request.status === 401) {
          navigate("/");
        }
      });

    axios
      .get(`http://localhost:4000/link/get-all-temporary-tokens/${photoId}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
      .then(({ data }: { data: string[] }) =>
        setTemporaryLinks(data.map((item) => `http://localhost:3000/temp/${item}`))
      )
      .catch((e) => console.log(e.request));
  }, [photoId]);

  const newLinkStatus = async (status: boolean) => {
    axios
      .post("http://localhost:4000/link/set-photo-status", {
        photoId,
        status,
      })
      .then(({ data }) => {
        console.log({ data });
        setInfo((prev) => ({ ...prev, link: data.url, isActiveLink: data.status }));
      })
      .catch((e) => console.log(e.request));
  };

  return (
    <>
      <TopNavigationBar />
      <ArrowBackIcon onClick={() => navigate(-1)} />
      <Box display={"flex"} alignItems={"center"} justifyContent={"center"}>
        <img
          style={{ width: "600px", height: "600px" }}
          src={`http://localhost:4000/image/${photoId}`}
          alt="x"
        ></img>
      </Box>
      <Box>
        <Typography>File name: {info.filename}</Typography>
        {info.comment ? <Typography>Comment: {info.comment}</Typography> : null}
        <Typography>Delete date: {info.deleteDate}</Typography>
      </Box>
      <Button onClick={deleteImage}>Delete button</Button>
      <Box display={"flex"} flexDirection={"column"}>
        <Button onClick={() => newLinkStatus(true)} disabled={info.isActiveLink}>
          Generate Link
        </Button>
        <Box display={"flex"}>
          <Typography>Image link visit times: {info.watchedTimes}</Typography>
          {info.isActiveLink ? (
            <Box display={"flex"}>
              <Link href={info.link}>{info.link}</Link>
              <Button onClick={(e) => navigator.clipboard.writeText(info.link)}>Copy Link</Button>
            </Box>
          ) : null}
        </Box>
        <Button onClick={() => newLinkStatus(false)} disabled={!info.isActiveLink}>
          Disactivate Link
        </Button>
        <Box display={"flex"}>
          <Typography>How many links do you want to generate</Typography>
          <TextField
            id="outlined-number"
            label="Number"
            type="number"
            value={temporaryLinksCount}
            InputLabelProps={{
              shrink: true,
            }}
            onChange={(e) => {
              if (+e.target.value < 1) {
                console.log("throw here error");
                return;
              }
              setTemporaryLinksCount(+e.target.value);
            }}
          />
          <Button onClick={generateTemporaryLinks}>Generate temporary links</Button>
        </Box>
        <Box>
          <Typography>Temporary Links:</Typography>
          {temporaryLinks.map((item) => {
            return (
              <Box key={item}>
                <Link href={item}>{item}</Link>
              </Box>
            );
          })}
        </Box>
      </Box>
    </>
  );
};
