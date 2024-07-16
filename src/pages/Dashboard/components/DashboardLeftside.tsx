import dComp1 from "../../../assets/dashboardComponent1.svg";
// import dComp2 from "../../../assets/dashboardComponent2.svg";
import dComp2 from "../../../assets/coin.png";
import { useContext } from "react";
import { MyContext } from "../../../Context/myContext";
import languageData_ge from "../../../assets/language_ge.json";
import languageData_en from "../../../assets/language_en.json";

export default function DashboardLeftside() {
    const context = useContext(MyContext);
    let deflanguage: any = [];
    const gotLanguage = context?.defaultLanguage;
    if (gotLanguage == "EN") {
      deflanguage = languageData_en;
    } else {
      deflanguage = languageData_ge;
    }
  return (
    <div className="flex flex-col gap-32 4xl:order-2 4xl:flex-row md:!flex-col">
      <div className="bg-cardBgBlack flex flex-col items-center py-5 rounded-lg">
        <p>Plan</p>
        <img src={dComp1} alt="" />
        <p>{deflanguage.loginPage.soon}</p>
      </div>

      <div className="relative">
        <img src={dComp2} width={400} alt="" className="sm:mb-20" />
        <div className="bg-yellowButton w-[250px] text-center p-2 rounded-md absolute  left-1/2 transform -translate-x-1/2 bottom-5  ">
          <p className="text-black">{deflanguage.loginPage.soon}</p>
        </div>
      </div>
    </div>
  );
}
