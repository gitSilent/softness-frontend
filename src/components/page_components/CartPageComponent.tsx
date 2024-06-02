import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CartItem from "@/components/CartItem";

export default function CartPageComponent() {
  return (
    <div className="relative min-h-full">
      <Header />
      <main className="flex flex-col m-auto pb-[280px] pt-[90px] px-[20px] max-w-[1400px]">
        <h2 className="m-auto w-fit text-[25px] uppercase font-semibold mb-[50px] sl:text-[35px]"> Корзина </h2>
        
        <div className="flex flex-col gap-[30px]">
          <CartItem />
          <CartItem />
        </div>

        <span className="block text-[24px] text-right mt-[45px] md:text-[28px]">Итог: <span className="underline">5000 Р</span></span>
        <button className="mx-auto mt-[45px] max-w-[280px] h-[65px] rounded-[20px] text-[20px] w-full bg-black text-white">
          Оформить заказ
        </button>
      </main>
      <Footer />
    </div>
  );
}
