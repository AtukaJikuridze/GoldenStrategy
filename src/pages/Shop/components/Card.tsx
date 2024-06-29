import axios from "axios";
import { useState } from "react";

interface CardProps {
  product_image: string | null;
  product_name: string;
  product_price_in_usd?: number;
  product_price_in_coin?: number;
  onSeeMoreDetails: () => void;
  userEmail?: string;
  cardId: string;
}

export default function Card({
  product_image,
  product_name,
  product_price_in_usd,
  product_price_in_coin,
  onSeeMoreDetails,
  userEmail,
  cardId,
}: CardProps) {
  const [purchaseMessage, setPurchaseMessage] = useState("");
  const [purchaseStatus, setPurchaseStatus] = useState("");

  const handleBuyClick = async () => {
    try {
      let url = "";
      let message = "";

      // Determine URL and message based on product_name
      if (product_name === "ticket") {
        url = "https://testapi-pd9s.onrender.com/api/market/buy-ticket";
        message = "Purchase successful!";
      } else if (product_name === "health") {
        url = "https://testapi-pd9s.onrender.com/api/market/buy-health";
        message = "You can't buy more health";
      } else if (product_name === "help") {
        url = "https://testapi-pd9s.onrender.com/api/market/buy-help";
        message = "Help purchased!";
      } else if (
        ["x1_25_coin", "x1_5_coin", "x2_coin"].includes(product_name)
      ) {
        url = "https://testapi-pd9s.onrender.com/api/market/buy-x-card";
        message = "X Card purchased!";
      } else if (product_name === "exchange_to_money") {
        url = "https://testapi-pd9s.onrender.com/api/market/exchange-to-money";
        message = "Exchange to money successful!";
      } else if (
        [
          "30$_amazon_gift_card",
          "20$_amazon_gift_card",
          "50$_amazon_gift_card",
        ].includes(product_name)
      ) {
        url = "https://testapi-pd9s.onrender.com/api/market/buy-gift-card";
        message = `${product_name} purchased!`;
      } else {
        // Handle other product purchases if needed
        return; // No other products are handled in this example
      }

      const response = await axios.post(url, {
        email: userEmail,
        card_id: cardId, // Add card_id parameter for gift cards
        which_x: product_name,
      });

      // Check response status
      if (response.status === 200) {
        setPurchaseMessage(message);
        setPurchaseStatus("success");
        // You can perform any other actions upon successful purchase
      } else {
        setPurchaseMessage("Unknown error occurred.");
        setPurchaseStatus("error");
        console.error("Unknown error occurred:", response);
      }
    } catch (error: any) {
      if (error.response && error.response.data) {
        setPurchaseMessage(error.response.data);
      } else {
        setPurchaseMessage("Error making purchase. Please try again later.");
      }
      setPurchaseStatus("error");
      console.error("Error making purchase:", error);
    }
  };

  return (
    <div className="w-[23%] bg-cardBgBlack rounded-md h-[500px] flex flex-col justify-center items-center">
      <img
        src={product_image ?? ""}
        alt={product_name}
        className="w-full h-1/2 object-cover"
      />
      <h1>Title: {product_name}</h1>
      <h1>
        Product Price:{" "}
        {product_price_in_usd
          ? `${product_price_in_usd} USD`
          : `${product_price_in_coin} Coin`}
      </h1>
      <div className="flex w-full justify-around p-2">
        <button className="bg-yellow-600 rounded p-2" onClick={handleBuyClick}>
          BUY
        </button>
        <button
          className="border border-yellow-600 rounded"
          onClick={onSeeMoreDetails}
        >
          SEE MORE DETAILS
        </button>
      </div>
      <p
        className={`mt-2 ${
          purchaseStatus === "success"
            ? "text-green-500"
            : purchaseStatus === "error"
            ? "text-red-500"
            : ""
        }`}
      >
        {purchaseMessage}
      </p>
    </div>
  );
}
