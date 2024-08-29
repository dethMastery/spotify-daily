import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";
import { spotifyData } from "../../Interface/SpotifySearch";

export const AdminPage = () => {
  const navigate = useNavigate();

  const SWAL = withReactContent(Swal);

  const [current, setCurrent] = useState();
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

  function SpotifySearch(input: string) {
    const encode = encodeURI(input);

    const searchFetchConfig = {
      url: `https://api.spotify.com/v1/search?q=${encode}&type=track&market=TH&limit=10&offset=0&include_external=audio`,
      config: {
        method: "GET",
        headers: new Headers({
          "Content-Type": "application/json; charset=UTF-8",
          Authorization: `Bearer ${sessionStorage.getItem("spt_token")}`,
        }),
      },
    };

    if (new Date().getTime() >= Number(sessionStorage.getItem("spt_expired"))) {
      SWAL.fire({
        icon: "error",
        title: "Oh no!",
        text: "Spotify Session Expired.",
      });
      setSearchState(false);
    } else {
      if (sessionStorage.getItem("spt_token") != undefined) {
        fetch(searchFetchConfig.url, searchFetchConfig.config)
          .then((resp) => resp.json())
          .then((resp) => {
            setSearchRes(resp.tracks.items);
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
        <div className="bg-whitesmoke text-jet p-4 rounded-xl w-[80%]">
          <h1 className="text-2xl font-semibold mb-4">Current Song :</h1>
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
          <div className="w-full flex flex-row justify-start">
            <input
              onChange={(e) => setSearchInput(e.target.value)}
              type="text"
              className="w-full py-2 px-4 border-solid border-2 border-jet border-r-living-coral rounded-l-lg focus:outline-none focus:border-living-coral hover:border-living-coral"
              placeholder="just search here!"
            />
            <button
              type="submit"
              onClick={() => {
                SpotifySearch(String(searchInput));
              }}
              className="bg-living-coral text-whitesmoke py-2 px-4 rounded-r-lg hover:opacity-80"
            >
              Search
            </button>
          </div>
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
            {searchRes?.map((resp) => {
              return (
                <div
                  className="w-[80%] border-solid border-2 border-jet rounded-xl flex flex-row"
                  id={resp.id}
                >
                  <div
                    className="w-[10rem] h-[10rem] rounded-l-xl !bg-no-repeat !bg-cover !bg-center"
                    style={{ background: `url(${resp.album.images[0].url})` }}
                  ></div>
                  <div className="px-4 py-2">
                    <h1 className="text-xl">{resp.name}</h1>
                    <h1 className="text-lg">
                      {resp.artists.map((artists) => {
                        return <span className="pr-2">{artists.name}</span>;
                      })}
                    </h1>
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
