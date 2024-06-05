
interface afterAnswerInterface{
  nextQuestion: Function,
  answer:string,
}
export default function AfterAnswer({nextQuestion,answer}:afterAnswerInterface) {
  return (
    <div>
      <div className="w-[500px] max-w-full h-[250px] bg-cardBgBlack border-[#DBFF00] border flex justify-center items-center p-6 overflow-y-scroll scrollbar-hide rounded-md">
        <p className="overflow-hidden text-ellipsis break-words text-center">
          The Answer is Correct
        </p>
      </div>
      <div className="flex justify-between mt-5">
        <div className="bg-[#DBFF00] text-black rounded-md py-2 px-12 flex justify-center items-center">
          {answer}
        </div>

        <div
          className="bg-[#DBFF00] text-black rounded-md py-2 px-12 text-sm flex justify-center items-center cursor-pointer"
          onClick={() => nextQuestion()}
        >
          Next Question
        </div>
      </div>
    </div>
  );
}
