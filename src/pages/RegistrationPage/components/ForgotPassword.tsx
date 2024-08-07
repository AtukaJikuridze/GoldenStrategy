import axios from "axios";
import { useContext, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import InputMessageComp from "../../../components/InputMessage";
import { API } from "../../../baseAPI";
import { MyContext } from "../../../Context/myContext";
import languageData_ge from "../../../assets/language_ge.json";
import languageData_en from "../../../assets/language_en.json";
export default function ForgotPassword(props: { setForgotPassword: Function }) {
  const [emailAdress, setEmailAdress] = useState<string>("");
  const [verificationCode, setVerificationCode] = useState<string>(""); /// ვერიფიკაციის კოდის ველიუ აქ ინახება
  const [newPassword, setNewPassword] = useState<string>(""); // newPassword ის ველიუ აქ ინახება
  const [showPassword, setShowPassword] = useState<boolean>(false); // ინფათზე NewPassword არის ღილაკი საიდანაც შეგიძლია გააკეთო Show/Hide Password
  const [mailVisible, setMailVisible] = useState<boolean>(true); // თუ თრუა მაშინ მეილი გამოჩენილი იქნება თაურადა მარტო ვერიფიკაციის ველები
  const [isEmailCorrect, setIsEmailCorrect] = useState<boolean>(false); // თუ არის თრუ გამოიტანს ვერიფიკაციის და ახალი პასვორდის ინფათებს თუარადა დაწერს რო არასწორიაო
  const [isEmailIncorrect, setIsEmailInCorrect] = useState<boolean>(false);
  const [buttonClickTimeout, setButtonClickTimeout] = useState(false); // button roar gaispamos click ebit
  interface inputMessageTypes {
    message: string;
    messageColor: boolean;
  }
  const [inputMessage, setInputMessage] = useState<inputMessageTypes>({
    message: "",
    messageColor: false,
  });
  const context = useContext(MyContext);
  let deflanguage: any = [];
  const gotLanguage = context?.defaultLanguage;
  if (gotLanguage == "EN") {
    deflanguage = languageData_en;
  } else {
    deflanguage = languageData_ge;
  }
  const passwordChanged = () => {
    setInputMessage({
      message: "Password Changed Succesfully",
      messageColor: true,
    });
    setTimeout(() => {
      setEmailAdress("");
      setVerificationCode("");
      setNewPassword("");
      setIsEmailCorrect(false);
      setMailVisible(true);
      setInputMessage({
        message: "",
        messageColor: false,
      });
      props.setForgotPassword(false);
    }, 2500);
  };

  const submitEmail = (e: any) => {
    e.preventDefault();
    setButtonClickTimeout(true);

    axios
      .post(`${API}/auth/forgotpassword`, {
        email: emailAdress,
      })
      .then((res) => {
        console.log(res);
        setIsEmailCorrect(res.data ? true : false);
        setButtonClickTimeout(false);
        setMailVisible(false);
      })
      .catch((error) => {
        console.log(error);
        setIsEmailCorrect(false);
        setIsEmailInCorrect(true);
        setButtonClickTimeout(false);
        setTimeout(() => {
          setIsEmailInCorrect(false);
        }, 4000);
      });
  };
  const submitNewPassword = (e: any) => {
    e.preventDefault();

    axios
      .put(`${API}/auth/forgotpassword`, {
        verificationCode,
        newPassword,
      })
      .then(() => passwordChanged())
      .catch(() => {
        setInputMessage({
          message: deflanguage.loginPage.verUnSuccess,
          messageColor: false,
        });
        setTimeout(() => {
          setInputMessage({
            message: "",
            messageColor: false,
          });
        }, 2500);
      });
  };


  
  return (
    <div className="flex flex-col justify-center items-center gap-5 md:w-full">
      <h1 className="text-2xl">{deflanguage.loginPage.signIn}</h1>
      <p>{deflanguage.loginPage.enterInfo}</p>

      {mailVisible ? (
        <input
          name="password"
          placeholder="Enter Email"
          value={emailAdress}
          onChange={(e) => setEmailAdress(e.target.value)}
          className="w-[470px] md:!w-full  h-[50px] rounded-md border border-gray-600 pr-10 outline-none px-3 text-sm bg-transparent"
        />
      ) : (
        ""
      )}

      {isEmailIncorrect && (
        <InputMessageComp
          message={deflanguage.loginPage.incorrectMail}
          boolean={!isEmailIncorrect}
        />
      )}
      {isEmailCorrect && (
        <>
          <input
            placeholder={deflanguage.loginPage.enterCode}
            value={verificationCode}
            onChange={(e) => setVerificationCode(e.target.value)}
            className="w-[470px] md:!w-full h-[50px] rounded-md border border-gray-600 pr-10 outline-none px-3 text-sm bg-transparent"
          />
          <div className="relative md:w-full ">
            <input
              value={newPassword}
              placeholder={deflanguage.loginPage.enterNewPass}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-[470px] md:!w-full h-[50px] rounded-md border border-gray-600 pr-10 outline-none px-3 text-sm bg-transparent"
              name="password"
              type={showPassword ? "text" : "password"}
            />
            {showPassword ? (
              <FaEye
                className="cursor-pointer text-md absolute right-3 top-1/2 transform  -translate-y-1/2"
                onClick={() => setShowPassword((current) => !current)}
              />
            ) : (
              <FaEyeSlash
                className="cursor-pointer text-lg absolute right-3 top-1/2 transform  -translate-y-1/2"
                onClick={() => setShowPassword((current) => !current)}
              />
            )}
          </div>
        </>
      )}
      <h1
        className="cursor-pointer w-full "
        onClick={() => props.setForgotPassword(false)}
      >
        {deflanguage.loginPage.backToSignIn}
      </h1>

      <InputMessageComp
        boolean={inputMessage.messageColor}
        message={inputMessage.message}
      />
      <button
        className={`w-[470px] md:w-full py-5 bg-yellowButton rounded-md shadow-yellowShadow  hover:bg-yellowButtonHover transition-all ${
          buttonClickTimeout ? "cursor-not-allowed " : ""
        }`}
        onClick={isEmailCorrect ? submitNewPassword : submitEmail}
      >
        {deflanguage.loginPage.recPass}
      </button>
      <div className="flex gap-5 mt-14">
        <p className="cursor-pointer">{deflanguage.loginPage.privPol}</p>
        <p className="cursor-pointer">{deflanguage.loginPage.faq}</p>
        <p className="cursor-pointer">{deflanguage.loginPage.contact}</p>
      </div>
    </div>
  );
}
