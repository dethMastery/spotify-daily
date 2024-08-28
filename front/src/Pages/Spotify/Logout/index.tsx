import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const SpotifyLogoutPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    sessionStorage.removeItem("spt_token");
    navigate("/admin");
  });

  return (
    <div className="w-full h-screen flex flex-row justify-center items-center">
      <h1 className="text-4xl">Please wait..</h1>
    </div>
  );
};
