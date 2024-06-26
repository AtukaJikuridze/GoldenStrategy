import { Link } from "react-router-dom";
import Loader from "../../../components/Loader";

export default function SeenAllQuestions(props: {
  questionResponsed: boolean;
}) {
  return (
    <div className="w-[500px] max-w-full h-[250px] bg-cardBgBlack gap-7 flex flex-col justify-center items-center p-6 overflow-y-scroll scrollbar-hide rounded-md">
      {props.questionResponsed ? (
        <>
          <p className="overflow-hidden text-ellipsis break-words text-center">
            You Have Seen All the questions
          </p>
          <Link to={"/GoldenStrategy/Dashboard"} className="w-full">
            <button className=" w-full py-2 bg-yellowButton rounded-md shadow-yellowShadow hover:bg-yellowButtonHover transition-all">
              Back To Dashboard
            </button>
          </Link>
        </>
      ) : (
        <Loader width={"20"} />
      )}
    </div>
  );
}
