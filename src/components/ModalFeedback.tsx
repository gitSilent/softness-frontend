"use client"
import Modal from 'react-modal';
import Image from "next/image";

import ex from '@/../public/images/svg-icons/ex.svg'
import { FormEvent, useState } from 'react';
import { sendFeedback } from '@/api/requests';
import { toast } from 'react-toastify';
import { toastParams } from '@/service/toastifyParams';

interface IProps {
    active: boolean,
    setActive: React.Dispatch<React.SetStateAction<boolean>>
}

export default function ModalFeedback({ active, setActive }: IProps) {
    const [message, setMessage] = useState<string>()

    const submitForm = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (message?.trim()) {
            sendFeedback({ message })
                .then((res) => {
                    toast.success("Сообщение успешно отправлено", toastParams)
                    setActive(false)
                }).catch((er) => {
                    toast.error("Не удалось отправить сообщение", toastParams)
                })
        }else{
            toast.info("Пожалуйста, заполните поле для сообщения", toastParams)
        }
    }

    return (
        <Modal
            isOpen={active}
            className={"hideScroll"}
            onRequestClose={() => setActive(false)}
            contentLabel="Feedback Modal"
        >
            <div className='absolute top-0 left-0 right-0 bottom-0 m-auto p-[25px] md:p-[50px] bg-white w-[90vw] h-[60vh] md:max-w-[1000px] md:max-h-[650px]'>
                <Image src={ex} onClick={() => setActive(false)} alt="" className='absolute w-[20px] h-[20px] top-[20px] right-[20px] md:top-[50px] md:right-[50px] hover:cursor-pointer' />
                <form onSubmit={(e) => { submitForm(e) }} className='flex flex-col items-center h-full'>
                    <h1 className='w-fit font-medium text-[35px] mb-5'>Свяжитесь с нами</h1>
                    <textarea value={message} onChange={(e)=>{setMessage(e.target.value)}} placeholder='Сообщение' className="w-full py-[15px] px-[17px] font-light border-[1px] border-[#767676] rounded-[7px] h-full md:max-w-[600px] md:max-h-[350px]" maxLength={100} />
                    <button type='submit' className="mx-auto mt-[45px] max-w-[280px] h-[65px] rounded-[10px] text-[20px] w-full bg-black text-white">Отправить</button>

                </form>

            </div>
        </Modal>
    )
}
