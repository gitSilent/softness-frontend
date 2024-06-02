"use client"
import Image from "next/image";

import Link from 'next/link'
import sandwichMenuWhite from "@/../public/images/svg-icons/sandwichMenuWhite.svg";


interface IProps {
  isSidebarOpened: boolean;
  setIsSidebarOpened: React.Dispatch<React.SetStateAction<boolean>>,
  setIsModalFeedbackActive: React.Dispatch<React.SetStateAction<boolean>>
}

export default function Sidebar({ isSidebarOpened, setIsSidebarOpened, setIsModalFeedbackActive}: IProps) {
  return (
    <div
      className={`fixed top-0 left-0 z-80 h-full w-[100vw] bg-black ease-in-out duration-300 ${
        isSidebarOpened ? "translate-x-0 " : "-translate-x-full"
      }`}
    >
      <Image
        src={sandwichMenuWhite}
        color="white"
        className="w-[35px] ml-[25px] mt-[22px] mb-5 z-[10] hover:cursor-pointer"
        onClick={() => {
          setIsSidebarOpened(false);
        }}
        alt=""
      />
      <div>
          <Link href={"/"} className="block px-3 py-5 text-2xl text-white pl-[25px] hover:bg-slate-600 hover:cursor-pointer duration-100">Главная</Link>
          <hr className="bg-black h-[1px]" />
          <Link href={"/products"} className="block px-3 py-5 text-2xl text-white pl-[25px] hover:bg-slate-600 hover:cursor-pointer duration-100">Товары</Link>
          <hr className="bg-black h-[1px]" />
          <Link href={"/about"} className="block px-3 py-5 text-2xl text-white pl-[25px] hover:bg-slate-600 hover:cursor-pointer duration-100">О нас</Link>
          <hr className="bg-black h-[1px]" />
          <div onClick={() => {
            setIsSidebarOpened(false);
            setIsModalFeedbackActive(true)
          }} className="block px-3 py-5 text-2xl text-white pl-[25px] hover:bg-slate-600 hover:cursor-pointer duration-100">Обратная связь</div>
  
      </div>
    </div>
  );
}
