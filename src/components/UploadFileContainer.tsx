import { useState } from "react"
import { UploadButtons } from "./UploadButtons"
import { UploadComment } from "./UploadComment"
import { UploadDeleteDate } from "./UploadDeleteDate"
import { UploadDropZone } from "./UploadDropZone"
import { UploadField } from "./UploadField"

export const UploadFileConainer = () => {
  const [uploadFile, setUploadFile] = useState(false)


  return (
    <>
      <div>Upload Container</div>
      <UploadDropZone uploadFile={uploadFile} setUploadFile={setUploadFile}/>
      {/* <UploadField/> */}
      <UploadComment/>
      <UploadDeleteDate/>
      <UploadButtons uploadFile={uploadFile} setUploadFile={setUploadFile}/>
    </>
  )
}