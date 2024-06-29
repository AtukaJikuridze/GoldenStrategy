interface ModalProps {
  item: {
    product_image: string | null;
    product_name: string;
    product_price_in_usd?: number;
    product_price_in_coin?: number;
    description?: string;
  };
  onClose: () => void;
}

export default function Modal({ item, onClose }: ModalProps) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-black p-4 rounded-lg w-1/2">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-bold p-2">{item.product_name}</h2>
          <button className="text-xl font-bold" onClick={onClose}>
            &times;
          </button>
        </div>
        <p className="mt-4">{item.description}</p>
        <p className="mt-2 p-2"> ფასი:
          {item.product_price_in_usd
            ? `${item.product_price_in_usd} USD`
            : `${item.product_price_in_coin} Coin`}
        </p>
      </div>
    </div>
  );
}
