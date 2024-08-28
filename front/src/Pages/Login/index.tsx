import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { RouteProtection } from "../../Functions/RouteProtecting";

export const LoginPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (
      sessionStorage.getItem("auth") != undefined ||
      sessionStorage.getItem("auth") != null
    ) {
      RouteProtection(
        navigate,
        String(sessionStorage.getItem("auth")),
        Number(sessionStorage.getItem("expiredTime"))
      );
    } else {
      window.location.replace(`${import.meta.env.VITE_BE_URI}/api/auth/login`);
    }
  }, []);

  return (
    <div className="w-full h-screen flex flex-row justify-center items-center">
      <h1 className="text-4xl">Please wait..</h1>
    </div>
  );
};
