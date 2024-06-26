import helpBottles from "../../../assets/HelpBottles.svg";

export default function Help(props: {
  setUsingHelp: Function;
  setQuestionQuantity: Function;
  setHasHelp: Function;
  hasHelp: boolean;
}) {
  const useHelp = () => {
    if (props.hasHelp) {
      props.setQuestionQuantity((current: number) => current + 1);
      props.setUsingHelp(true);
    } else {
      props.setQuestionQuantity((current: number) => current + 1);
    }
    console.log(props.hasHelp);
  };

  return (
    <div>
      <div className="bg-cardBgBlack rounded-lg p-10 flex justify-center items-center w-[500px] sm:w-full h-[250px] mb-8">
        <p className="text-lg">Do you want to use help?</p>
        <img className="absolute" src={helpBottles} alt="Help Bottles" />
      </div>
      <div className="flex justify-between">
        <button
          className="text-black bg-yellowButton rounded-lg px-10 py-3"
          onClick={useHelp}
        >
          Yes
        </button>
        <button
          className="text-yellowButton border border-[#282828] overflow-hidden rounded-lg px-10 py-3"
          onClick={() => {
            props.setQuestionQuantity((current: number) => current + 1);
            props.setUsingHelp(false);
          }}
        >
          No
        </button>
      </div>
    </div>
  );
}
