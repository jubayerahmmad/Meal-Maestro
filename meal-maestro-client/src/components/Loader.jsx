const Loader = () => {
  const sharedStyle = {
    content: "",
    width: "100%",
    height: "100%",
    display: "block",
    border: "5.6px solid purple",
    borderRadius: "50%",
    boxShadow: "0 -33.6px 0 -5.6px rebeccapurple",
    position: "absolute",
    animation: "spinner-rotate 1.25s infinite ease",
  };

  return (
    <div className="min-h-screen flex justify-center items-center">
      <div className="relative w-[22.4px] h-[22.4px]">
        <div
          style={{
            ...sharedStyle,
            animation:
              "spinner-b4c8mmmd 0.5s backwards, spinner-rotate 1.25s 0.5s infinite ease",
          }}
        ></div>
        <div
          style={{
            ...sharedStyle,
            animationDelay: "0s, 1.25s",
          }}
        ></div>
        <style>
          {`
          @keyframes spinner-b4c8mmmd {
            from {
              box-shadow: 0 0 0 -5.6px purple;
            }
          }

          @keyframes spinner-rotate {
            to {
              transform: rotate(360deg);
            }
          }
        `}
        </style>
      </div>
    </div>
  );
};

export default Loader;
