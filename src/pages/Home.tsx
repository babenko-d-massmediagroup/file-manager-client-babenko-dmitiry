import { InfoContainer } from "../components/InfoContainer"
import { TopNavigationBar } from "../components/TopNavigationBar"
import { UploadFileConainer } from "../components/UploadFileContainer"

export const HomePage = () => {
  return (
    <>
      <TopNavigationBar/>
      <InfoContainer/>
      <UploadFileConainer/>
    </>
  )
}