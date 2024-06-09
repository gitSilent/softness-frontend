"use client"
import React, { useCallback, useState } from 'react';
import debounce from 'lodash/debounce';
import ex from '@/../public/images/svg-icons/ex.svg'
import product from '@/../public/images/product_card.jpg'
import Image from "next/image";
import { ICartItem } from '@/api/models';
import { cartItemDecrement, cartItemIncrement, deleteFromCart } from '@/api/requests';
import Link from 'next/link';

interface IProps {
  data: ICartItem,
  getData: Function
}

export default function CartItem({ data, getData }: IProps) {
  const [quantity, setQuantity] = useState<number>(1)

  const debouncedIncrement = useCallback(debounce(() => {
    cartItemIncrement({ cart_item_id: data.id })
      .then((res) => {
        getData()
      })
  }, 250), []);

  const debouncedDecrement = useCallback(debounce(() => {
    cartItemDecrement({ cart_item_id: data.id })
      .then((res) => {
        getData()
      })
  }, 250), []);

  return (
    <div className='relative flex gap-[20px] max-h-[180px] lg:max-h-[210px] rounded-[25px] p-[15px] block-shadow'>
      <div className='relative w-[110px] h-[110px] ss:w-[150px] ss:h-[150px] lg:w-[180px] lg:h-[180px] rounded-[10px] overflow-hidden'>
        {/* <Image src={product} alt="" className='absolute object-cover h-[100%] w-[100%] top-0 left-0' /> */}
        <Link href={`/products/${data.product.id}`}>
          {data.product.photos.length !== 0
            ? <Image src={data.product.photos[0].photo} height={300} width={300} alt="" className='absolute object-cover h-[100%] w-[100%] top-0 left-0' />
            : <span className='block h-fit w-fit absolute top-0 bottom-0 left-0 right-0 m-auto'>нет фото</span>
          }
        </Link>
      </div>

      <div className='flex justify-center flex-col md:flex-row md:items-center md:w-full md:justify-between gap-[7px] ss:gap-[20px]'>
        <div>
          <span className='text-[16px] ss:text-[18px] md:text-[24px]'>{data.product.title}</span>
          {/* <p className='hidden md:block max-w-[250px] text-[12px] font-light'>{data.product.desc}</p> */}
        </div>
        <div className='flex flex-col sm:flex-row sm:items-center gap-[10px] sm:gap-[50px]'>
          <div className='flex items-center gap-[10px]'>
            <button onClick={() => { debouncedDecrement() }} className='flex justify-center items-center rounded-[6px] bg-[#EFB279] text-[19px] w-[20px] h-[20px] md:w-[24px] md:h-[24px] md:text-[22px]'>-</button>
            <span>{data.amount}</span>
            <button onClick={() => (debouncedIncrement())} className='flex justify-center items-center rounded-[6px] bg-[#EFB279] text-[19px] w-[20px] h-[20px] md:w-[24px] md:h-[24px] md:text-[22px]'>+</button>
          </div>
          <span className='text-[16px] ss:text-[18px] md:text-[24px] font-medium'>{data.product.price * data.amount} Р</span>
          <Image onClick={() => {
            deleteFromCart({ cart_item_id: data.id })
              .then((res) => {
                getData()
              })
          }} src={ex} alt="" className='hidden md:block mr-[50px] w-[17px] h-[17px] hover:cursor-pointer' />
          <Image onClick={() => {
            deleteFromCart({ cart_item_id: data.id })
              .then((res) => {
                getData()
              })
          }} src={ex} alt="" className='absolute md:hidden w-[17px] h-[17px] top-[20px] right-[25px] hover:cursor-pointer' />

        </div>
      </div>

    </div>
  )
}
