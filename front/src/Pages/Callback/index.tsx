import { useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { RouteProtection } from "../../Functions/RouteProtecting";

export const CallbackPage = () => {
  const [query] = useSearchParams();
  const navigate = useNavigate();

  let salt = query.get("salt") != null ? String(query.get("salt")) : "";

  let expiredTime =
    query.get("expired") != null ? String(query.get("expired")) : "";

  if (
    salt != null &&
    salt != undefined &&
    expiredTime != null &&
    expiredTime != undefined
  ) {
    sessionStorage.setItem("auth", salt);
    sessionStorage.setItem("expiredTime", expiredTime);
  }

  if (salt == undefined || salt == null) {
    salt = String(sessionStorage.getItem("salt"));
  }

  if (expiredTime == undefined || expiredTime == null) {
    expiredTime = String(sessionStorage.getItem("expiredTime"));
  }

  useEffect(() => {
    RouteProtection(navigate, salt, Number(expiredTime));
  }, []);

  return (
    <div className="w-full h-screen flex flex-row justify-center items-center">
      <h1 className="text-4xl">Please wait..</h1>
    </div>
  );
};
