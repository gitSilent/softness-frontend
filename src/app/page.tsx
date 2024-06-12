"use client"
import Image from "next/image";

import Header from '../components/Header'
import Footer from '../components/Footer'
import main_banner from '@/../public/images/main_banner.png'
import mobile_banner from '@/../public/images/mobile_banner.png'
import main_card1 from '@/../public/images/main_card1.png'
import main_card2 from '@/../public/images/main_card2.png'
import main_card3 from '@/../public/images/main_card3.png'
import leaf_icon from '@/../public/images/svg-icons/leaf_icon.svg'
import safely_icon from '@/../public/images/svg-icons/safely_icon.svg'
import heart_icon from '@/../public/images/svg-icons/heart_icon.svg'
import ProductCard from '../components/ProductCard'
import product from '@/../public/images/product_card.jpg'
import { getCart, getProducts, getWorks } from "@/api/requests";
import { ICart, IProductsResponse, IWork } from "@/api/models";
import { useEffect, useState } from "react";
import Link from "next/link";


export default function Home() {
  const [products, setProducts] = useState<IProductsResponse>()
  const [cart, setCart] = useState<ICart>()
  const [works, setWorks] = useState<IWork[]>()

  const fetchData = () => {
    getProducts({})
      .then((res) => {
        setProducts(res.data)
      })
  }

  const fetchCartData = () => {
    getCart()
      .then((res) => {
        setCart(res.data)
      })
  }

  useEffect(() => {
    fetchData()

    getWorks()
      .then((res) => {
        setWorks(res.data)
      })
  }, [])

  return (
    <div className='relative min-h-full'>
      <Header cartData={cart} />
      <main className='flex flex-col m-auto pb-[280px] pt-[90px] px-[20px] max-w-[1400px] '>
        <Image src={main_banner} alt="" className='hidden sm:block' />
        <Image src={mobile_banner} alt="" className='sm:hidden' />

        <div className='flex justify-between w-full flex-col gap-[20px] mt-[100px] mb-[100px] text-[18px] xm:flex-row'>
          <div className='flex flex-row items-center font-medium gap-[40px]'>
            <Image src={leaf_icon} alt="" className='w-[120px]' />
            <span>Гипоаллергенно</span>
          </div>
          <div className='flex flex-row items-center font-medium gap-[40px]'>
            <Image src={safely_icon} alt="" className='w-[120px]' />
            <span>Безопасно</span>
          </div>
          <div className='flex flex-row items-center font-medium gap-[40px]'>
            <Image src={heart_icon} alt="" className='w-[120px]' />
            <span>С душой</span>
          </div>
        </div>

        <div className='flex flex-wrap w-full justify-center'>
          <Image src={main_card1} alt="" className='w-full max-w-[380px] sl:max-w-[450px]' />
          <Image src={main_card2} alt="" className='w-full max-w-[380px] sl:max-w-[450px]' />
          <Image src={main_card3} alt="" className='w-full max-w-[380px] sl:max-w-[450px]' />
        </div>


        <section>
          <Link href={'/products'} className='block mx-auto w-fit text-[25px] uppercase font-semibold my-[50px] sl:text-[35px]'>Товары</Link>
          <div className="flex flex-col items-center sm:grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {products?.results?.map((item) => (
              <ProductCard key={item.id} data={{ ...item }} getData={fetchData} getCartData={fetchCartData} />
            ))}
          </div>
          <Link href="/products" className="block mt-[35px] mx-auto w-fit py-[12px] px-[30px] bg-[#efb279] rounded-[15px] font-medium text-[20px] hover:bg-[#D89556]">Смотреть все товары</Link>
        </section>

        <section className='flex flex-col justify-center items-center mb-[100px]'>
          <h2 className='m-auto w-fit text-[25px] uppercase font-semibold my-[50px] sl:text-[35px]'>Наши работы</h2>
          <div className='flex flex-wrap gap-[10px] m-auto justify-center items-center sl:gap-[20px]'>
            {works?.map((item) => (
              <Image src={item.photo} width={355} height={355} alt="" className='rounded-[25px] w-[45%] max-w-[320px] max-h-[320px]' />
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
