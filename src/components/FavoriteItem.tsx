"use client"
import ex from '@/../public/images/svg-icons/ex.svg'
import product from '@/../public/images/product_card.jpg'
import Link from 'next/link'
import Image from "next/image";
import { IFavoriteItem } from '@/api/models';
import { deleteFromFavorite } from '@/api/requests';

interface IProps {
  data: IFavoriteItem,
  getData: Function
}

export default function FavoriteItem({ data, getData }: IProps) {
  const idproduct = 1;

  return (
    <div className='relative flex flex-col min-w-[210px] max-w-[210px] md:max-w-[260px] max-h-[440px] rounded-tl-[25px] rounded-tr-[25px] overflow-hidden hover:cursor-pointer'>
      <Image onClick={()=>{
        deleteFromFavorite({fav_item_id:data.id})
        .then((res)=>{
          getData()
        })
      }} src={ex} alt="" className='z-[5] absolute w-[20px] h-[20px] top-[20px] right-[20px] hover:cursor-pointer' />
      <Link href={`/products/${data.product.id}`} className='flex flex-col'>
        <div className='relative w-[260px] h-[170px]'>
          {data.product.photos.length !== 0
            ? <Image src={data.product.photos[0].photo} height={300} width={300} alt="" className='h-full w-full object-cover' />
            : <span className='block h-fit w-fit absolute top-0 bottom-0 left-0 right-0 m-auto'>нет фото</span>
          }
        </div>
        <span className='text-[16px] font-normal sl:text-[20px]'>{data.product.title}</span>
        <span className='text-[20px] font-medium sl:text-[23px]'>{data.product.price} Р</span>
      </Link>
    </div>
  )
}
