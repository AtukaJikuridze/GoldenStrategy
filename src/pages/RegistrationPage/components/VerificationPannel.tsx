import { useContext, useState } from "react";
import axios from "axios";
import InputMessageComp from "../../../components/InputMessage";
import { API } from "../../../baseAPI";
import { MyContext } from "../../../Context/myContext";
import languageData_ge from "../../../assets/language_ge.json";
import languageData_en from "../../../assets/language_en.json";


export default function VerificationPannel(props: {
  SetIsUserVerified: Function;
}) {
  const [verificationCode, setVerificationCode] = useState<string>("");

  const [submitMessage, setSubmitMessage] = useState<boolean | undefined>(
    undefined
  ); // verification code ს დასაბმითბისას გამოიტანს ან სწორია და ვერიფიკაცია წარმატებით გაიარე ან ვერიფიკაციის კოდი არასწორია

  const verificationSuccess = () => {
    setSubmitMessage(true);
    setTimeout(() => {
      props.SetIsUserVerified(true);
    }, 1500);
  };
  const context = useContext(MyContext);
  let deflanguage: any = [];
  const gotLanguage = context?.defaultLanguage;
  if (gotLanguage == "EN") {
    deflanguage = languageData_en;
  } else {
    deflanguage = languageData_ge;
  }

  const submitVerificationCode = () => {
    axios
      .put(`${API}/auth/register/verify`, {
        verificationnumber: verificationCode,
      })
      .then(() => verificationSuccess())
      .catch(() => {
        setSubmitMessage(false);
        setTimeout(() => {
          setSubmitMessage(undefined);
        }, 1500);
      });
  };

  return (
    <div className="flex flex-col justify-center items-center gap-5">
      <h1 className="text-2xl">{deflanguage.loginPage.verify}</h1>
      <p>{deflanguage.loginPage.checkmail}</p>

      <div className="relative ">
        <input
          value={verificationCode}
          placeholder={deflanguage.loginPage.enterCode}
          onChange={(e) => setVerificationCode(e.target.value)}
          className="w-[470px]  h-[50px] rounded-md border border-gray-600 pr-10 outline-none px-3 text-sm bg-transparent"
        />
      </div>
      {submitMessage !== undefined && (
        <InputMessageComp
          boolean={submitMessage}
          message={
            submitMessage
              ? deflanguage.loginPage.verSuccess
              : deflanguage.loginPage.verUnSuccess
          }
        />
      )}

      <h1
        className="cursor-pointer w-full"
        onClick={() => props.SetIsUserVerified(true)}
      >
        {deflanguage.loginPage.backToSignIn}
      </h1>

      <button
        className={`w-[470px] py-5 bg-yellowButton rounded-md shadow-yellowShadow  hover:bg-yellowButtonHover transition-all 
      
      }`}
        onClick={submitVerificationCode}
      >
        {deflanguage.loginPage.submitCode}
      </button>
    </div>
  );
}
