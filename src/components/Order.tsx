"use client"

import { IOrder } from "@/api/models"


export default function Order(data:IOrder) {
  return (
    <div className='relative flex justify-between items-center w-full max-w-[515px] p-[25px] rounded-[10px] block-shadow'>
        <div className="flex flex-col gap-[10px]">
            <span className="font-medium">Заказ №{data.id}</span>
            <span className="font-normal">Статус: <span className="underline text-[#E3A164]">{data.status}</span></span>
            <span className="font-normal">Информация: <span className="font-light">{data.info}</span></span>
        </div>
        <span className="block">{data.total} р.</span>
    </div>
  )
}
