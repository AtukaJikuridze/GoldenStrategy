import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { API } from "../../baseAPI";
import { MyContext } from "../../Context/myContext";

interface FAQItem {
  id: number;
  question: string;
  answer: string;
}

const FAQ = () => {
  const context = useContext(MyContext);
  const [FAQ_Questions, setFAQ_Questions] = useState<null | FAQItem[]>(null);

  useEffect(() => {
    axios
      .post(`${API}/faq`, { language: context?.language })
      .then((res: any) => setFAQ_Questions(res.data));
  }, []);
  console.log(FAQ_Questions);

  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const handleToggle = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="myContainer py-12">
      <div>
        {FAQ_Questions?.map((item: FAQItem, index: number) => (
          <div
            key={item.id}
            className="mb-7 border-b-yellowButton border-transparent border rounded-md"
          >
            <button
              className="w-full text-left p-4 font-medium text-white bg-cardBgBlack rounded-lg focus:outline-none"
              onClick={() => handleToggle(index)}
            >
              {item.question}
            </button>
            <div
              className={`overflow-hidden transition-all duration-200 ${
                activeIndex === index ? "max-h-screen" : "max-h-0"
              }`}
            >
              <p className="p-4 text-gray-600">{item.answer}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQ;
