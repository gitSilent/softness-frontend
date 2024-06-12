"use client"

import { IOrder } from "@/api/models"
import { deleteOrder } from "@/api/requests"
import { toastParams } from "@/service/toastifyParams"
import { toast } from "react-toastify"

const statuses = {
  NW: "Новый",
  IN: "В обработке",
  RD: "Готов",
  FN: "Завершен",
}

interface IProps {
  data: IOrder,
  getOrders: Function
}

export default function Order({ data, getOrders }: IProps) {
  return (
    <div className='relative flex justify-between gap-[10px] items-center w-full max-w-[515px] p-[25px] rounded-[10px] block-shadow'>
      <div className="flex flex-col gap-[10px]">
        <span className="font-medium">Заказ №{data.id}</span>
        <span className="font-normal">Статус: <span className={`underline ${data.status === "RD"
          ? "text-[#2FB65D]"
          : data.status === "FN"
            ? "text-gray-500"
            : "text-[#E3A164]"
          }`}>{statuses[data.status]}</span></span>
        <span className="font-normal">Информация: <span className="font-light">{data.info}</span></span>
        <div className="flex flex-col lg:flex-row gap-[10px]">
          <button onClick={() => {
            window.open(`https://api.whatsapp.com/send/?phone=79200000000&text=Здравствуйте, вопрос по поводу заказа номер ${data.id}. `, "_blank")
          }} className="w-fit bg-[#E3A164] px-[14px] py-[5px] rounded-full hover:filter hover:brightness-95">В чат с продавцом
          </button>
          {data.status === "NW" &&
            <button onClick={() => {
              deleteOrder(data.id)
                .then((res) => {
                  getOrders()
                  toast.success("Вы успешно отменили заказ", toastParams)
                }).catch((err) => {
                  toast.error("Не удалось отменить заказ", toastParams)
                });
            }} className="w-fit bg-white border-[2px] border-[#FF5252] text-[#FF5252] px-[14px] py-[5px] rounded-full hover:bg-[#FF5252] hover:text-white">Отменить заказ
            </button>
          }
        </div>
      </div>
      <span className="block text-nowrap">{data.total} р.</span>
    </div>
  )
}
