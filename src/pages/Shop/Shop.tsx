import axios from "axios";
import { useEffect, useState } from "react";
import priceTag from "../../assets/PriceTag.svg";
import dComp1 from "../../assets/dashboardComponent1.svg";
import Card from "./components/Card";
import { API } from "../../baseAPI";

export default function Shop() {
  interface CardInterface {
    product_image: string | null; // Assuming product_image is a string URL
    product_name: string;
    product_price_in_usd?: number;
    product_price_in_coin?: number;
  }

  const [shopItems, setShopItems] = useState<CardInterface[] | null>(null);

  useEffect(() => {
    axios
      .get(`${API}/market`)
      .then((res) => setShopItems(res.data))
      .catch((error) => console.error("Error fetching shop items:", error));
  }, []);

  console.log(shopItems);

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
            <div className="flex gap-5">
              <button className="text-black bg-yellowButton p-3 rounded-md px-5">
                Buy
              </button>
              <button className="border-yellowButton border p-3 rounded-md px-5">
                See More Details
              </button>
            </div>
          </div>
        </div>
        {shopItems &&
          shopItems.map((item) => (
            <Card
              key={item.product_name} // Assuming product_name is unique
              product_image={item.product_image}
              product_name={item.product_name}
              product_price_in_usd={item.product_price_in_usd}
              product_price_in_coin={item.product_price_in_coin}
            />
          ))}
      </div>
    </div>
  );
}


