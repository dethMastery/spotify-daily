import { BrowserRouter, Route, Routes } from "react-router-dom";

import { ErrorPage } from "./Pages/Errors";

import { HomePage } from "./Pages/Home";
import { HistoryPage } from "./Pages/History";

import { CallbackPage } from "./Pages/Callback";
import { LoginPage } from "./Pages/Login";
import { Logout } from "./Pages/Logout";
import { AdminPage } from "./Pages/Admin";

import { SpotifyLoginPage } from "./Pages/Spotify/Login";
import { SpotifyCallbackPage } from "./Pages/Spotify/Callback";
import { SpotifyLogoutPage } from "./Pages/Spotify/Logout";

export const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/history" element={<HistoryPage />} />

        <Route path="/login" element={<LoginPage />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/auth/callback" element={<CallbackPage />} />

        <Route path="/admin" element={<AdminPage />} />

        {/* Spotify Engine */}
        <Route path="/spotify/login" element={<SpotifyLoginPage />} />
        <Route path="/spotify/callback" element={<SpotifyCallbackPage />} />
        <Route path="/spotify/logout" element={<SpotifyLogoutPage />} />

        {/* Error Handling */}
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </BrowserRouter>
  );
};
