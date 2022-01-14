import { BrowserRouter, Routes, Route } from "react-router-dom";
import { EnterPage } from "./pages/EnterPage";
import { FullInfoPage } from "./pages/FullInfo";
import { HomePage } from "./pages/Home";
import { InfoFilePage } from "./pages/InfoFilePage";
import { LoginPage } from "./pages/Login";
import { RegisterPage } from "./pages/Register";
import { StatisticPage } from "./pages/Statistic";
import { TempLinkPage } from "./pages/TempLinkPage";
import { WatchFile } from "./pages/WatchFile";

export const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<EnterPage />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="register" element={<RegisterPage />} />
        <Route path="home" element={<HomePage />} />
        <Route path="info" element={<InfoFilePage />} />
        <Route path="info/:photoId" element={<FullInfoPage />} />
        <Route path="watch/:photoId" element={<WatchFile />} />
        <Route path="temp/:token" element={<TempLinkPage />} />
        <Route path="statistick" element={<StatisticPage />} />
      </Routes>
    </BrowserRouter>
  );
};
