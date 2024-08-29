import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";

import { spotifyData } from "../../Interface/SpotifySearch";
import { SpotifySearch } from "../../Functions/Spotify/search";
import { dbPayload } from "../../Interface/dbPayload";
import { changeCurrent } from "../../Functions/APIs/changeCurrent";
import { pullLatest } from "../../Functions/APIs/pullCurrent";

export const AdminPage = () => {
  const navigate = useNavigate();

  const SWAL = withReactContent(Swal);

  const [current, setCurrent] = useState<dbPayload>();
  const [searchInput, setSearchInput] = useState<string>();
  const [searchRes, setSearchRes] = useState<spotifyData[]>();

  const [searchState, setSearchState] = useState<boolean>(false);

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

  function Search() {
    SpotifySearch(
      String(searchInput),
      String(sessionStorage.getItem("spt_token")),
      Number(sessionStorage.getItem("spt_expired")),
      SWAL,
      setSearchState,
      setSearchRes
    );
  }

  function SetCurrentSong(i: number) {
    let resp: spotifyData = searchRes[i];
    let artist: string = "";

    if (resp.artists.length > 1) {
      for (let i = 0; i < resp.artists.length; i++) {
        if (i == resp.artists.length - 1) {
          artist += `${resp.artists[i].name}`;
        } else {
          artist += `${resp.artists[i].name}, `;
        }
      }
    } else {
      artist = resp.artists[0].name;
    }

    let fetchPayload: dbPayload = {
      songID: resp.id,
      songName: resp.name,
      songArtist: artist,
      songImage: resp.album.images[0].url,
      songLink: resp.external_urls.spotify,
      dateAdd: Number(new Date().getTime()),
    };

    changeCurrent(fetchPayload, sessionStorage, setCurrent, SWAL);
  }

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

    if (
      sessionStorage.getItem("spt_token") &&
      sessionStorage.getItem("spt_token") != undefined
    ) {
      if (
        new Date().getTime() < Number(sessionStorage.getItem("spt_expired"))
      ) {
        setSearchState(true);
      }
    }

    pullLatest(setCurrent);
  }, []);

  return (
    <div className="w-full min-h-screen">
      <div
        id="nav"
        className="w-1/3 fixed top-2 right-2 flex flex-row justify-end"
      >
        <button
          onClick={() => navigate("/logout")}
          className="p-4 bg-[#fe0000] text-whitesmoke rounded-lg hover:scale-90 hover:opacity-80"
        >
          Logout
        </button>
      </div>

      <div className="w-full h-screen flex flex-col justify-center items-center gap-4 overflow-y-auto">
        <div className="bg-whitesmoke text-jet p-4 rounded-xl w-[80%] max-h-[25vh]">
          <h1 className="text-2xl font-semibold mb-4">Current Song :</h1>
          <div className="w-[80%] h-[10rem] flex flex-row rounded-xl mx-auto bg-jet">
            <div
              className="w-[10rem] h-[10rem] rounded-l-xl !bg-cover !bg-center !bg-no-repeat"
              style={{ background: `url(${current?.songImage})` }}
            ></div>
            <div className="text-whitesmoke p-4">
              <h1 className="text-2xl">{current?.songName}</h1>
              <h2 className="text-xl opacity-75">{current?.songArtist}</h2>
              <a
                href={current?.songLink}
                target="_blank"
                className="bg-[#1db954] text-whitesmoke px-2 py-4 mt-2 block text-center rounded-xl hover:opacity-80 hover:scale-90"
              >
                <i className="fa-brands fa-spotify"></i> Listen On Spotify
              </a>
            </div>
          </div>
        </div>

        <div
          className={`bg-whitesmoke text-jet p-4 rounded-xl w-[80%] text-center ${
            searchState ? "hidden" : ""
          }`}
        >
          <button
            onClick={() => {
              navigate("/spotify/login");
            }}
            className="bg-[#1db954] text-whitesmoke py-4 px-4 rounded-lg hover:opacity-80"
          >
            Spotify Login
          </button>
        </div>

        <div
          className={`bg-whitesmoke text-jet p-4 rounded-xl w-[80%] ${
            !searchState ? "hidden" : ""
          }`}
        >
          <h1 className="text-2xl font-semibold mb-4 text-center">
            Wanna add a new song?
          </h1>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              Search();
            }}
            className="w-full flex flex-row justify-start"
          >
            <input
              onChange={(e) => setSearchInput(e.target.value)}
              type="text"
              className="w-full py-2 px-4 border-solid border-2 border-jet border-r-living-coral rounded-l-lg focus:outline-none focus:border-living-coral hover:border-living-coral"
              placeholder="just search here!"
            />
            <button
              type="submit"
              className="bg-living-coral text-whitesmoke py-2 px-4 rounded-r-lg hover:opacity-80"
            >
              Search
            </button>
          </form>
        </div>

        <div
          id="search-result"
          className={`bg-whitesmoke text-jet p-4 rounded-xl w-[80%] max-h-[40vh] overflow-y-auto ${
            searchRes == undefined ? "hidden" : ""
          }`}
        >
          <h1 className="text-lg underline font-semibold mb-4">Result</h1>
          <div
            id="search-container"
            className="flex flex-col justify-center items-center gap-4"
          >
            {searchRes?.map((resp, i) => {
              return (
                <div
                  className="w-[80%] border-solid border-2 border-jet rounded-xl flex flex-row"
                  id={resp.id}
                >
                  <div
                    className="w-[10rem] h-[10rem] rounded-l-xl !bg-no-repeat !bg-cover !bg-center"
                    style={{ background: `url(${resp.album.images[0].url})` }}
                  ></div>
                  <div className="px-4 py-2 w-auto">
                    <h1 className="text-xl">
                      <a
                        href={resp.external_urls.spotify}
                        target="_blank"
                        className="hover:opacity-80 underline"
                      >
                        {resp.name}
                      </a>
                    </h1>
                    <h2 className="text-lg">
                      {resp.artists.map((artists) => {
                        return <span className="pr-2">{artists.name}</span>;
                      })}
                    </h2>
                    <button
                      className="bg-living-coral p-4 my-2 text-whitesmoke rounded-xl"
                      onClick={() => {
                        SetCurrentSong(i);
                      }}
                    >
                      Set as current song!
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
