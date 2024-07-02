import { useContext, useEffect, useState } from "react";
import timer from "../../../assets/timer.svg";
import axios from "axios";
import { API } from "../../../baseAPI";
import AfterAnswer from "./AfterAnswer";
import NoMoreHp from "./NoMoreHp";
import Help from "./Help";
import { MyContext } from "../../../Context/myContext";
import AnswerList from "./AnswerList";
import SeenAllQuestions from "./SeenAllQuestions";

export default function Question() {
  interface QuestionInfo {
    question_id: number;
    question: string;
    answers: string[];
    available_x_coins: string[];
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
  const [usingHelp, setUsingHelp] = useState<boolean | null>(null);
  const [hasHelp, setHasHelp] = useState<boolean>(true);
  const [errorMessage, setErrorMessage] = useState<string>(""); // ჰელფი ან სიცოცხლე თუარ გაქ ეს მესიჯი გამოაქ
  const [questionResponsed, setQuestionResponsed] = useState<boolean>(false); // კითხვის პასუხი მოსულია თუ თრუა
  const context = useContext(MyContext);

  useEffect(() => {
    console.log("questionResponsed" + " " + questionResponsed);
  }, [questionResponsed]);

  useEffect(() => {
    console.log(answer);

    if (usingHelp !== null) {
      axios
        .post(`${API}/questions/active`, {
          user_id: context?.userInfo?.id,
          usingHelp: usingHelp ? 1 : 0,
          language: "EN",
        })
        .then((response: any) => {
          console.log(response);
          setQuestionResponsed(true);

          if (response.data === "You have seen all the questions.") {
            setQuestionInfo(null);
          } else {
            const { available_x_coins, ...rest } = response.data;
            setQuestionInfo(rest);
            setXCoins(available_x_coins);
            setErrorMessage("");
          }
        })
        .catch((error) => {
          if (
            error.response &&
            error.response.status === 403 &&
            error.response.data ===
              "You don't have enough help points to use help."
          ) {
            console.log(true);

            setHasHelp(false);
            setErrorMessage("You don't have enough help points to use help.");
          } else if (
            error.response &&
            error.response.data ===
              "Your health is too low to perform any actions."
          ) {
            setHasHealth(false);
            setErrorMessage("Your health is too low to perform any actions.");
          } else {
            console.error("Error fetching active question:", error);
          }
        });
    }
  }, [questionQuantity, usingHelp]);

  useEffect(() => {
    if (useX !== null) {
      confirmAnswer();
    }
  }, [useX]);

  const confirmAnswer = (myAnswer?: string) => {
    if (xCoins?.length && !useX) {
      setShowCoinPopup(true);
      return;
    }

    const answerPayload = {
      question_id: questionInfo?.question_id,
      answer: myAnswer || answerForX,
      user_id: context?.userInfo?.id,
      time: 40,
      use_x: useX || 0,
      language: "EN",
    };

    axios
      .post(`${API}/questions/answer`, answerPayload)
      .then((res: any) => {
        setQuestionMessage(res.data);
        console.log(res);

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
    <div className="flex flex-col gap-5  md:w-full">
      {hasHealth === false ? (
        <NoMoreHp />
      ) : answer ? (
        <>
          <AfterAnswer
            nextQuestion={nextQuestion}
            answer={answer}
            questionMessage={questionMessage}
            setUsingHelp={setUsingHelp}
            setHasHelp={setHasHelp}
            setQuestionResponsed={setQuestionResponsed}
          />
        </>
      ) : showCoinPopup ? (
        <div className="w-[500px] max-w-full h-[250px] bg-cardBgBlack flex justify-center items-center p-6 overflow-y-scroll scrollbar-hide rounded-md">
          <div className="flex gap-5  ">
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
      ) : usingHelp === null ? (
        <Help
          setUsingHelp={setUsingHelp}
          setQuestionQuantity={setQuestionQuantity}
          hasHelp={hasHelp}
          setHasHelp={setHasHelp}
        />
      ) : (
        <>
          {errorMessage ? (
            <>
              <div className="w-[500px]   max-w-full h-[250px] flex-col bg-cardBgBlack flex justify-center items-center p-6 overflow-y-scroll scrollbar-hide rounded-md">
                <div className="text-red-500 text-center mb-4">
                  {errorMessage}
                </div>
                <h1>Do you want to buy?</h1>
                <div className="flex gap-10 mt-5">
                  <button className="text-black bg-yellowButton rounded-lg px-10 py-3">
                    Yes
                  </button>
                  <button
                    className="text-yellowButton border border-[#282828] overflow-hidden rounded-lg px-10 py-3"
                    onClick={() => {
                      setErrorMessage("");
                      setQuestionQuantity((current: number) => current + 1);
                      setUsingHelp(false);
                    }}
                  >
                    No
                  </button>
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="flex relative gap-2 items-center justify-center">
                <img src={timer} alt="Timer" />
                <p>0:50</p>
              </div>

              {questionInfo ? (
                <>
                  {questionInfo ? (
                    <AnswerList
                      questionInfo={questionInfo}
                      confirmAnswer={confirmAnswer}
                      setAnswerForX={setAnswerForX}
                      questionResponsed={questionResponsed}
                    />
                  ) : (
                    ""
                  )}
                </>
              ) : (
                <SeenAllQuestions questionResponsed={questionResponsed} />
              )}
            </>
          )}
        </>
      )}
    </div>
  );
}
