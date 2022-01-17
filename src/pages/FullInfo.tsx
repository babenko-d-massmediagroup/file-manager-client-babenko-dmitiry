import { useEffect, useState } from "react";
import axios from "axios";
import { Box } from "@mui/system";
import { useNavigate, useParams } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Button, Typography, Link, TextField } from "@mui/material";
import { TopNavigationBar } from "../components/TopNavigationBar";
import useCustomSnackbar from "../errorHandler";

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
  const { success, error } = useCustomSnackbar();

  const deleteImage = async () => {
    axios
      .delete(`${process.env.REACT_APP_BACKEND}/image/delete/${photoId}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
      .then(({ data }) => {
        success(data.message);
        navigate("/info");
      })
      .catch((e) => {
        if (e.response.status === 401) {
          navigate("/");
          return;
        }
        if (e.response) {
          error(e.response.data.message);
          return;
        }
        error(e.message);
        navigate("/info");
      });
  };

  const generateTemporaryLinks = async () => {
    axios
      .post(
        `${process.env.REACT_APP_BACKEND}/link/generate-temporary-tokens`,
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
          ...data.map((item) => `${process.env.REACT_APP_FRONTEND}/temp/${item}`),
        ])
      )
      .catch((e) => {
        if (e.response.status === 401) {
          navigate("/");
          return;
        }
        if (e.response) {
          error(e.response.data.message);
          return;
        }
        error(e.message);
        navigate("/");
      });
  };

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BACKEND}/image/full-info/${photoId}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
      .then(({ data }) => {
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
        if (e.response.status === 401) {
          navigate("/");
        }
        error(e.response.data.message);
      });

    axios
      .get(`${process.env.REACT_APP_BACKEND}/link/get-all-temporary-tokens/${photoId}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
      .then(({ data }: { data: string[] }) =>
        setTemporaryLinks(data.map((item) => `${process.env.REACT_APP_FRONTEND}/temp/${item}`))
      )
      .catch((e) => {
        if (e.response.status === 401) {
          navigate("/");
        }
        error(e.response.data.message);
      });
  }, [photoId]);

  const newLinkStatus = async (status: boolean) => {
    axios
      .post(
        `${process.env.REACT_APP_BACKEND}/link/set-photo-status`,
        {
          photoId,
          status,
        },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      )
      .then(({ data }) => {
        setInfo((prev) => ({ ...prev, link: data.url, isActiveLink: data.status }));
      })
      .catch((e) => {
        if (e.response.status === 401) {
          navigate("/");
          return;
        }
        if (e.response) {
          error(e.response.data.message);
          return;
        }
        error(e.message);
        navigate("/info");
      });
  };

  return (
    <>
      <Box width={"100%"}>
        <TopNavigationBar />
        <Box padding="10px" display={"flex"} justifyContent={"space-between"}>
          <ArrowBackIcon onClick={() => navigate(-1)} />
          <Button variant="contained" color="error" onClick={deleteImage}>
            Delete
          </Button>
        </Box>
        <Box display={"flex"} alignItems={"center"} justifyContent={"center"}>
          <img
            style={{ width: "70%", height: "auto" }}
            src={`${process.env.REACT_APP_BACKEND}/image/${photoId}`}
            alt="x"
          ></img>
        </Box>
        <Box>
          <Typography padding="10px 0 0 30px" variant="h5">
            File name: {info.filename}
          </Typography>
          {info.comment ? (
            <Typography padding="10px 0 0 30px" variant="h6">
              Comment: {info.comment}
            </Typography>
          ) : null}
          <Typography padding="10px 0 0 30px" variant="h6">
            Delete date: {info.deleteDate}
          </Typography>
        </Box>

        <Box display={"flex"} flexDirection={"column"}>
          <Box display={"flex"} justifyContent={"center"} paddingTop={"30px"}>
            <Button
              variant="contained"
              onClick={() => newLinkStatus(true)}
              disabled={info.isActiveLink}
            >
              Generate Link
            </Button>
          </Box>
          <Box
            display={"flex"}
            alignItems={"center"}
            justifyContent={info.isActiveLink ? "center" : "start"}
            width="100%"
            padding="10px 0"
          >
            {!info.isActiveLink ? (
              <Typography padding="0 30px 0 30px">
                Image link visit times: {info.watchedTimes}
              </Typography>
            ) : null}
            {info.isActiveLink ? (
              <Box
                display={"flex"}
                justifyContent={"space-between"}
                alignItems={"center"}
                width="100%"
                padding="0 30px 0 30px"
              >
                <Typography>Image link visit times: {info.watchedTimes}</Typography>
                <Link href={info.link}>{info.link}</Link>
                <Button onClick={(e) => navigator.clipboard.writeText(info.link)}>Copy Link</Button>
              </Box>
            ) : null}
          </Box>
          <Box display="flex" justifyContent={"center"} paddingBottom={"30px"}>
            <Button
              variant="contained"
              onClick={() => newLinkStatus(false)}
              disabled={!info.isActiveLink}
            >
              Disactivate Link
            </Button>
          </Box>
          <Box
            display={"flex"}
            flexDirection={"column"}
            alignItems={"center"}
            justifyContent={"center"}
            width={"100%"}
          >
            <Box
              width={"50%"}
              display={"flex"}
              alignItems={"center"}
              padding="20px 0"
              justifyContent={"space-around"}
            >
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
            </Box>
            <Button variant="contained" onClick={generateTemporaryLinks}>
              Generate temporary links
            </Button>
          </Box>
          <Box padding="0 10px 0 30px">
            <Typography>Temporary Links:</Typography>
            <Box padding="10px 10px" border="dashed blue" margin="10px 10px">
              {temporaryLinks.map((item, index) => {
                return (
                  <Box key={item}>
                    <Link href={item} style={{ wordWrap: "break-word" }}>
                      {index + 1}. {item}
                    </Link>
                  </Box>
                );
              })}
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
};
