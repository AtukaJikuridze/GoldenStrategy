import { useContext } from "react";
import languageData_ge from "../../../assets/language_ge.json";
import languageData_en from "../../../assets/language_en.json";
import { MyContext } from "../../../Context/myContext";

export default function RegistrationLeftside(props: {
  isLogging: boolean;
  setIsLogging: Function;
})

 {
   const context = useContext(MyContext);
   let deflanguage:any = [];
   const gotLanguage = context?.defaultLanguage;
   if (gotLanguage == "EN") {
     deflanguage = languageData_en;
   } else {
     deflanguage = languageData_ge;
   }
  return (
    <div className="flex flex-col gap-5 items-center relative  bg-creditCard ">
      <h1 className="text-2xl">Golden Strategy</h1>
      <div className="w-[45px] h-[2px] bg-yellowButton shadow-yellowShadow"></div>
      <p className="text-lg">{deflanguage.loginPage.text}</p>
      <p></p>
      {props.isLogging
        ? deflanguage.loginPage.isLogging1
        : deflanguage.loginPage.isLogging2}

      <button
        className="w-[480px] xl:w-full py-5 bg-yellowButton rounded-md shadow-yellowShadow hover:bg-yellowButtonHover transition-all"
        onClick={() => props.setIsLogging(!props.isLogging)}
      >
        {props.isLogging
          ? deflanguage.loginPage.signUp
          : deflanguage.loginPage.signIn}
      </button>
    </div>
  );
}
