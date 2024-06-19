interface CardProps {
  product_image: string | null;
  product_name: string;
  product_price_in_usd?: number;
  product_price_in_coin?: number;
}

export default function Card({
  product_image,
  product_name,
  product_price_in_usd,
  product_price_in_coin,
}: CardProps) {
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
          ? `${product_price_in_usd} "USD"`
          : `${product_price_in_coin} Coin`}
      </h1>
    </div>
  );
}
