export default function RegistrationLeftside(props: {
  isLogging: boolean;
  setIsLogging: Function;
}) {
  return (
    <div className="flex flex-col gap-5 items-center relative  bg-creditCard ">
      <h1 className="text-2xl">Golden Strategy</h1>
      <div className="w-[45px] h-[2px] bg-yellowButton shadow-yellowShadow"></div>
      <p className="text-lg">Welcome To our Website</p>
      <p></p>
      {props.isLogging
        ? "If you don’t have an account click SIGN UP"
        : "If you already have account click SIGN IN "}

      <button
        className="w-[480px] xl:w-full py-5 bg-yellowButton rounded-md shadow-yellowShadow hover:bg-yellowButtonHover transition-all"
        onClick={() => props.setIsLogging(!props.isLogging)}
      >
        {props.isLogging ? "SIGN UP" : "SIGN IN"}
      </button>
    </div>
  );
}
