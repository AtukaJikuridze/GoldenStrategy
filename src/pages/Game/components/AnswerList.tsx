import Loader from "../../../components/Loader";

interface QuestionInfo {
  question_id: number;
  question: string;
  answers: string[];
  available_x_coins: string[];
}
interface answerListInterface {
  questionInfo: QuestionInfo | null;
  confirmAnswer: Function;
  setAnswerForX: Function;
  questionResponsed: boolean;
}

export default function AnswerList({
  questionInfo,
  confirmAnswer,
  setAnswerForX,
  questionResponsed,
}: answerListInterface) {
  return questionResponsed ? (
    <>
      <div className="w-[500px]  md:w-full max-w-full h-[250px] bg-cardBgBlack flex justify-center items-center p-6 overflow-y-scroll scrollbar-hide rounded-md">
        <p className="overflow-hidden text-ellipsis break-words text-center">
          {questionInfo?.question}
        </p>
      </div>
      <div className="flex flex-wrap gap-y-4 gap-x-[2%]">
        {questionInfo?.answers?.map((e: string, i: number) => (
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
        ))}
      </div>
    </>
  ) : (
    <div className="w-[500px] max-w-full h-[250px] bg-cardBgBlack flex justify-center items-center p-6 overflow-y-scroll scrollbar-hide rounded-md">
      <Loader width={"310px"} />
    </div>
  );
}
