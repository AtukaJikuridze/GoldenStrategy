import { useState } from "react";
import axios from "axios";
interface Verificaton {
  isVerifyed: null | boolean | undefined;
}
export default function VerificationPannel({ isVerifyed }: Verificaton) {
  const [inputVerificationValue, setInputVerificationValue] =
    useState<string>("");

  const submitVerificationCode = () => {
    axios.put(
      `https://dull-erin-marlin-cuff.cyclic.app/api/auth/register/verify`,
      {
        verificationnumber: inputVerificationValue,
      }
    );
  };

  return (
    <div
      className={`w-full h-full absolute bg-bgBlackTransparent left-0 top-0 flex justify-center items-center transition-opacity duration-150 ${
        isVerifyed !== undefined && !isVerifyed
          ? "visible opacity-100"
          : "invisible opacity-0 "
      } `}
    >
      <div className="rounded-xl bg-white w-[60%] h-[60%] flex items-center pb-14 flex-col gap-10 text-black justify-center">
        <h1 className=" text-2xl"> Please Verify Your Email...</h1>
        <div className="flex gap-5 items-center">
          <p className="">Enter Verification Code :</p>
          <input
            type="text"
            className="border p-2 outline-none"
            onChange={(e) => setInputVerificationValue(e.target.value)}
            value={inputVerificationValue}
          />
          <button className=" border p-2" onClick={submitVerificationCode}>
            Submit
          </button>
        </div>
        <h1 className="text-2xl">Check Your Email For Verification Code</h1>
      </div>
    </div>
  );
}
