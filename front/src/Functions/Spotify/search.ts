import React from "react";
import Swal from "sweetalert2";
import { ReactSweetAlert } from "sweetalert2-react-content";

import { spotifyData } from "../../Interface/SpotifySearch";

export function SpotifySearch(
  input: string,
  token: string,
  expired: number,
  SWAL: typeof Swal & ReactSweetAlert,
  searchState: React.Dispatch<React.SetStateAction<boolean>>,
  searchRes: React.Dispatch<React.SetStateAction<spotifyData[] | undefined>>
) {
  const encode = encodeURI(input);

  const searchFetchConfig = {
    url: `https://api.spotify.com/v1/search?q=${encode}&type=track&market=TH&limit=10&offset=0&include_external=audio`,
    config: {
      method: "GET",
      headers: new Headers({
        "Content-Type": "application/json; charset=UTF-8",
        Authorization: `Bearer ${token}`,
      }),
    },
  };

  if (new Date().getTime() >= Number(expired)) {
    SWAL.fire({
      icon: "error",
      title: "Oh no!",
      text: "Spotify Session Expired.",
    });
    searchState(false);
  } else {
    if (token != undefined) {
      fetch(searchFetchConfig.url, searchFetchConfig.config)
        .then((resp) => resp.json())
        .then((resp) => {
          searchRes(resp.tracks.items);
          console.log(resp.tracks.items);
        });
    } else {
      SWAL.fire({
        icon: "error",
        title: "Oh no!",
        text: "Spotify Token Error.",
      });
    }
  }
}
