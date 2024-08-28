import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export const SpotifyCallbackPage = () => {
  const navigate = useNavigate();

  const location = useLocation();
  const { hash } = location;

  useEffect(() => {
    let phase = hash != undefined ? String(hash) : "no";
    let tt = sessionStorage.getItem("spt_token");

    if (!tt && phase != "no") {
      tt = String(
        phase
          .split("&")
          .find((elem: string) => elem.startsWith("access_token"))
          ?.split("=")[1]
      );

      sessionStorage.setItem("spt_token", tt);
    }

    navigate("/admin?alert=spt-success");
  }, []);

  return (
    <div className="w-full h-screen flex flex-row justify-center items-center">
      <h1 className="text-4xl">Please wait..</h1>
    </div>
  );
};
