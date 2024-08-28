import { NavigateFunction } from "react-router-dom";

export function RouteProtection(
  navigate: NavigateFunction,
  salt: string,
  expired: number
) {
  const fetchConfig = {
    url: `${import.meta.env.VITE_BE_URI}/api/auth/check`,
    config: {
      method: "GET",
      headers: new Headers({
        "Content-Type": "application/json; charset=UTF-8",
        Authorization: `Bearer ${salt}`,
      }),
    },
  };

  if (Number(new Date().getTime()) >= Number(expired)) {
    sessionStorage.clear();
    navigate("/");
  } else {
    fetch(fetchConfig.url, fetchConfig.config)
      .then((resp) => resp.json())
      .then((resp) => {
        if (resp.status == 0) {
          navigate("/");
        } else {
          navigate("/admin");
        }
      });
  }
}
