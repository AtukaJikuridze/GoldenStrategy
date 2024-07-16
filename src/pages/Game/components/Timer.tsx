import { useEffect, useState } from "react";
import timer from "../../../assets/timer.svg";

interface TimerProps {
  setTime: Function;
  answer: string | null;
  questionResponsed: boolean;
}

export default function Timer({
  setTime,
  answer,
  questionResponsed,
}: TimerProps) {
  const [timerSeconds, setTimerSeconds] = useState<number>(50);

  function convertMinutesToTime(seconds: number) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
  }
  console.log(answer + " " + "answweri esaaa");

  useEffect(() => {
    if (questionResponsed && !answer) {
      const interval = setInterval(() => {
        setTimerSeconds((prevSeconds) => {
          if (prevSeconds > 0) {
            return prevSeconds - 1;
          } else {
            clearInterval(interval);
            setTime(0); // set time to 0 when time runs out
            return 0;
          }
        });
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [questionResponsed, setTime, answer]);

  useEffect(() => {
    if (answer) {
      setTime(timerSeconds);
      setTimerSeconds(50);
    }
    return () => {
      console.log(answer + "retru");
    };
  }, [answer, setTime]);

  return (
    <div className="flex relative gap-2 items-center justify-center">
      <img src={timer} alt="Timer" />
      <p>{convertMinutesToTime(timerSeconds)}</p>
    </div>
  );
}
