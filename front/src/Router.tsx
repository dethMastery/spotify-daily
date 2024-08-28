import { BrowserRouter, Route, Routes } from "react-router-dom";

import { ErrorPage } from "./Pages/Errors";

import { HomePage } from "./Pages/Home";

export const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/auth/callback" element={<HomePage />} />

        {/* Error Handling */}
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </BrowserRouter>
  );
};
