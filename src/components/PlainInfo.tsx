import { Button, Typography } from "@mui/material";
import { Box } from "@mui/system";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { PlainInfoOne } from "./PlainInfoOne";
import * as React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import useCustomSnackbar from "../errorHandler";

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

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

export const PlainInfo = () => {
  const navigate = useNavigate();
  const [imageCount, setImageCount] = useState<number>(0);
  const [info, setInfo] = useState<Info[]>([]);
  const { error } = useCustomSnackbar();
  useEffect(() => {
    const getImageCount = async () => {
      axios
        .get(`${process.env.REACT_APP_BACKEND}/image/count`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then((response) => setImageCount(response.data))
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
        });
    };

    getImageCount();

    const sendImage = async () => {
      axios
        .get(`${process.env.REACT_APP_BACKEND}/image/plain-all`, {
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
  }, [navigate]);

  return (
    <Box padding="0 30px 20px 30px">
      <Box padding="20px 0">
        <Typography variant="h5">Image count: {imageCount}</Typography>
      </Box>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Number</StyledTableCell>
              <StyledTableCell align="left">Image name</StyledTableCell>
              <StyledTableCell align="left">Upload time</StyledTableCell>
              <StyledTableCell align="left">More</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {info.map((item, index) => (
              <StyledTableRow key={item._id}>
                <StyledTableCell component="th" scope="row">
                  {index + 1}
                </StyledTableCell>
                <StyledTableCell align="left">{item.filename}</StyledTableCell>
                <StyledTableCell align="left">{item.uploadDate}</StyledTableCell>
                <StyledTableCell align="left">
                  <Button onClick={() => navigate(`/info/${item._id}`)}>More</Button>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};
