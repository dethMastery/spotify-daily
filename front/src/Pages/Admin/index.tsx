import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const AdminPage = () => {
  const navigate = useNavigate();

  if (
    sessionStorage.getItem("auth") == undefined &&
    sessionStorage.getItem("auth") == null
  ) {
    navigate("/");
  }

  const fetchConfig = {
    url: `${import.meta.env.VITE_BE_URI}/api/auth/check`,
    config: {
      method: "GET",
      headers: new Headers({
        "Content-Type": "application/json; charset=UTF-8",
        Authorization: `Bearer ${sessionStorage.getItem("auth")}`,
      }),
    },
  };

  useEffect(() => {
    if (
      Number(sessionStorage.getItem("expiredTime")) >
      Number(new Date().getTime())
    ) {
      fetch(fetchConfig.url, fetchConfig.config)
        .then((resp) => resp.json())
        .then((resp) => {
          if (resp.status == 0) {
            navigate("/");
          }
        });
    } else {
      navigate("/");
    }
  });

  return <></>;
};
