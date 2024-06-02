"use client"
import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from 'react-toastify';

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CartItem from "@/components/CartItem";
import { createOrder, getCart } from "@/api/requests";
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from "next/navigation";

import { ICart } from "@/api/models";
import { toastParams } from "@/service/toastifyParams";
import { authCheck } from "@/service/authCheck";
export default function CartPageComponent() {
  const [cart, setCart] = useState<ICart>()
  const router = useRouter()

  const fetchData = () => {
    getCart()
      .then((res) => {
        setCart(res.data)
      })
  }


  useEffect(() => {
    (async () => {
      if (!await authCheck()) {
        router.push('/sign-in')
        return
      }
      fetchData()
    })()
  }, [router])

  return (
    <div className="relative min-h-full">
      <ToastContainer />
      <Header />
      <main className="flex flex-col m-auto pb-[280px] pt-[90px] px-[20px] max-w-[1400px]">
        <h2 className="m-auto w-fit text-[25px] uppercase font-semibold mb-[50px] sl:text-[35px]"> Корзина </h2>

        <div className="flex flex-col gap-[30px]">

          {
            cart?.items && cart?.items.length === 0
              ? <span className="block font-normal text-[36px] mx-auto">Нет товаров в корзине</span>
              : cart?.items.map((item) => (
                <CartItem data={{ ...item }} getData={fetchData} />
              ))
          }

        </div>

        {
          (cart?.items && cart?.items.length !== 0)
          &&
          <span className="block text-[24px] text-right mt-[45px] md:text-[28px]">Итог: <span className="underline">{cart?.total} Р</span></span>
        }

        {
          (cart?.items && cart?.items.length !== 0)
          &&
          <button onClick={()=>{
            createOrder()
            .then((res)=>{
              toast.success("Заказ успешно оформлен", toastParams)
              fetchData()
            }).catch((er)=>{
              if(er.response.status === 400){
                toast.error(er.response.data[0], toastParams)
              }else{
                toast.error("Не удалось оформить заказ", toastParams)
              }
            })
          }} className="mx-auto mt-[45px] max-w-[280px] h-[65px] rounded-[20px] text-[20px] w-full bg-black text-white">
            Оформить заказ
          </button>
        }
      </main>
      <Footer />
    </div>
  );
}
