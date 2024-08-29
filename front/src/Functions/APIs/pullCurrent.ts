import { dbPayload } from "../../Interface/dbPayload";

export function pullLatest(
  setState: React.Dispatch<React.SetStateAction<dbPayload | undefined>>
) {
  fetch(`${import.meta.env.VITE_BE_URI}/api/songs/latest`, {
    method: "GET",
    headers: new Headers({
      "Content-Type": "application/json; charset=UTF-8",
    }),
  })
    .then((resp) => resp.json())
    .then((resp) => {
      setState(resp.payload);
      console.log(resp.payload);
    });
}
