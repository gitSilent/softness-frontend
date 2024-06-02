"use client"
import React, { useCallback, useState } from 'react';
import debounce from 'lodash/debounce';
import ex from '@/../public/images/svg-icons/ex.svg'
import product from '@/../public/images/product_card.jpg'
import Image from "next/image";

export default function CartItem() {
  const [quantity, setQuantity] = useState<number>(1)

  const debouncedIncrement = useCallback(debounce(() => {
    console.log('Обновление корзины +');
  }, 250), []);

  const debouncedDecrement = useCallback(debounce(() => {
    console.log('Обновление корзины -');
  }, 250), []);

  return (
    <div className='relative flex gap-[20px] max-h-[180px] lg:max-h-[210px] rounded-[25px] p-[15px] block-shadow'>
      <div className='relative w-[110px] h-[110px] ss:w-[150px] ss:h-[150px] lg:w-[180px] lg:h-[180px] rounded-[10px] overflow-hidden'>
        <Image src={product} alt="" className='absolute object-cover h-[100%] w-[100%] top-0 left-0' />
      </div>

      <div className='flex justify-center flex-col md:flex-row md:items-center md:w-full md:justify-between gap-[7px] ss:gap-[20px]'>
        <div>
          <span className='text-[16px] ss:text-[18px] md:text-[24px]'>Плюшевый медведь</span>
          <p className='hidden md:block max-w-[250px] text-[12px] font-light'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Earum dicta at reprehenderit. Culpa nemo ea praesentium neque iure recusandae accusantium.</p>
        </div>
        <div className='flex items-center gap-[10px]'>
          <button onClick={() => {debouncedDecrement()}} className='flex justify-center items-center rounded-[6px] bg-[#EFB279] text-[19px] w-[20px] h-[20px] md:w-[24px] md:h-[24px] md:text-[22px]'>-</button>
          <span>{quantity}</span>
          <button onClick={() => (debouncedIncrement())} className='flex justify-center items-center rounded-[6px] bg-[#EFB279] text-[19px] w-[20px] h-[20px] md:w-[24px] md:h-[24px] md:text-[22px]'>+</button>
        </div>
        <span className='text-[16px] ss:text-[18px] md:text-[24px] font-medium'>2500 Р</span>
        <Image src={ex} alt="" className='hidden md:block mr-[50px] w-[17px] h-[17px] hover:cursor-pointer' />
        <Image src={ex} alt="" className='absolute md:hidden w-[17px] h-[17px] top-[35px] right-[35px]' />
      </div>

    </div>
  )
}
