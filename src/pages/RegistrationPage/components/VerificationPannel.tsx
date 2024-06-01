import { useState } from "react";
import axios from "axios";
import InputMessageComp from "../../../components/InputMessage";
import { API } from "../../../baseAPI";

export default function VerificationPannel(props: { setLoginInfo: Function }) {
  const [verificationCode, setVerificationCode] = useState<string>("");
  const [submitMessage, setSubmitMessage] = useState<boolean | undefined>(
    undefined
  ); // verification code ს დასაბმითბისას გამოიტანს ან სწორია და ვერიფიკაცია წარმატებით გაიარე ან ვერიფიკაციის კოდი არასწორია
  const verificationSuccess = () => {
    setSubmitMessage(true);
    setTimeout(() => {
      props.setLoginInfo({
        isVerifyed: "true",
        userEmail: "",
      });
    }, 2000);
  };
  const somethingWrong = () => {
    setSubmitMessage(false);
  };
  const submitVerificationCode = () => {
    axios
      .put(`${API}/api/auth/register/verify`, {
        verificationnumber: verificationCode,
      })
      .then(() => verificationSuccess())
      .catch(() => {
        somethingWrong();
      });
  };

  return (
    <div className="flex flex-col justify-center items-center gap-5">
      <h1 className="text-2xl">Please Verify Account </h1>
      <p>Check Email for verification code</p>

      <div className="relative ">
        <input
          value={verificationCode}
          placeholder="Enter Verification Code"
          onChange={(e) => setVerificationCode(e.target.value)}
          className="w-[470px] h-[50px] rounded-md border border-gray-600 pr-10 outline-none px-3 text-sm bg-transparent"
        />
      </div>
      {submitMessage !== undefined ? (
        submitMessage ? (
          <InputMessageComp
            boolean={submitMessage}
            message={"Verification Success"}
          />
        ) : (
          <InputMessageComp
            boolean={
              submitMessage !== undefined && !submitMessage ? false : true
            }
            message={"Verification Code is incorrect"}
          />
        )
      ) : (
        <></>
      )}

      <h1 className="cursor-pointer w-full ">Back To SignIn Page</h1>

      <button
        className={`w-[470px] py-5 bg-yellowButton rounded-md shadow-yellowShadow  hover:bg-yellowButtonHover transition-all 
      
      }`}
        onClick={submitVerificationCode}
      >
        Submit Verification Code
      </button>
    </div>
  );
}
