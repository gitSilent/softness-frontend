import Image from "next/image";

import toy_1 from '@/../public/images/toy_1.jpg'
import toy_2 from '@/../public/images/toy_2.jpg'
import toy_3 from '@/../public/images/toy_3.jpg'
import toy_4 from '@/../public/images/toy_4.jpg'
import Footer from '@/components/Footer'
import Header from '@/components/Header'

export default function AboutPage() {


  const staticData = [
    {
      "title": "Ваш личный магазин",
      "desc": "Мы предлагаем уникальную возможность каждому жителю стать продавцом и предложить свои плюшевые шедевры. Будь то ручная работа или коллекционные экземпляры, у нас есть место для всех! Вы сможете создать свой собственный магазин и продавать свои уникальные игрушки прямо здесь.",
      "img": toy_1
    },
    {
      "title": "Поддержка местных продавцов",
      "desc": "Наш маркетплейс специализируется на местных продавцах, что означает, что вы можете найти уникальные игрушки, отражающие дух и творчество Калужской области. Мы поддерживаем местное предпринимательство и помогаем продавцам расширить свою аудиторию, привлекая покупателей из региона.",
      "img": toy_2
    },
    {
      "title": "Легко начать",
      "desc": "Мы гордимся безопасной и удобной платформой, где вы можете легко создать свой профиль продавца и загрузить фотографии своих товаров. Мы предлагаем инструменты для управления заказами, установления цен и общения с покупателями. Вы сможете контролировать свой бизнес и взаимодействовать с клиентами без лишних сложностей.",
      "img": toy_3
    },
    {
      "title": "Одна большая семья",
      "desc": "Наша команда всегда готова помочь вам с любыми вопросами или проблемами. Мы стремимся создать дружественное сообщество, где продавцы и покупатели могут взаимодействовать, делиться своими историями и находить вдохновение. Мы организуем специальные мероприятия и акции, чтобы поддерживать вас и помогать вам достичь успеха.",
      "img": toy_4
    },
  ]


  return (
    <div className='relative min-h-full'>
      <Header />
      <main className="flex flex-col m-auto pb-[280px] pt-[90px] px-[20px] max-w-[1400px]">
        <h2 className='mx-auto text-[35px] font-semibold mb-[80px]'>О нас</h2>
        <div className='px-5 md:px-10'>

          {staticData.map((item, idx) => {
            return (
              <div key={idx}>
                <div className={`flex flex-col items-center lg:flex-row${(idx+1) % 2 === 0 ? '-reverse': ''} lg:gap-9 lg:max-w-6xl lg:m-auto`}>
                  <Image src={item.img} alt="" className="w-[410px]"/>
                  <div className={`flex flex-col ${(idx+1) % 2 === 0 ? 'items-end': 'items-start'} gap-5`}>
                    <h3 className='font-medium uppercase xs:text-xl sm:text-2xl'>{item.title}</h3>
                    <p className={`font-light ${(idx+1) % 2 === 0 ? 'text-right': 'text-left'} xs:text-lg sm:text-xl mb-10 text-gray-800`}>{item.desc}</p>
                  </div>
                </div>
                <hr className='h-[2px] w-3/4 m-auto bg-black/20' />
              </div>
            )
          })}

        </div>
      </main>
      <Footer />
    </div>





  )
}
