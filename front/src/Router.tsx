import { BrowserRouter, Route, Routes } from "react-router-dom";

import { ErrorPage } from "./Pages/Errors";

import { HomePage } from "./Pages/Home";
import { CallbackPage } from "./Pages/Callback";
import { LoginPage } from "./Pages/Login";

export const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/logout" />
        <Route path="/auth/callback" element={<CallbackPage />} />

        {/* Error Handling */}
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </BrowserRouter>
  );
};
