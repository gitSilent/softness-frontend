"use client"
import React, { useState } from "react";
// import { Bars3Icon, UserIcon } from "@heroicons/react/24/solid";
import Image from "next/image";

import logo from "@/../public/images/svg-icons/logoIcon.svg";
import userIcon from "@/../public/images/svg-icons/userIcon.svg";
import cartIcon from "@/../public/images/svg-icons/cartIcon.svg";
import sandwichMenu from "@/../public/images/svg-icons/sandwichMenu.svg";
import Sidebar from "./Sidebar";
import Link from 'next/link'
import ModalFeedback from "./ModalFeedback";

export default function Header() {
  const [isSidebarOpened, setIsSidebarOpened] = useState<boolean>(false);
  const [isModalFeedbackActive, setIsModalFeedbackActive] = useState<boolean>(false)

  return (
    <div className="px-[20px] py-[16px] w-full z-50 bg-white flex fixed justify-between items-center gap-4">
      {isModalFeedbackActive && <ModalFeedback active={isModalFeedbackActive} setActive={setIsModalFeedbackActive}/>}
      
      <Sidebar
          isSidebarOpened={isSidebarOpened}
          setIsSidebarOpened={setIsSidebarOpened}
          setIsModalFeedbackActive={setIsModalFeedbackActive}
        />
      <Image
        src={sandwichMenu}
        className="min-w-[30px] max-w-[35px] z-[-1] hover:cursor-pointer sl:hidden"
        onClick={() => {
          setIsSidebarOpened(true);
        }}
        alt=""
      />
      <Link href={"/"}>
        <Image src={logo} alt="" className="w-[120px] hover:cursor-pointer" />
      </Link>

      <div className="max-w-[615px] w-full font-medium hidden sl:block">
        <ul className="flex justify-between max-w-[615px] text-[18px]">
          <li><Link href={"/"}>Главная</Link></li>
          <li><Link href={"/products"}>Товары</Link></li>
          <li><Link href={"/about"}>О нас</Link></li>
          <li onClick={()=>setIsModalFeedbackActive(true)} className="hover:cursor-pointer">Обратная связь</li>
        </ul>
      </div>

      <div className="flex gap-5">
        <Link href={"/cart"}><Image src={cartIcon} alt="" className="min-w-[25px] hover:cursor-pointer"/></Link>
        <Link href={"/profile"}><Image src={userIcon} alt="" className="min-w-[25px] hover:cursor-pointer"/></Link>
      </div>
    </div>
  );
}
