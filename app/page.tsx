"use client"
import MultiSelectChipComponent from "./components/multiselect/MultiSelectChip";
import data from './data/data.json';

export default function Home() {
  return (
    <div className="p-5" >
      <h1 className="text-4xl font-bold text-[#4e79ef] text-center">
        Pick Users
      </h1>
      <div className="mx-auto my-10 w-4/5">
        <MultiSelectChipComponent data={data} />
      </div>
    </div>
  )
}
