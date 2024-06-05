import { useContext, useEffect, useState } from "react";
import timer from "../../../assets/timer.svg";
import axios from "axios";
import { API } from "../../../baseAPI";
import AfterAnswer from "./AfterAnswer";
import NoMoreHp from "./NoMoreHp";
import { MyContext } from "../../../Context/myContext";
export default function Question() {
  const context = useContext(MyContext);
  const contextUserInfo: any = context?.userInfo;
  interface Coin {
    quantity: number;
    x2_coin?: number;
    x1_5_coin?: number;
    x1_25_coin?: number;
  }
  const [questionInfo, setQuestionInfo] = useState<null | any>(null); // რა კითხვა მოდის რა სავარაუდო პასუხებით
  const [answer, setAnswer] = useState<null | string>(null); // რა პასუხი გასცა
  const [questionQuantity, setQuestionQuantity] = useState<number>(0); // ყოველი კითხვის მერე იზრდება ერთით იუზ ეფექტში ვიყენებ
  const [hasHealth, setHasHealth] = useState<boolean | null>(null); // მომხმარებლის სიცოცხლის მაჩვენებელი თუ 0 ია ვერ ითამაშებს
  const [xCoins, setXCoins] = useState<Coin[] | null>(null); // მომხმარებლის ყველა ქოინი
  const [aviableCoins, setAviableCoins] = useState<any>([]); // ფილტრია და აჩვენებს მარტო იმ ქოინებს რომელიც 0 ზე მეტია
  const [showCoinPopup, setShowCoinPopup] = useState<boolean>(false); // პასუხის გაცემის შემდეგ ამოაგდებს ფანჯარას თუ მომხმარებელს აქვს ქოინები
  const [useX, setUseX] = useState<string | null>(null);

  useEffect(() => {
    if (contextUserInfo && contextUserInfo.length > 0) {
      const { x2_coin, x1_5_coin, x1_25_coin } = contextUserInfo[0];
      const newXCoins = [
        {
          quantity: x2_coin,
          x2_coin: x2_coin,
        },
        {
          quantity: x1_5_coin,
          x1_5_coin: x1_5_coin,
        },
        {
          quantity: x1_25_coin,
          x1_25_coin: x1_25_coin,
        },
      ];
      setXCoins(newXCoins);

      const myArr = newXCoins.filter((e) => e.quantity !== 0);
      setAviableCoins(myArr);
    } else {
      setXCoins(null);
      setAviableCoins([]);
    }
  }, [contextUserInfo]);

  useEffect(() => {
    axios
      .post(`${API}/questions/active`, {
        user_id: 65,
        usingHelp: 0,
        language: "EN",
      })
      .then((response: any) => {
        setQuestionInfo(response.data);
        // console.log(response.data);
      })
      .catch((error) => {
        if (
          error.response.data ==
          "Your health is too low to perform any actions."
        ) {
          setHasHealth(false);
        }
      });

    // axios
    //   .post(`${API}/users/delete-seen-questions`, {
    //     email: "avtojikuridze@gmail.com",
    //   })
    //   .then((res) => console.log(res));
  }, [questionQuantity]);

  useEffect(() => {
    if (useX !== null) {
      confirmAnswer();
    }
  }, [useX]);

  const confirmAnswer = (myAnswer?: string) => {
    // setAnswer(myAnswer ? myAnswer : null);

    aviableCoins
      ? setShowCoinPopup(true)
      : useX === null
      ? axios
          .post(`${API}/questions/answer`, {
            question_id: questionInfo.question_id,
            answer: myAnswer,
            user_id: 65,
            time: 40,
            use_x: 0,
            language: "EN",
          })
          .then((res) => {
            console.log(res);
          })
          .catch((error) => {
            console.log(error);
          })
      : true;

    // setAnswer(myAnswer ? myAnswer : null);]
    console.log(useX);

    useX
      ? axios
          .post(`${API}/questions/answer`, {
            question_id: questionInfo.question_id,
            answer: myAnswer,
            user_id: 65,
            time: 40,
            use_x: useX,
            language: "EN",
          })
          .then((res) => {
            console.log(res);
          })
          .catch((error) => {
            console.log(error);
          })
      : console.log("nop");
  };

  const nextQuestion = () => {
    setQuestionQuantity((current: number) => current + 1);
    setAnswer(null);
  };

  return (
    <div className="flex flex-col gap-5">
      {hasHealth === false ? (
        <NoMoreHp />
      ) : answer ? (
        <>
          <AfterAnswer nextQuestion={nextQuestion} answer={answer} />
        </>
      ) : showCoinPopup ? (
        <div className="w-[500px] max-w-full h-[250px] bg-cardBgBlack flex justify-center items-center p-6 overflow-y-scroll scrollbar-hide rounded-md">
          <div className=" flex gap-5">
            {aviableCoins.map((coin: any, index: number) => {
              const { quantity, ...rest } = coin;
              return (
                <div key={index}>
                  {Object.keys(rest).map((key, i) => (
                    <button
                      key={i}
                      className="rounded-lg p-3 bg-yellowButton"
                      onClick={() => setUseX(key)}
                    >
                      {key}
                    </button>
                  ))}
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        <>
          {" "}
          <div className="flex  relative gap-2 items-center justify-center   ">
            <img src={timer} alt="" />
            <p>0:50</p>
          </div>
          <div className="w-[500px] max-w-full h-[250px] bg-cardBgBlack flex justify-center items-center p-6 overflow-y-scroll scrollbar-hide rounded-md">
            <p className="overflow-hidden text-ellipsis break-words text-center">
              {questionInfo?.question}
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
                    <p className="text-sm">{e}</p>
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
