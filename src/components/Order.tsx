"use client"

import { IOrder } from "@/api/models"

const statuses = {
  NW: "Новый",
  IN: "В обработке",
  RD: "Готов"
}

export default function Order(data: IOrder) {
  return (
    <div className='relative flex justify-between items-center w-full max-w-[515px] p-[25px] rounded-[10px] block-shadow'>
      <div className="flex flex-col gap-[10px]">
        <span className="font-medium">Заказ №{data.id}</span>
        <span className="font-normal">Статус: <span className={`underline text-[#E3A164] ${data.status === "RD" ? "text-[#2FB65D]" : ""}`}>{statuses[data.status]}</span></span>
        <span className="font-normal">Информация: <span className="font-light">{data.info}</span></span>
        <button onClick={() => {
          window.open(`https://api.whatsapp.com/send/?phone=79200000000&text=Здравствуйте, вопрос по поводу заказа номер ${data.id}. `, "_blank")
        }} className="w-fit bg-[#E3A164] px-[14px] py-[5px] rounded-full hover:filter hover:brightness-95">В чат с продавцом</button>
      </div>
      <span className="block">{data.total} р.</span>
    </div>
  )
}
