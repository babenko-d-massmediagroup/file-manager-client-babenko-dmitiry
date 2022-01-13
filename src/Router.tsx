import { BrowserRouter, Routes, Route } from "react-router-dom";
import { EnterPage } from "./pages/EnterPage";
import { FullInfoPage } from "./pages/FullInfo";
import { HomePage } from "./pages/Home";
import { InfoFilePage } from "./pages/InfoFilePage";
import { LoginPage } from "./pages/Login";
import { RegisterPage } from "./pages/Register";

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
      </Routes>
    </BrowserRouter>
  );
};
