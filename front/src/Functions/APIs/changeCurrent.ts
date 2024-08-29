import Swal from "sweetalert2";
import { dbPayload } from "../../Interface/dbPayload";
import { ReactSweetAlert } from "sweetalert2-react-content";

export function changeCurrent(
  payload: dbPayload,
  session: Storage,
  setCurrent: React.Dispatch<React.SetStateAction<dbPayload | undefined>>,
  SWAL: typeof Swal & ReactSweetAlert
) {
  if (new Date().getTime() < Number(session.getItem("expiredTime"))) {
    const fetchConfig = {
      url: `${import.meta.env.VITE_BE_URI}/api/songs/new`,
      config: {
        method: "POST",
        headers: new Headers({
          "Content-Type": "application/json; charset=UTF-8",
          Authorization: `Bearer ${session.getItem("auth")}`,
        }),
        body: JSON.stringify(payload),
      },
    };

    fetch(fetchConfig.url, fetchConfig.config)
      .then((resp) => resp.json())
      .then((resp) => {
        if (resp.status != 0) {
          SWAL.fire({
            icon: "success",
            title: "Yey~",
            text: resp.message,
          });
        }
      });

    fetch(`${import.meta.env.VITE_BE_URI}/api/songs/latest`, {
      method: "GET",
      headers: new Headers({
        "Content-Type": "application/json; charset=UTF-8",
      }),
    })
      .then((resp) => resp.json())
      .then((resp) => {
        setCurrent(resp.payload);
      });
  }
}
