export const Footer = () => {
  return (
    <div id="footer" className="md:w-1/2 py-2 text-center w-[80%]">
      <hr className="w-[80%] mx-auto" />
      <p className="my-4 md:hidden block">
        Inspired By{" "}
        <a
          href="https://dailymusic.kiznick.me/"
          target="_blank"
          className="underline hover:no-underline hover:opacity-80"
        >
          kiznick Daily Music
        </a>
      </p>
      <p className="my-4 md:hidden block">
        Made w/ 🤍 by{" "}
        <a
          href="https://suphakit.net"
          target="_blank"
          className="underline hover:no-underline hover:opacity-80"
        >
          Suphakit P.
        </a>
      </p>

      {/* On Desktop */}
      <p className="my-4 hidden md:block">
        Inspired By{" "}
        <a
          href="https://dailymusic.kiznick.me/"
          target="_blank"
          className="underline hover:no-underline hover:opacity-80"
        >
          kiznick Daily Music
        </a>{" "}
        | Made w/ 🤍 by{" "}
        <a
          href="https://suphakit.net"
          target="_blank"
          className="underline hover:no-underline hover:opacity-80"
        >
          Suphakit P.
        </a>
      </p>
    </div>
  );
};
