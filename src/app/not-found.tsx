import Link from "next/link";

export default function notFound() {
  return (
    <div className="realtive w-full h-full">
        <div className="flex flex-col gap-[35px] absolute w-fit h-fit top-0 bottom-0 left-0 right-0 m-auto">
            <h1 className="text-[32px] lg:text-[46px]">404 | Страница не найдена</h1>
            <Link href={'/'} className="flex mb-0 mt-auto h-[65px] rounded-[10px] text-[20px] w-full border-[2px] border-black bg-black text-white hover:bg-black/90 hover:text-white">
              <span className="block w-fit h-fit text-[20px] m-auto">На главную</span>
            </Link>
        </div>
    </div>
  )
}
