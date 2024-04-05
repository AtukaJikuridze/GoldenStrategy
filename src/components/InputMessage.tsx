interface inputMessagesTypes {
  assigment: boolean;
  message: string;
}
export default function InputMessageComp({
  message,
  assigment,
}: inputMessagesTypes) {
  return (
    <p
      className={`font-bold ${assigment ? "text-green-600" : "text-red-700"} `}
    >
      {message}
    </p>
  );
}
