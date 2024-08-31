import { useEffect, useState } from "react";

import { dbPayload } from "../../Interface/dbPayload";
import { pullHistory } from "../../Functions/APIs/pullHistory";
import { Footer } from "../../Components/Footer";
import { DateSlug } from "../../Functions/DateFunction";

export const HistoryPage = () => {
  const [history, setHistory] = useState<dbPayload[]>();

  useEffect(() => {
    pullHistory(setHistory);
  }, []);

  return (
    <div className="w-full h-screen">
      <div className="w-full h-screen fixed top-0 left-0 flex flex-col items-center justify-center">
        <div className="w-4/5 h-[80vh] flex flex-col items-center justify-start gap-4 overflow-y-auto mb-4">
          {history?.map((resp) => {
            return (
              <div className="bg-whitesmoke rounded-xl w-[18rem] md:w-[40rem] h-full flex md:flex-row flex-col md:h-[15rem]">
                <div
                  className="md:w-[15rem] md:h-[15rem] w-[18rem] h-[8rem] !bg-cover !bg-center !bg-no-repeat md:rounded-l-xl md:rounded-tr-none rounded-t-xl"
                  style={{ background: `url(${resp.songImage})` }}
                ></div>
                <div className="text-jet p-4 text-center md:text-left md:w-[25rem]">
                  <h1 className="text-2xl">{resp.songName}</h1>
                  <h2 className="text-xl opacity-80">{resp.songArtist}</h2>
                  <a
                    href={resp.songLink}
                    target="_blank"
                    className="bg-[#1db954] text-whitesmoke px-2 py-4 mt-2 block text-center rounded-xl hover:opacity-80 hover:scale-90 w-[15rem] md:mx-0 mx-auto"
                  >
                    <i className="fa-brands fa-spotify"></i> เล่นบน Spotify
                  </a>
                  <hr className="w-1/2 my-4 md:mx-0 mx-auto" />
                  <p>วันที่อัพเดท : {DateSlug(new Date(resp.dateAdd))}</p>
                </div>
              </div>
            );
          })}
        </div>
        <Footer />
      </div>
    </div>
  );
};
