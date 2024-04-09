import { useState } from "react";
import axios from "axios";
import InputMessageComp from "../../../components/InputMessage";
interface Verificaton {
  isVerifyed: null | boolean | undefined;
}
export default function VerificationPannel({ isVerifyed }: Verificaton) {
  const [verificationCode, setVerificationCode] = useState<string>("");

  const submitVerificationCode = () => {
    axios
      .put(
        `https://dull-erin-marlin-cuff.cyclic.app/api/auth/register/verify`,
        {
          verificationnumber: verificationCode,
        }
      )
      .then(() => console.log("sbumite"));
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

      <h1 className="cursor-pointer w-full ">Back To SignIn Page</h1>

      <InputMessageComp assigment={true} message={""} />
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
