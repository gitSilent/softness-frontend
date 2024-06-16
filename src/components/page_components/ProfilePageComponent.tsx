"use client"
import { useEffect, useRef, useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Order from "@/components/Order";
import FavoriteItem from "@/components/FavoriteItem";
import { useDraggable } from "react-use-draggable-scroll";
import { authCheck } from "@/service/authCheck";
import { useRouter } from "next/navigation";
import { getFavorite, getOrders, getUserInfo } from "@/api/requests";
import { IFavorite, IOrder, IUserInfo } from "@/api/models";

export default function ProfilePageComponent() {
  const ref = useRef<HTMLDivElement>() as React.MutableRefObject<HTMLInputElement>;
  const { events } = useDraggable(ref);
  const router = useRouter()

  const [orders, setOrders] = useState<IOrder[]>()
  const [favorite, setFavorite] = useState<IFavorite>()
  const [userInfo, setUserInfo] = useState<IUserInfo>()

  const fetchFavorite = () => {
    getFavorite()
      .then((res) => {
        setFavorite(res.data)
      })
  }

  const fetchOrders = () => {
    getOrders()
      .then((res) => {
        setOrders(res.data)
      })
  }

  useEffect(() => {
    (async () => {
      if (!await authCheck()) {
        router.push('/sign-in')
        return
      }

      getUserInfo()
      .then((res)=>{
        setUserInfo(res.data)
      })

      fetchOrders()
      fetchFavorite()
    })()

  }, [router])
  return (
    <div className="relative min-h-full">
      <title>Профиль</title>
      <Header />
      <main className="flex flex-col m-auto pb-[310px] lg:pb-[280px] pt-[90px] px-[20px] max-w-[1400px]">
        <section className="flex flex-col md:flex-row gap-[30px]">
          <div className="flex flex-col justify-between w-full max-w-[570px]">
            <div>
              <h2 className="text-[30px] mb-[45px]">Личные данные</h2>

              <div className="flex justify-between w-full mb-[20px] gap-[20px] items-center">
                <span>Имя пользователя</span>
                <input type="text" disabled value={userInfo?.username} className="w-full max-w-[400px] py-[15px] px-[17px] font-light border-[1px] border-[#767676] rounded-[7px]" />
              </div>

              <div className="flex justify-between w-full gap-[20px] items-center">
                <span className="whitespace-nowrap">E-mail</span>
                <input type="text" disabled value={userInfo?.email} className="w-full max-w-[400px] py-[15px] px-[17px] font-light border-[1px] border-[#767676] rounded-[7px]" />
              </div>

            </div>

            <button onClick={() => {
              let cookieAccess = `access=""; expires= Thu, 01 Jan 1970 00:00:00 GMT}`;
              let cookieRefresh = `refresh=""; expires= Thu, 01 Jan 1970 00:00:00 GMT}`;

              document.cookie = cookieAccess;
              document.cookie = cookieRefresh;

              router.push('/sign-in')
            }} className="mb-0 mt-[20px] h-[65px] rounded-[10px] text-[20px] w-full border-[2px] border-black bg-black text-white hover:bg-black/90 hover:text-white">
              Выйти
            </button>
          </div>

          <div className="w-full">
            <h2 className="text-[30px] mb-[45px]">Мои заказы</h2>
            <div className="flex flex-col gap-[15px] max-h-[400px] overflow-y-auto p-[1px]">
              {orders?.length === 0 &&
                <span className="block font-light text-[24px]">
                  Нет заказов
                </span>}
              {orders?.map((item) => (
                <Order key={item.id} data={item} getOrders={fetchOrders}/>
              ))}
            </div>
          </div>
        </section>

        <section className="mt-[80px]">
          <h2 className="text-[30px] mb-[45px]">Избранное</h2>
          <div className="flex gap-[20px] overflow-x-auto w-full" {...events} ref={ref}>
            {favorite?.items?.length === 0 &&
              <span className="block font-light text-[24px]">
                Нет товаров в избранном
              </span>}
            {favorite?.items?.map((item) => (
              <FavoriteItem key={item.id} data={{ ...item }} getData={fetchFavorite} />
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
