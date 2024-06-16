"use client"
import Image from "next/image";
import logo from "@/../public/images/svg-icons/logo-whiteIcon.svg";
import vkLogo from "@/../public/images/svg-icons/vk-whiteLogo.svg";
import tgLogo from "@/../public/images/svg-icons/tg-whiteLogo.svg";
import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="absolute rounded-tl-[45px] rounded-tr-[45px] left-0 bottom-0 w-full p-[37px] bg-black flex flex-col">
      <div className="w-full max-w-[1400px] mx-auto">
        <div className="hidden mx-auto md:flex items-center gap-[40px] pb-[20px] border-b-[1px] border-[#767676] w-fit mb-[40px]">
          <span className="text-[23px] text-white font-semibold">info@softness.com</span>
          <a href="mailto:info@softness.com" className="py-[12px] px-[30px] bg-[#efb279] rounded-full font-medium text-[17px] hover:bg-[#D89556]">Связаться с нами</a>
        </div>
        <div className="flex justify-between w-full">
          <div className="flex flex-col gap-[50px] md:flex-row md:items-center md:w-[60%] md:justify-between">
            <a href="/">
              <Image src={logo} alt="" className="w-[120px] hover:cursor-pointer" />
            </a>
            <div className="flex flex-col text-white max-w-[455px] text-[20px] md:flex-row md:justify-between md:w-full">
              <Link href={"/"}>Главная</Link>
              <Link href={"/products"}>Товары</Link>
              <Link href={"/about"}>О нас</Link>
            </div>
          </div>
          <div className="flex flex-col lg:flex-row gap-[35px] items-center justify-between">
            <div className="flex gap-[35px]">
              <a href="https://t.me/silent77777"><Image src={tgLogo} alt="" className="w-[41px] hover:cursor-pointer" /></a>
              <a href="https://vk.com/darianatoys"><Image src={vkLogo} alt="" className="w-[41px] hover:cursor-pointer" /></a>
            </div>
            <a href="tel:79054756454" className="text-white underline decoration-white">+79054756454</a>
          </div>
        </div>
        <div>
          <Link href={'/privacy-policy'} className="block text-white/65 mt-[10px] text-right hover:text-white/80">Политика обработки персональных данных</Link>
        </div>
      </div>
    </footer>
  );
}
