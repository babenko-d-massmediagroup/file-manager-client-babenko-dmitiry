import axios from "axios";
import { useEffect, useState } from "react";
import { Typography, Box } from "@mui/material";
import { TopNavigationBar } from "../components/TopNavigationBar";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import useCustomSnackbar from "../errorHandler";

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
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

interface Statistic {
  deleteFiles: number;
  fileCount: number;
  linkWatchedTimes: number;
  tempLinkCount: number;
  usedTemporaryLinks: number;
}

export const StatisticPage = () => {
  const { error } = useCustomSnackbar();
  const navigate = useNavigate();
  const [statistic, setStatistic] = useState<Statistic>({
    deleteFiles: 0,
    fileCount: 0,
    linkWatchedTimes: 0,
    tempLinkCount: 0,
    usedTemporaryLinks: 0,
  });

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BACKEND}/statistic`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
      .then(({ data }) => {
        setStatistic({
          deleteFiles: data.deleteFiles,
          fileCount: data.fileCount,
          linkWatchedTimes: data.linkWatchedTimes,
          tempLinkCount: data.tempLinkCount,
          usedTemporaryLinks: data.usedTemporaryLinks,
        });
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
      });
  }, []);

  return (
    <Box>
      <TopNavigationBar />
      <Box padding="10px 10px">
        <ArrowBackIcon style={{ color: "#1c54b2" }} onClick={() => navigate(-1)} />
      </Box>
      <Box padding="10px 30px" display={"flex"} justifyContent={"center"}>
        <Typography variant="h4">Statistic</Typography>
      </Box>
      <Box padding="30px 30px">
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableBody>
              <StyledTableRow>
                <StyledTableCell align="left">Deleted files</StyledTableCell>
                <StyledTableCell align="right">{statistic.deleteFiles}</StyledTableCell>
              </StyledTableRow>
              <StyledTableRow>
                <StyledTableCell align="left">File count</StyledTableCell>
                <StyledTableCell align="right">{statistic.fileCount}</StyledTableCell>
              </StyledTableRow>
              <StyledTableRow>
                <StyledTableCell align="left">Link watched times</StyledTableCell>
                <StyledTableCell align="right">{statistic.linkWatchedTimes}</StyledTableCell>
              </StyledTableRow>
              <StyledTableRow>
                <StyledTableCell align="left">Temporary link count</StyledTableCell>
                <StyledTableCell align="right">{statistic.tempLinkCount}</StyledTableCell>
              </StyledTableRow>
              <StyledTableRow>
                <StyledTableCell align="left">Used temporary links</StyledTableCell>
                <StyledTableCell align="right">{statistic.usedTemporaryLinks}</StyledTableCell>
              </StyledTableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  );
};
