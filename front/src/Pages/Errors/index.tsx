export const ErrorPage = () => {
  return (
    <div className="w-full h-screen flex flex-col justify-center items-center">
      <p className="text-5xl mb-4">Not Found</p>
      <hr className="!w-[10rem]" />
      <p className="mt-4 text-2xl">There's nothing here :(</p>
      <button
        onClick={() => {
          window.history.back();
        }}
        className="px-6 py-4 bg-living-coral my-4 rounded hover:opacity-80 hover:scale-90"
      >
        &lt; Go Back
      </button>
    </div>
  );
};
