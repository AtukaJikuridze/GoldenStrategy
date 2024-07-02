import { useState } from "react";
import InGame from "./components/InGame";

export default function Game() {
  const [startPlaying, setStartPlaying] = useState<boolean>(false);
  return startPlaying ? (
    <InGame />
  ) : (
    <div className="myContainer flex flex-col  justify-between    items-center  h-[500px]    py-10">
      <div className="flex flex-col items-center gap-3">
        <h1 className="text-xl">GAME</h1>
        <div className="w-[45px] h-[2px] bg-yellowButton shadow-yellowShadow"></div>
      </div>
      <p>Click the button to get the question</p>
      <button
        className="text-lg w-[480px]  max-w-full py-5 bg-yellowButton rounded-md shadow-yellowShadow hover:bg-yellowButtonHover transition-all"
        onClick={() => setStartPlaying(true)}
      >
        Get the question
      </button>
    </div>
  );
}
