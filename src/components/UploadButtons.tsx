import { Box, Button } from "@mui/material"

export const UploadButtons = ({uploadFile, setUploadFile}: {uploadFile: boolean, setUploadFile: Function}) => {
  return (
    <Box>
     <Button onClick={()=>setUploadFile(true)}>Upload File</Button>
    </Box>
  )
}