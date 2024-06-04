import { useEffect, useState } from "react";
import timer from "../../assets/timer.svg";
import axios from "axios";
import { API } from "../../baseAPI";
import AfterAnswer from "./AfterAnswer";
export default function Question() {
  const [questionInfo, setQuestionInfo] = useState<null | any>(null);
  const [answer, setAnswer] = useState<null | string>(null);
  console.log(answer);

  const [questionQuantity, setQuestionQuantity] = useState<number>(0);

  useEffect(() => {
    axios
      .post(`${API}/questions/active`, {
        user_id: 64,
        usingHelp: 0,
        language: "EN",
      })
      .then((response: any) => {
        setQuestionInfo(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.error("Error fetching active questions:", error);
      });

    // axios
    //   .post(`${API}/users/delete-seen-questions`, {
    //     email: "atukajiquridze@gmail.com",
    //   })
    //   .then((res) => console.log(res));
  }, [questionQuantity]);

  const confirmAnswer = (myAnswer: string) => {
    setAnswer(myAnswer);
    console.log(answer);

    axios
      .post(`${API}/questions/answer`, {
        question_id: questionInfo.question_id,
        answer,
        user_id: 64,
        time: 40,
        use_x: 0,
        language: "EN",
      })
      .then((res) => {
        console.log(res);
      })
      .catch((error) => console.log(error));
  };

  const nextQuestion = () => {
    setQuestionQuantity((current: number) => current + 1);
    setAnswer(null);
  };

  return (
    <div className="flex flex-col gap-5">
      {answer ? (
        <>
          <AfterAnswer nextQuestion={nextQuestion} answer={answer} />
        </>
      ) : (
        <>
          {" "}
          <div className="flex  relative gap-2 items-center justify-center   ">
            <img src={timer} alt="" />
            <p>0:50</p>
          </div>
          <div className="w-[500px] max-w-full h-[250px] bg-cardBgBlack flex justify-center items-center p-6 overflow-y-scroll scrollbar-hide rounded-md">
            <p className="overflow-hidden text-ellipsis break-words text-center">
              Which planet is known as the Red Planet?
            </p>
          </div>
          <div className="flex flex-wrap gap-y-4 gap-x-[2%] ">
            {questionInfo ? (
              questionInfo.answers?.map((e: string, i: number) => (
                <div className="w-[49%] flex justify-center" key={i}>
                  <div
                    className="cursor-pointer rounded-sm py-3 overflow-hidden text-ellipsis break-words text-center w-[80%] bg-cardBgBlack flex justify-center"
                    onClick={() => confirmAnswer(e)}
                  >
                    <p className="text-sm ">{e}</p>
                  </div>
                </div>
              ))
            ) : (
              <h1>No </h1>
            )}
          </div>
        </>
      )}
    </div>
  );
}
