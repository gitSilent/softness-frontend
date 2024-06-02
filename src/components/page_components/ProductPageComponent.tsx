"use client"
import React, { useEffect, useRef, useState } from "react";

import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Navigation, Thumbs } from "swiper/modules";
import Image from "next/image";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// import required modules
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Review from "@/components/Review";

// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";

import "@/styles/bigSwiperStyles.css";

// import { useDraggable } from "react-use-draggable-scroll";

import product from "@/../public/images/product_card.jpg";
import cartIcon from "@/../public/images/svg-icons/cartIcon.svg";
import { IProduct } from "@/api/models";
import { addToCart, getProduct } from "@/api/requests";
import { toastParams } from "@/service/toastifyParams";
import { useRouter } from "next/navigation";

export default function ProductPageComponent({ pk }: { pk: string }) {
  const [thumbsSwiper, setThumbsSwiper] = useState<any>(null);
  const router = useRouter()
  const ref = useRef<HTMLDivElement>() as React.MutableRefObject<HTMLInputElement>;
  // const { events } = useDraggable(ref);

  const [product, setProduct] = useState<IProduct>()

  console.log(pk);


  useEffect(() => {
    getProduct({ pk })
      .then((res) => {
        setProduct(res.data)
      })
  }, [])

  return (
    <div className="relative min-h-full">
      <ToastContainer />
      <Header />
      <main className="flex flex-col items-center z-[1] m-auto pb-[400px] pt-[90px] px-[20px] max-w-[1400px]">
        <section className="relative flex flex-col max-w-[500px] lg:max-w-[1000px] w-full z-[1] ">
          <div className="flex flex-col lg:flex-row lg:gap-[80px]">
            <div className="w-full max-w-[500px] h-fit">
              <Swiper
                style={{}}
                spaceBetween={10}
                navigation={true}
                thumbs={{ swiper: thumbsSwiper }}
                modules={[FreeMode, Navigation, Thumbs]}
                className="mySwiper2"
              >
                {product?.photos.map((item, idx) => (
                  <SwiperSlide key={idx}>
                    <Image src={item.photo} width={500} height={300} className="rounded-[25px]" alt="" />
                  </SwiperSlide>
                ))}
              </Swiper>
              <Swiper
                onSwiper={setThumbsSwiper}
                spaceBetween={10}
                slidesPerView={4}
                // freeMode={true}
                watchSlidesProgress={true}
                modules={[FreeMode, Navigation, Thumbs]}
                className="mySwiper"
              >
                {product?.photos.map((item, idx) => (
                  <SwiperSlide key={idx}>
                    <Image src={item.photo} width={500} height={500} className="rounded-[15px] h-[100px]" alt="" />
                  </SwiperSlide>
                ))}

              </Swiper>
            </div>

            <div className="top-[80px] h-fit lg:min-w-[370px] lg:sticky">
              <div className="flex justify-between items-center">
                <h2 className="font-medium uppercase text-[25px] max-w-[60%]">
                  {product?.title}
                </h2>
                <span className="text-[25px]">{product?.price} Р</span>
              </div>

              <div className="mt-[20px] mb-[10px]">
                <span className="text-[16px] font-medium uppercase">
                  Характеристики
                </span>
                <ul>
                  <li>
                    <span className="font-medium text-[14px]">Наполнитель: <span className="font-normal">{product?.filler ? product?.filler.toLowerCase() : " - "}</span></span>
                  </li>
                  <li>
                    <span className="font-medium text-[14px]">Материал вязки: <span className="font-normal">{product?.material ? product?.material.toLowerCase() : " - "}</span></span>
                  </li>
                  <li>
                    <span className="font-medium text-[14px]">Тип вязки: <span className="font-normal">{product?.knitting_type ? product?.knitting_type.toLowerCase() : " - "}</span></span>
                  </li>
                  <li>
                    <span className="font-medium text-[14px]">Элементы из жестких материалов: <span className="font-normal">{product?.is_hard_materials ? "есть" : "нет"}</span></span>
                  </li>
                </ul>
              </div>

              <div className="flex gap-[25px] mt-[30px]">
                <button className="max-w-[280px] h-[65px]  rounded-[20px] text-[20px] w-full bg-black text-white">
                  Купить
                </button>
                {product?.in_cart
                  ? <button onClick={() => {
                    router.push('/cart')
                  }} className={`flex items-center justify-center min-w-[180px] min-h-[65px] rounded-[20px] px-[5px] border-[2px] border-black text-[20px] bg-white text-black`}>
                    <svg width="30" height="30" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path fill-rule="evenodd" clip-rule="evenodd" d="M16.8861 5.49957C17.0736 5.6871 17.1789 5.94141 17.1789 6.20657C17.1789 6.47174 17.0736 6.72605 16.8861 6.91357L8.88612 14.9136C8.69859 15.101 8.44428 15.2064 8.17912 15.2064C7.91395 15.2064 7.65965 15.101 7.47212 14.9136L3.47212 10.9136C3.28996 10.725 3.18917 10.4724 3.19144 10.2102C3.19372 9.94798 3.29889 9.69716 3.4843 9.51175C3.66971 9.32635 3.92052 9.22118 4.18272 9.2189C4.44491 9.21662 4.69752 9.31742 4.88612 9.49957L8.17912 12.7926L15.4721 5.49957C15.6596 5.3121 15.914 5.20679 16.1791 5.20679C16.4443 5.20679 16.6986 5.3121 16.8861 5.49957Z" fill="black" />
                    </svg>
                    <span className="break-keep">Уже в корзине</span>
                  </button>

                  : <button onClick={async() => {
                    if(product?.id){
                      // console.log(await addToCart({ product_id: product?.id }));
                      
                      addToCart({ product_id: product?.id })
                        .then((res) => {
                          console.log(res);
                          
                          getProduct({ pk })
                            .then((res) => {
                              setProduct(res.data)
                            })
                          toast.success("Товар добавлен в корзину", toastParams)
                        }).catch((er)=>{
                          console.log('123123');
                          
                          if (er.response.status === 401){
                            router.push('/sign-in')
                          }else{
                            toast.error("Не удалось добавить товар в корзину", toastParams)
                          }
                        })
                    } 
                  }} className={`flex items-center justify-center min-w-[65px] min-h-[65px] rounded-[20px] border-[2px] border-black text-[20px] bg-white text-black`}>
                    <Image src={cartIcon} alt="" className="w-[20px]" />
                  </button>
                }
              </div>
            </div>
          </div>

          <div className="mt-[50px]">
            <h2 className="text-[16px] font-medium uppercase mb-[10px]">Описание</h2>
            <p className="text-[14px] font-normal">{product?.desc}</p>
          </div>

          {/* <h2 className="mt-[50px] text-[16px] font-medium uppercase mb-[10px]">Отзывы</h2>
          <div className="flex gap-[10px] max-w-[100%] mx-auto overflow-x-auto hideScroll" {...events} ref={ref} >
            <Review
              username="Анастасия"
              rating={5}
              description="Lorem ipsum dolor, sit amet consectetur adipisicing elit. Unde voluptates, quae reprehenderit magni in ullam porro, numquam facere nobis repellat placeat tenetur quod? Quia nesciunt modi dolor id vitae beatae."
              creation_date="10 сентября 2023" />

            <Review
              username="Анастасия"
              rating={5}
              description="Lorem ipsum dolor, sit amet consectetur adipisicing elit. Unde voluptates, quae reprehenderit magni in ullam porro, numquam facere nobis repellat placeat tenetur quod? Quia nesciunt modi dolor id vitae beatae."
              creation_date="10 сентября 2023" />

            <Review
              username="Анастасия"
              rating={5}
              description="Lorem ipsum dolor, sit amet consectetur adipisicing elit. Unde voluptates, quae reprehenderit magni in ullam porro, numquam facere nobis repellat placeat tenetur quod? Quia nesciunt modi dolor id vitae beatae."
              creation_date="10 сентября 2023" />

          </div> */}
        </section>

      </main>

      <Footer />
    </div>
  );
}
