"use client"
import React, { useEffect, useState } from "react";
// import { Bars3Icon, UserIcon } from "@heroicons/react/24/solid";
import Image from "next/image";

import logo from "@/../public/images/svg-icons/logoIcon.svg";
import userIcon from "@/../public/images/svg-icons/userIcon.svg";
import cartIcon from "@/../public/images/svg-icons/cartIcon.svg";
import sandwichMenu from "@/../public/images/svg-icons/sandwichMenu.svg";
import Sidebar from "./Sidebar";
import Link from 'next/link'
import ModalFeedback from "./ModalFeedback";
import { ICart } from "@/api/models";
import { getCart } from "@/api/requests";
import { authCheck } from "@/service/authCheck";
import { useRouter } from "next/navigation";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

interface IProps {
  cartData?: ICart
}

export default function Header(data: IProps) {
  const router = useRouter()

  const [isSidebarOpened, setIsSidebarOpened] = useState<boolean>(false);
  const [isModalFeedbackActive, setIsModalFeedbackActive] = useState<boolean>(false)
  const [cart, setCart] = useState<ICart>()

  const [isAuthed, setIsAuthed] = useState(false)

  useEffect(() => {
    (async () => {
      if (await authCheck() && !data.cartData) {
        setIsAuthed(true)
        getCart()
          .then((res) => {
            setCart(res.data)
          })
      }
    })()
  }, [])

  useEffect(() => {
    if (data.cartData) {
      setCart(data.cartData)
    }
  }, [data])
  return (
    <>
      <ToastContainer />
      <div className="px-[20px] py-[16px] w-full z-10 bg-white flex fixed justify-between items-center gap-4">
        {isModalFeedbackActive && <ModalFeedback active={isModalFeedbackActive} setActive={setIsModalFeedbackActive} />}
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
        <a href={"/"}>
          <Image src={logo} alt="" className="w-[120px] hover:cursor-pointer" />
        </a>

        <div className="max-w-[615px] w-full font-medium hidden sl:block">
          <ul className="flex justify-between max-w-[615px] text-[18px]">
            <li><Link href={"/"}>Главная</Link></li>
            <li><Link href={"/products"}>Товары</Link></li>
            <li><Link href={"/about"}>О нас</Link></li>
            <li onClick={() => {
              if (isAuthed) {
                setIsModalFeedbackActive(true)
              } else {
                router.push('/sign-in')
              }
            }} className="hover:cursor-pointer">Обратная связь</li>
          </ul>
        </div>

        <div className="flex gap-5">
          <Link href={"/cart"} className="relative">
            <Image src={cartIcon} alt="" className="min-w-[25px] hover:cursor-pointer" />
            {(cart && cart?.items.length > 0) &&
              <div className="absolute z-[1] bottom-[-10px] right-[-5px] flex justify-center items-center h-[19px] w-[19px] rounded-full bg-[#E3A164]">
                <span className="block text-[14px]">{cart.items?.length}</span>
              </div>
            }
            {/* {(data.cartData && (data.cartData?.items?.length > 0)) &&
            <div className="absolute bottom-[-10px] right-0 flex justify-center items-center h-[19px] w-[19px] rounded-full bg-[#E3A164]">
            <span className="block text-[14px]">{data.cartData?.items?.length}</span>
            </div>
            } */}
          </Link>
          <Link href={"/profile"}><Image src={userIcon} alt="" className="min-w-[25px] hover:cursor-pointer" /></Link>
        </div>
      </div>
    </>
  );
}
