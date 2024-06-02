"use client"
import Modal from 'react-modal';
import Image from "next/image";

import ex from '@/../public/images/svg-icons/ex.svg'

interface IProps{
    active:boolean,
    setActive:React.Dispatch<React.SetStateAction<boolean>>
}

export default function ModalFeedback({active, setActive}:IProps) {
  return (
    <Modal
        isOpen={active}
        className={"hideScroll"}
        onRequestClose={() => setActive(false)}
        contentLabel="Feedback Modal"
    >
        <div className='absolute top-0 left-0 right-0 bottom-0 m-auto p-[25px] md:p-[50px] bg-white w-[90vw] h-[60vh] md:max-w-[1000px] md:max-h-[650px]'>
            <Image src={ex} onClick={() => setActive(false)} alt="" className='absolute w-[20px] h-[20px] top-[20px] right-[20px] md:top-[50px] md:right-[50px] hover:cursor-pointer'/>
            <div className='flex flex-col items-center h-full'>
                <h1 className='w-fit font-medium text-[35px] mb-5'>Свяжитесь с нами</h1>
                <textarea placeholder='Сообщение'  className="w-full py-[15px] px-[17px] font-light border-[1px] border-[#767676] rounded-[7px] h-full md:max-w-[600px] md:max-h-[350px]" maxLength={100}  />
                <button className="mx-auto mt-[45px] max-w-[280px] h-[65px] rounded-[10px] text-[20px] w-full bg-black text-white">Отправить</button>

            </div>

        </div>
    </Modal>
  )
}
