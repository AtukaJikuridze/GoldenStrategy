import { useEffect, useState } from "react";
import timer from "../../../assets/timer.svg";
import axios from "axios";
import { API } from "../../../baseAPI";
import AfterAnswer from "./AfterAnswer";
import NoMoreHp from "./NoMoreHp";

export default function Question() {
  interface Coin {
    quantity: number;
    x2_coin?: number;
    x1_5_coin?: number;
    x1_25_coin?: number;
  }

  interface QuestionInfo {
    question_id: number;
    question: string;
    answers: string[];
    avaialbe_x_coins: string[];
  }

  const [questionInfo, setQuestionInfo] = useState<QuestionInfo | null>(null);
  const [answer, setAnswer] = useState<string | null>(null);
  const [answerForX, setAnswerForX] = useState<string | null>(null);
  const [questionQuantity, setQuestionQuantity] = useState<number>(0);
  const [hasHealth, setHasHealth] = useState<boolean | null>(null);
  const [xCoins, setXCoins] = useState<string[] | null>(null);
  const [showCoinPopup, setShowCoinPopup] = useState<boolean>(false);
  const [useX, setUseX] = useState<string | null>(null);
  const [questionMessage, setQuestionMessage] = useState<string>("");

  useEffect(() => {
    axios
      .post(`${API}/questions/active`, {
        user_id: 65,
        usingHelp: 0,
        language: "EN",
      })
      .then((response: any) => {
        const { avaialbe_x_coins, ...rest } = response.data;
        setQuestionInfo(rest);
        setXCoins(avaialbe_x_coins);
      })
      .catch((error) => {
        if (
          error.response &&
          error.response.data ===
            "Your health is too low to perform any actions."
        ) {
          setHasHealth(false);
        } else {
          console.error("Error fetching active question:", error);
        }
      });
  }, [questionQuantity]);

  useEffect(() => {
    if (useX !== null) {
      confirmAnswer();
    }
  }, [useX]);

  const confirmAnswer = (myAnswer?: string) => {
    if (xCoins && !useX) {
      setShowCoinPopup(true);
      return;
    }

    const answerPayload = {
      question_id: questionInfo?.question_id,
      answer: myAnswer || answerForX,
      user_id: 65,
      time: 40,
      use_x: useX || 0,
      language: "EN",
    };

    axios
      .post(`${API}/questions/answer`, answerPayload)
      .then((res: any) => {
        setQuestionMessage(res.data);
        if (!useX) {
          setAnswer(myAnswer || "");
        } else {
          setAnswer(answerForX);
        }
      })
      .catch((error) => {
        console.error("Error submitting answer:", error);
      });
  };

  const nextQuestion = () => {
    setQuestionQuantity((current: number) => current + 1);
    setAnswer(null);
    setQuestionMessage("");
    setShowCoinPopup(false);
    setUseX(null);
  };

  return (
    <div className="flex flex-col gap-5">
      {hasHealth === false ? (
        <NoMoreHp />
      ) : answer ? (
        <>
          <AfterAnswer
            nextQuestion={nextQuestion}
            answer={answer}
            questionMessage={questionMessage}
          />
        </>
      ) : showCoinPopup ? (
        <div className="w-[500px] max-w-full h-[250px] bg-cardBgBlack flex justify-center items-center p-6 overflow-y-scroll scrollbar-hide rounded-md">
          <div className="flex gap-5">
            {xCoins?.map((coin: string, index: number) => (
              <button
                key={index}
                className="rounded-lg p-3 bg-yellowButton"
                onClick={() => {
                  setUseX(coin);
                }}
              >
                {coin}
              </button>
            ))}
          </div>
        </div>
      ) : (
        <>
          <div className="flex relative gap-2 items-center justify-center">
            <img src={timer} alt="Timer" />
            <p>0:50</p>
          </div>
          <div className="w-[500px] max-w-full h-[250px] bg-cardBgBlack flex justify-center items-center p-6 overflow-y-scroll scrollbar-hide rounded-md">
            <p className="overflow-hidden text-ellipsis break-words text-center">
              {questionInfo?.question}
            </p>
          </div>
          <div className="flex flex-wrap gap-y-4 gap-x-[2%]">
            {questionInfo ? (
              questionInfo.answers?.map((e: string, i: number) => (
                <div className="w-[49%] flex justify-center" key={i}>
                  <div
                    className="cursor-pointer rounded-sm py-3 overflow-hidden text-ellipsis break-words text-center w-[80%] bg-cardBgBlack flex justify-center"
                    onClick={() => {
                      confirmAnswer(e);
                      setAnswerForX(e);
                    }}
                  >
                    <p className="text-sm">{e}</p>
                  </div>
                </div>
              ))
            ) : (
              <h1>No questions available</h1>
            )}
          </div>
        </>
      )}
    </div>
  );
}
