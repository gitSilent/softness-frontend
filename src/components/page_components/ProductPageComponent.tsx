"use client"
import React, { useRef, useState } from "react";

import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Navigation, Thumbs } from "swiper/modules";
import Image from "next/image";

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

import { useDraggable } from "react-use-draggable-scroll";

import product from "@/../public/images/product_card.jpg";
import cartIcon from "@/../public/images/svg-icons/cartIcon.svg";
import { IProduct } from "@/api/models";

export default function ProductPageComponent() {
  const [thumbsSwiper, setThumbsSwiper] = useState<any>(null);

  const ref = useRef<HTMLDivElement>() as React.MutableRefObject<HTMLInputElement>;
  const { events } = useDraggable(ref); 

  return (
    <div className="relative min-h-full">
      <Header />
      <main className="flex flex-col items-center z-[1] m-auto pb-[400px] pt-[90px] px-[20px] max-w-[1400px]">
        <section className="relative flex flex-col max-w-[500px] lg:max-w-[1000px] w-full z-[1] ">
          <div className="flex flex-col lg:flex-row lg:gap-[80px]">
            <div className="w-full max-w-[500px]">
              <Swiper
                style={{}}
                spaceBetween={10}
                navigation={true}
                thumbs={{ swiper: thumbsSwiper }}
                modules={[FreeMode, Navigation, Thumbs]}
                className="mySwiper2"
              >
                <SwiperSlide className="rounded-[35px]">
                  <Image src={product} className="rounded-[35px]" alt=""/>
                </SwiperSlide>
                <SwiperSlide className="rounded-[35px]">
                  <Image src={product} className="rounded-[35px]" alt=""/>
                </SwiperSlide>
                <SwiperSlide className="rounded-[35px]">
                  <Image src={product} className="rounded-[35px]" alt=""/>
                </SwiperSlide>
                <SwiperSlide className="rounded-[35px]">
                  <Image src={product} className="rounded-[35px]" alt=""/>
                </SwiperSlide>
                <SwiperSlide className="rounded-[35px]">
                  <Image src={product} className="rounded-[35px]" alt=""/>
                </SwiperSlide>
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
                <SwiperSlide className="rounded-[35px]">
                  <Image src={product} className="rounded-[15px]" alt=""/>
                </SwiperSlide>
                <SwiperSlide className="rounded-[35px]">
                  <Image src={product} className="rounded-[15px]" alt=""/>
                </SwiperSlide>
                <SwiperSlide className="rounded-[35px]">
                  <Image src={product} className="rounded-[15px]" alt=""/>
                </SwiperSlide>
                <SwiperSlide className="rounded-[35px]">
                  <Image src={product} className="rounded-[15px]" alt=""/>
                </SwiperSlide>
                <SwiperSlide className="rounded-[35px]">
                  <Image src={product} className="rounded-[15px]" alt=""/>
                </SwiperSlide>
              </Swiper>
            </div>

            <div className="top-[80px] h-fit lg:sticky">
              <div className="flex justify-between items-center">
                <h2 className="font-medium uppercase text-[25px] max-w-[60%]">
                  Плюшевый медведь
                </h2>
                <span className="text-[25px]">2500 Р</span>
              </div>

              <div className="mt-[20px] mb-[10px]">
                <span className="text-[16px] font-medium uppercase">
                  Характеристики
                </span>
                <ul>
                  <li>
                    <span className="font-medium text-[14px]">Наполнитель:</span>{" "}
                    синтепон
                  </li>
                  <li>
                    <span className="font-medium text-[14px]">
                      Материал вязки:
                    </span>{" "}
                    шерсть
                  </li>
                  <li>
                    <span className="font-medium text-[14px]">Тип вязки:</span>{" "}
                    крупная
                  </li>
                  <li>
                    <span className="font-medium text-[14px]">
                      Элементы из жестких материалов:
                    </span>{" "}
                    есть
                  </li>
                </ul>
              </div>

              <div className="flex gap-[25px] mt-[30px]">
                <button className="max-w-[280px] h-[65px]  rounded-[20px] text-[20px] w-full bg-black text-white">
                  Купить
                </button>
                <button className="flex items-center justify-center min-w-[65px] min-h-[65px] rounded-[20px] border-[2px] border-black text-[20px] bg-white text-black">
                  <Image src={cartIcon} alt="" className="w-[20px]" />
                </button>
              </div>
            </div>
          </div>
        
          <div className="mt-[50px]">
            <h2 className="text-[16px] font-medium uppercase mb-[10px]">Описание</h2>
            <p className="text-[14px] font-normal">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Commodi aliquid dicta velit, qui vitae voluptates, dolor cum tenetur libero quam architecto perferendis cupiditate! Qui, ducimus! Pariatur, dicta neque facilis eligendi modi molestias, voluptatibus est veniam magni blanditiis nostrum eaque nulla voluptatum soluta reiciendis autem incidunt sed consectetur nesciunt ratione architecto. Alias eligendi illum iste earum? Doloribus, optio dolores quod omnis possimus ipsum, qui nesciunt distinctio vero eos eveniet excepturi natus consectetur iure ad cupiditate eum accusamus voluptatem, ab voluptas consequuntur tempora ipsa. Quae suscipit tempora, provident facere illum neque aut vero quos doloribus eligendi ex quidem debitis numquam earum laudantium.</p>
          </div>

          <h2 className="mt-[50px] text-[16px] font-medium uppercase mb-[10px]">Отзывы</h2>
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
           
          </div>
        </section>

      </main>

      <Footer />
    </div>
  );
}
