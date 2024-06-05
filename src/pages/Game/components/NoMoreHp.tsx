
export default function NoMoreHp() {
  return (
    <div className="w-[500px] max-w-full h-[250px] bg-cardBgBlack flex flex-col gap-5 justify-center items-center p-6 overflow-y-scroll scrollbar-hide rounded-md">
      <p className="overflow-hidden text-ellipsis break-words text-center">
        თქვენ არ გაქვთ საკმარისი სიცოცხე თამაშის გასაგრძელებლად
      </p>
      <p>
        სიცოცხლის შეძენას შეძლებთ{" "}
        <a href="" className="text-blue-400">
          აქ
        </a>
      </p>
    </div>
  );
}
