"use client"
import { useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { ToastContainer, toast } from 'react-toastify';
import { useForm } from 'react-hook-form';
import { toastParams } from '@/service/toastifyParams';
import 'react-toastify/dist/ReactToastify.css';

import logo from "@/../public/images/svg-icons/logoIcon.svg";
import { createToken } from '@/api/requests';
import { addMinutes } from '@/service/addMinutes';
import Image from 'next/image';


export default function AuthorizationPageComponent() {

    const router = useRouter()
    const { register, handleSubmit, formState: { errors } } = useForm();

    function formSubmit(data: any) {
        createToken({ ...data })
            .then((res) => {
                console.log(res.data);
                let currentDate = new Date();
                let cookieAccess = `access=${res.data.access}; expires=${addMinutes(currentDate, 5)}`
                let cookieRefresh = `refresh=${res.data.refresh}; expires=${addMinutes(currentDate, 1440)}`

                document.cookie = cookieAccess;
                document.cookie = cookieRefresh;

                // localStorage.setItem('access', res.data.access)
                // localStorage.setItem('refresh', res.data.refresh)
                router.push('/')


            }).catch((er) => {
                let errorData = er.response.data
                toast.error(`${errorData.detail}`, toastParams)
            })



        // toast.error("Проверьте введенные данные", toastParams)
    }

    return (
        <div className=''>
            <ToastContainer />

            <form onSubmit={handleSubmit((data: any) => formSubmit(data))} className='flex flex-col max-w-[600px] items-center mt-[125px] px-5 gap-3 mx-auto'>
                <Link className='' href={'/'}>
                    <div className="w-15 mx-auto mb-16">
                        <Image src={logo} alt="" />
                    </div>
                </Link>
                <h1 className='w-fit font-medium text-[35px] mb-5'>Авторизация</h1>

                <input {...register('username', { required: true })} type="text" placeholder='Логин' className="w-full max-w-[600px] py-[15px] px-[17px] font-light border-[1px] border-[#767676] rounded-[7px]" maxLength={100} />
                {errors.username && <p className='w-full text-left text-[14px] text-red-500'>Поле обязательно к заполнению</p>}
                <input {...register('password', { required: true })} type="password" placeholder='Пароль' className="w-full max-w-[600px] py-[15px] px-[17px] font-light border-[1px] border-[#767676] rounded-[7px]" maxLength={100} />
                {errors.password && <p className='w-full text-left text-[14px] text-red-500'>Поле обязательно к заполнению</p>}

                <button className="mx-auto mt-[45px] max-w-[280px] h-[65px] rounded-[10px] text-[20px] w-full bg-black text-white">
                    Войти
                </button>

                <div className='flex gap-[5px]'>
                    <span className='font-light'>Нет созданного профиля?</span>
                    <span className='font-light'><span onClick={() => { router.push('/sign-up') }} className='underline hover:cursor-pointer'>Зарегистрироваться</span></span>
                </div>
            </form>

        </div>
    )
}
