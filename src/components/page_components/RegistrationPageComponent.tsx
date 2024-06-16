"use client"
import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { ToastContainer, toast } from 'react-toastify';
import { useForm } from 'react-hook-form';
import { toastParams } from '@/service/toastifyParams';
import 'react-toastify/dist/ReactToastify.css';

import logo from "@/../public/images/svg-icons/logoIcon.svg";
import { ICity, IRegister } from '@/api/models';
import { getCities, registerUser } from '@/api/requests';
import Image from 'next/image';


export default function RegistrationPageComponent() {
    const router = useRouter();
    const { register, handleSubmit, formState: { errors } } = useForm();

    const [cities, setCities] = useState<ICity[]>()
    const [chosenCity, setChosenCity] = useState<string>()
    // const [isAgree, setIsAgree] = useState<boolean>(false)
    const isAgree = useRef<any>(null)

    function formSubmit(data: any) {
        console.log(data);
        console.log(chosenCity);
        console.log(isAgree.current.checked);
        if (data.password !== data.password2) {
            toast.error("Пароли не совпадают", toastParams)
            return
        }
        if (!chosenCity) {
            toast.error("Город не выбран", toastParams)
            return
        }
        if (isAgree.current !== null && !isAgree.current.checked) {
            toast.error("Подтвердите согласие на обработку персональных данных", toastParams)
            return
        }

        const postData: IRegister = {
            ...data,
            city: chosenCity,
        }

        registerUser(postData)
            .then((res) => {
                console.log(res);
                router.push("/sign-in")
                toast.success("Вы успешно зарегистрировались", toastParams)
            }).catch((er) => {
                let errorData = er.response.data
                for (let i in errorData) {
                    if (errorData[i].length > 1) {
                        for (let j in errorData[i]) {
                            toast.error(`(${i}) ${errorData[i][j]}`, toastParams)
                        }
                    } else {
                        toast.error(`(${i}) ${errorData[i][0]}`, toastParams)
                    }
                }
            })

    }

    useEffect(() => {
        getCities()
            .then((res) => {
                setCities(res.data)
            })
    }, [])

    return (
        <div className=''>
            <title>Регистрация</title>
            <ToastContainer />

            <form onSubmit={handleSubmit((data: any) => formSubmit(data))} className='flex flex-col max-w-[600px] items-center mt-[125px] px-5  mx-auto'>
                <Link className='' href={'/'}>
                    <div className="w-15 mx-auto mb-16">
                        <Image src={logo} alt="" />
                    </div>
                </Link>
                <h1 className='w-fit font-medium text-[35px] mb-5'>Регистрация</h1>

                <input {...register('username', { required: true })} type="text" placeholder='Логин' className="w-full py-[15px] px-[17px] font-light border-[1px] border-[#767676] rounded-[7px]" maxLength={100} />
                {errors.username && <p className='w-full text-left text-[14px] text-red-500'>Поле обязательно к заполнению</p>}
                <input {...register('first_name', { required: true })} type="text" placeholder='Имя' className="w-full py-[15px] mt-[15px] px-[17px] font-light border-[1px] border-[#767676] rounded-[7px]" maxLength={100} />
                {errors.first_name && <p className='w-full text-left text-[14px] text-red-500'>Поле обязательно к заполнению</p>}
                <input {...register('last_name', { required: true })} type="text" placeholder='Фамилия' className="w-full py-[15px] mt-[15px] px-[17px] font-light border-[1px] border-[#767676] rounded-[7px]" maxLength={100} />
                {errors.last_name && <p className='w-full text-left text-[14px] text-red-500'>Поле обязательно к заполнению</p>}
                <input {...register('email', { required: true })} type="email" placeholder='E-mail' className="w-full mt-[15px] py-[15px] px-[17px] font-light border-[1px] border-[#767676] rounded-[7px]" maxLength={100} />
                {errors.email && <p className='w-full text-left text-[14px] text-red-500'>Поле обязательно к заполнению</p>}
                <input {...register('password', { required: true })} type="password" placeholder='Пароль' className="w-full mt-[15px] py-[15px] px-[17px] font-light border-[1px] border-[#767676] rounded-[7px]" maxLength={100} />
                {errors.password && <p className='w-full text-left text-[14px] text-red-500'>Поле обязательно к заполнению</p>}
                <input {...register('password2', { required: true })} type="password" placeholder='Повторите пароль' className="w-full mt-[15px] py-[15px] px-[17px] font-light border-[1px] border-[#767676] rounded-[7px]" maxLength={100} />
                {errors.repeat_password && <p className='w-full text-left text-[14px] text-red-500'>Поле обязательно к заполнению</p>}

                <div className='custom-select mt-[15px]'>
                    <select name="" id="" defaultValue={""} onChange={(e) => { setChosenCity(e.target.value) }}>
                        <option value="" disabled>Выбрать город</option>
                        {
                            cities?.map((item, idx) => (
                                <option key={item.id} value={item.id}>{item.name}</option>
                            ))
                        }
                    </select>
                </div>


                <div className='w-full flex gap-[20px] mt-[15px]'>
                    <input type="checkbox" ref={isAgree} />
                    <Link href={'/privacy-policy'} className='underline font-light'>Согласие на обработку персональных данных</Link>
                </div>

                <button type='submit' className="mx-auto mt-[45px] max-w-[280px] h-[65px] rounded-[10px] text-[20px] w-full bg-black text-white">
                    Зарегистрироваться
                </button>

                <div className='flex gap-[5px]'>
                    <span className='font-light'>Уже есть созданный профиль?</span>
                    <span className='font-light'><span onClick={() => { router.push('/sign-in') }} className='underline hover:cursor-pointer'>Войти</span></span>
                </div>
            </form>

        </div>
    )
}
