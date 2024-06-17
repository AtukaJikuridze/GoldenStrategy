import priceTag from "../../assets/PriceTag.svg";
import dComp1 from "../../assets/dashboardComponent1.svg";
import Card from "./components/Card";
export default function Shop() {
  return (
    <div className="myContainer">
      <div className="flex gap-[2%] gap-y-10 flex-wrap">
        <div className="bg-cardBgBlack flex flex-col items-center py-5 rounded-lg w-[23%] h-[500px]">
          <p>Plan</p>
          <img src={dComp1} alt="" />
          <div className="flex flex-col items-center gap-10">
            <div className="flex">
              <img src={priceTag} alt="" />
              <p>100 Coin</p>
            </div>
            <div className="flex gap-5 ">
              <button className="text-black bg-yellowButton p-3 rounded-md px-5">
                Buy
              </button>
              <button className="border-yellowButton border p-3 rounded-md px-5">
                See More Details
              </button>
            </div>
          </div>
        </div>
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
      </div>
    </div>
  );
}
