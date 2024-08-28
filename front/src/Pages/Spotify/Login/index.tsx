import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const SpotifyLoginPage = () => {
  const navigate = useNavigate();

  const authLink = `https://accounts.spotify.com/authorize?client_id=${
    import.meta.env.VITE_CLIENT_ID
  }&redirect_uri=${import.meta.env.VITE_REDIRECT_URI}&response_type=token`;

  useEffect(() => {
    navigate(authLink);
  }, []);

  return (
    <div className="w-full h-screen flex flex-row justify-center items-center">
      <h1 className="text-4xl">Please wait..</h1>
    </div>
  );
};
