"use client"
import ex from '@/../public/images/svg-icons/ex.svg'
import product from '@/../public/images/product_card.jpg'
import Link from 'next/link'
import Image from "next/image";

export default function FavoriteItem() {
  const idproduct = 1;
  
  return (
    <div className='relative flex flex-col min-w-[210px] max-w-[210px] md:max-w-[260px] max-h-[440px] rounded-tl-[25px] rounded-tr-[25px] overflow-hidden hover:cursor-pointer'>
      <Image src={ex} alt="" className='absolute w-[20px] h-[20px] top-[20px] right-[20px] hover:cursor-pointer'/>
      <Link href={`/product/${idproduct}`} className='flex flex-col'>
        <Image src={product} alt="" className='' />
        <span className='text-[16px] font-normal sl:text-[20px]'>Плюшевый медведь</span>
        <span className='text-[20px] font-medium sl:text-[23px]'>2500 Р</span>
      </Link>
    </div>
  )
}
