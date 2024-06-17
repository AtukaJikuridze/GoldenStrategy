interface afterAnswerInterface {
  nextQuestion: Function;
  answer: string;
  questionMessage: string;
  setUsingHelp: Function;
}
export default function AfterAnswer({
  nextQuestion,
  answer,
  questionMessage,
  setUsingHelp,
}: afterAnswerInterface) {
  return (
    <div>
      {questionMessage ? (
        <>
          <div className="w-[500px] max-w-full h-[250px] bg-cardBgBlack border-[#DBFF00] border flex justify-center items-center p-6 overflow-y-scroll scrollbar-hide rounded-md">
            <p className="overflow-hidden text-ellipsis break-words text-center">
              {questionMessage}
            </p>
          </div>
          <div className="flex justify-between mt-5">
            <div className="bg-[#DBFF00] text-black rounded-md py-2 px-12 flex justify-center items-center">
              {answer}
            </div>

            <div
              className="bg-[#DBFF00] text-black rounded-md py-2 px-12 text-sm flex justify-center items-center cursor-pointer"
              onClick={() => {
                nextQuestion();
                setUsingHelp(null);
              }}
            >
              Next Question
            </div>
          </div>
        </>
      ) : (
        <h1>Wait</h1>
      )}
    </div>
  );
}
