import axios from "axios";
import { API } from "../../baseAPI";
import Help from "./Help";
import { useEffect, useState } from "react";
import { useContext } from "react";
import { MyContext } from "../../Context/myContext";
import Question from "./Question";

export default function InGame() {
  const [timeLeft, setTimeLeft] = useState(50);

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [timeLeft]);

  useEffect(() => {
    axios
      .post(`${API}/questions/active`, {
        user_id: 64,
        usingHelp: 0,
        language: "GE",
      })
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.error("Error fetching active questions:", error);
      });

    // axios
    //   .delete(
    //     `${API}/users/delete-seen-questions
    // `,
    //     {
    //       params: { email: "avtojikuridze@gmail.com" },
    //     }
    //   )
    //   .then((res) => console.log(res));
  }, []);
  return (
    <div className="myContainer flex flex-col items-center  py-10">
      <div className="flex flex-col items-center gap-3 mb-[60px]">
        <h1 className="text-xl">GAME</h1>
        <div className="w-[45px] h-[2px] bg-yellowButton shadow-yellowShadow"></div>
      </div>
      {/* <Help /> */}
      <Question />
    </div>
  );
}
