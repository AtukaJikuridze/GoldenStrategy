export default function SelectLanguage() {
  return (
    <select className=" bg-cardBgBlack flex justify-between items-center text-white text-xl p-2 rounded-md outline-none font-interM absolute top-10 right-10">
      <option value="EN" selected>
        EN
      </option>
      <option value="GE">GE</option>
      <option value="RU">RU</option>
    </select>
  );
}
