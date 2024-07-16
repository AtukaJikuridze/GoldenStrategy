import SignUp from "./components/SignUp";
import SignIn from "./components/SignIn";
import { useContext, useEffect, useState } from "react";
import RegistrationLeftside from "./components/RegistrationLeftside";
import { MyContext } from "../../Context/myContext";
import { useNavigate } from "react-router";

export default function RegistrationPage() {
  const navigate = useNavigate();
  const context = useContext(MyContext);
  useEffect(() => {
    if (context?.isLoggined) {
      navigate("/GoldenStrategy/Dashboard");
    }
  }, []);

  const [isLogging, setIsLogging] = useState(true); // თუ isLoggging არის True რეგისტრაციის ფეიჯზე გამოიტანს Login პანელს თუარადა Sign Up ის

  return (
    <div className="relative p-16 h-full xl:px-5 xl:py-0  2xl:myContainer">
      <main className="py-[80px] text-white flex justify-around items-center h-full relative 2xl:flex-wrap gap-32 lg:gap-16">
        <RegistrationLeftside
          isLogging={isLogging}
          setIsLogging={setIsLogging}
        />
        {!isLogging ? <SignUp setIsLogging={setIsLogging} /> : <SignIn />}
      </main>
    </div>
  );
}
