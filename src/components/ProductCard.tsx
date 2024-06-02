"use client"
import product from '@/../public/images/product_card.jpg'
import Link from 'next/link'
import Image from "next/image";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { toastParams } from '../service/toastifyParams';
import { IProduct } from '../api/models';

export default function ProductCard(data: IProduct) {

  const idproduct = 1
  const in_favorite = false

  function handleClickCart() {
    toast.success("Товар добавлен в корзину", toastParams)
  }
  return (
    <div className='relative flex flex-col max-w-[320px] max-h-[440px] rounded-tl-[25px] rounded-tr-[25px] overflow-hidden hover:cursor-pointer'>
      <ToastContainer />
      <Link href={`/products/${idproduct}`} className='flex flex-col'>
        <div className='relative h-[250px]'>
          {data.photos.length !== 0 
          ? <Image src={data.photos[0].photo} height={300} width={300} alt="" className='h-full w-full object-cover' />
          : <span className='block absolute top-0 bottom-0 left-0 right-0 m-auto'>нет фото</span>
        }
        </div>
      </Link>
        <div className='group/wrapper absolute top-[25px] right-[25px] w-[30px] hover:filter hover:brightness-90'>
          <svg width="40" height="35" viewBox="0 0 40 35" fill="current" xmlns="http://www.w3.org/2000/svg" className={`${data.in_favorite ? "fill-red-500" : "fill-white"}`}>
            <path d="M4.63607 4.63607C3.80033 5.47179 3.13739 6.46395 2.68509 7.55588C2.23279 8.64782 2 9.81814 2 11C2 12.1819 2.23279 13.3523 2.68509 14.4442C3.13739 15.5361 3.80033 16.5283 4.63607 17.364L20 32.728L35.364 17.364C37.0518 15.6762 38 13.387 38 11C38 8.61309 37.0518 6.3239 35.364 4.63607C33.6761 2.94824 31.3869 2.00002 29 2.00002C26.613 2.00002 24.3238 2.94824 22.636 4.63607L20 7.27206L17.364 4.63607C16.5283 3.80033 15.5361 3.13739 14.4442 2.68509C13.3523 2.23279 12.1819 2 11 2C9.81814 2 8.64781 2.23279 7.55588 2.68509C6.46395 3.13739 5.47179 3.80033 4.63607 4.63607Z" fill="current" stroke={`${data.in_favorite ? "#e33b3b" : "#7C7C7C"}`} stroke-width="3.99999" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
        </div>
        <span className='text-[20px] font-normal sl:text-[24px]'>Плюшевый медведь</span>
        <span className='text-[23px] font-medium sl:text-[29px]'>2500 Р</span>
      <button onClick={handleClickCart} className='rounded-[20px] w-full h-[35px] text-center border-2 border-[#565656]  text-[#565656] text-[15px] sl:h-[55px] sl:text-[20px] hover:bg-gray-300'>В корзину</button>
    </div>
  )
}
