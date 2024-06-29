import axios from "axios";
import { useContext, useEffect, useState } from "react";
import Card from "./components/Card";
import { API } from "../../baseAPI";
import Modal from "./components/Modal"; // Import Modal component
import { MyContext } from "../../Context/myContext";

export default function Shop() {
  const context = useContext(MyContext);

  interface CardInterface {
    product_image: string | null;
    product_name: string;
    product_price_in_usd?: number;
    product_price_in_coin?: number;
    product_description?: string;
    id:string;
  }

  const [shopItems, setShopItems] = useState<CardInterface[] | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentItem, setCurrentItem] = useState<CardInterface | null>(null);

  useEffect(() => {
    axios
      .get(`${API}/market`)
      .then((res) => setShopItems(res.data))
      .catch((error) => console.error("Error fetching shop items:", error));
  }, []);

  const handleSeeMoreDetails = (item: CardInterface) => {
    setCurrentItem(item);
    setIsModalOpen(true);
  };

  return (
    <div className="myContainer">
      <div className="flex gap-[2%] gap-y-10 flex-wrap">
        {shopItems &&
          shopItems.map((item) => (
            <Card
              key={item.product_name} // Assuming product_name is unique
              product_image={item.product_image}
              product_name={item.product_name}
              product_price_in_usd={item.product_price_in_usd}
              product_price_in_coin={item.product_price_in_coin}
              onSeeMoreDetails={() => handleSeeMoreDetails(item)}
              userEmail={context?.userInfo?.email}
              cardId={item.id}
            />
          ))}
      </div>
      {isModalOpen && currentItem && (
        <Modal item={currentItem} onClose={() => setIsModalOpen(false)} />
      )}
    </div>
  );
}
