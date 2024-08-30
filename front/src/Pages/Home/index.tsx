import { useEffect, useState } from "react";

import { pullLatest } from "../../Functions/APIs/pullCurrent";
import { dbPayload } from "../../Interface/dbPayload";

import { Footer } from "../../Components/Footer";
import { DateSlug } from "../../Functions/DateFunction";

export const HomePage = () => {
  const [latest, setLatest] = useState<dbPayload>();

  useEffect(() => {
    pullLatest(setLatest);
  }, []);

  return (
    <div className="w-full h-screen flex flex-col items-center justify-center gap-4">
      <div className="max-w-[22rem] min-w-[18rem] md:max-w-[40rem] w-full flex flex-col md:!flex-row bg-whitesmoke rounded-xl">
        <div
          className={`w-full p-4 text-jet ${
            latest != undefined ? "" : "hidden"
          }`}
        >
          <div className="my-4 md:block hidden">
            <h1 className="text-3xl">เพลงหมาประจำช่วงนี้ของนายคัตสึรางิ~</h1>
            <p className="">
              อัพเดทล่าสุดเมื่อ :{" "}
              {latest != undefined
                ? DateSlug(new Date(latest?.dateAdd))
                : "Error"}
            </p>
          </div>

          <iframe
            style={{ borderRadius: "12px" }}
            src={`https://open.spotify.com/embed/track/${latest?.songID}?utm_source=generator`}
            className="w-full"
            height="352"
            frameBorder="0"
            allowFullScreen
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            loading="lazy"
          ></iframe>

          <div className="my-6 md:hidden block">
            <h1 className="text-3xl">เพลงหมาประจำช่วงนี้~</h1>
            <p className="">
              อัพเดทล่าสุดเมื่อ :{" "}
              {latest != undefined
                ? DateSlug(new Date(latest?.dateAdd))
                : "Error"}
            </p>
          </div>

          <div className="md:mb-2 md:mt-4 my-2 text-center">
            อยากดูเพลงเก่าๆ หรอ{" "}
            <a
              href="/history"
              className="underline hover:no-underline hover:opacity-80"
            >
              กดตรงนี้สิ~
            </a>
          </div>
        </div>
        <div
          className={`w-full p-4 text-jet ${
            latest != undefined ? "hidden" : ""
          }`}
        ></div>
      </div>
      <Footer />
    </div>
  );
};
