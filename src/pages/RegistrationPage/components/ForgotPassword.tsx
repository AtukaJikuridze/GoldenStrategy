import axios from "axios";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import InputMessageComp from "../../../components/InputMessage";
export default function ForgotPassword() {
  const [emailAdress, setEmailAdress] = useState<string>("");
  const [verificationCode, setVerificationCode] = useState<string>(""); /// ვერიფიკაციის კოდის ველიუ აქ ინახება
  const [newPassword, setNewPassword] = useState<string>(""); // newPassword ის ველიუ აქ ინახება
  const [showPassword, setShowPassword] = useState<boolean>(false); // ინფათზე NewPassword არის ღილაკი საიდანაც შეგიძლია გააკეთო Show/Hide Password
  const [isEmailCorrect, setIsEmailCorrect] = useState<boolean>(false); // თუ არის თრუ გამოიტანს ვერიფიკაციის და ახალი პასვორდის ინფათებს თუარადა დაწერს რო არასწორიაო
  const [isEmailIncorrect, setIsEmailInCorrect] = useState<boolean>(false);
  interface inputMessageTypes {
    message: string;
    messageColor: boolean;
  }
  const [inputMessage, setInputMessage] = useState<inputMessageTypes>({
    message: "",
    messageColor: false,
  });

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
      setInputMessage({
        message: "",
        messageColor: false,
      });
    }, 2000);
  };

  const submitEmail = (e: any) => {
    e.preventDefault();
    axios
      .post(
        `https://dull-erin-marlin-cuff.cyclic.app/api/auth/forgotpassword`,
        {
          email: emailAdress,
        }
      )
      .then((res) => setIsEmailCorrect(res.data ? true : false))
      .catch((error) => {
        setIsEmailCorrect(false);
        setIsEmailInCorrect(true);
        setTimeout(() => {
          setIsEmailInCorrect(false);
        }, 4000);
      });
  };
  const submitNewPassword = (e: any) => {
    e.preventDefault();

    axios
      .put(`https://dull-erin-marlin-cuff.cyclic.app/api/auth/forgotpassword`, {
        verificationCode,
        newPassword,
      })
      .then(() => passwordChanged())
      .catch(() => {
        setInputMessage({
          message: "Verification Code is Incorrect",
          messageColor: false,
        });
      });
  };

  return (
    <div className="flex flex-col justify-center items-center gap-5">
      <h1 className="text-2xl">Sign In</h1>
      <p>Enter Your Infromation</p>
      <input
        name="password"
        placeholder="Enter Email"
        value={emailAdress}
        onChange={(e) => setEmailAdress(e.target.value)}
        className="w-[470px] h-[50px] rounded-md border border-gray-600 pr-10 outline-none px-3 text-sm bg-transparent"
      />
      {isEmailIncorrect && (
        <InputMessageComp
          message="Email is Incorrect"
          assigment={!isEmailIncorrect}
        />
      )}
      {isEmailCorrect && (
        <>
          {" "}
          <input
            placeholder="Enter Verification Code"
            value={verificationCode}
            onChange={(e) => setVerificationCode(e.target.value)}
            className="w-[470px] h-[50px] rounded-md border border-gray-600 pr-10 outline-none px-3 text-sm bg-transparent"
          />
          <div className="relative ">
            <input
              value={newPassword}
              placeholder="Enter New Password"
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-[470px] h-[50px] rounded-md border border-gray-600 pr-10 outline-none px-3 text-sm bg-transparent"
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
      <InputMessageComp
        assigment={inputMessage.messageColor}
        message={inputMessage.message}
      />
      <button
        className="w-[470px] py-5 bg-yellowButton rounded-md shadow-yellowShadow  hover:bg-yellowButtonHover transition-all"
        onClick={isEmailCorrect ? submitNewPassword : submitEmail}
      >
        Recover Password
      </button>
      <div className="flex gap-5 mt-14">
        <p className="cursor-pointer">Privacy Policy</p>
        <p className="cursor-pointer">FAQ</p>
        <p className="cursor-pointer">Contact Us</p>
      </div>
    </div>
  );
}
