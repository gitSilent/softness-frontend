"use client"
import { useEffect, useRef, useState } from "react";
import FormControl from "@mui/material/FormControl/FormControl";
import InputLabel from "@mui/material/InputLabel/InputLabel";
import Select from "@mui/material/Select/Select";
import MenuItem from "@mui/material/MenuItem/MenuItem";
import Image from "next/image";
import ReactPaginate from 'react-paginate';

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";

import product from '@/../public/images/product_card.jpg'
import ex from '@/../public/images/svg-icons/ex.svg'
import { IProduct, IProductsResponse } from "@/api/models";
import { getProducts } from "@/api/requests";

export default function ProductsPageComponent() {
  const [products, setProducts] = useState<IProductsResponse>()
  const [maxPrice, setMaxPrice] = useState<number>(0)
  const [minPrice, setMinPrice] = useState<number>(0)
  const [currentPage, setCurrentPage] = useState<number>(1)

  const maxPriceInput = useRef<any>(null)
  const minPriceInput = useRef<any>(null)

  const fetchData = () => {
    getProducts({ page: currentPage, min_price: minPrice, max_price: maxPrice })
      .then((res) => {
        setProducts(res.data)
      })
  }

  useEffect(() => {
    if (minPrice === 0) {
      minPriceInput.current.value = ""
    }

    if (maxPrice === 0) {
      maxPriceInput.current.value = ""
    }

    fetchData()
  }, [currentPage, minPrice, maxPrice])

  return (
    <div className="relative min-h-full">
      <Header />
      <main className="flex flex-col m-auto pb-[280px] pt-[90px] px-[20px] max-w-[1400px]">
        <h2 className="m-auto w-fit text-[25px] uppercase font-semibold mb-[50px] sl:text-[35px]">
          Каталог
        </h2>

        <div className="mb-[30px] flex flex-col md:flex-row gap-[10px] w-full justify-between">
          <div className="flex gap-[5px] w-full">
            <input
              type="text"
              placeholder="Поиск по товарам"
              className="border-[#565656] max-w-[830px] w-full py-[12px] px-[15px] border-[1px] rounded-tl-[100px] rounded-bl-[100px] rounded-tr-[30px] rounded-br-[30px]"
            />
            <button className="py-[12px] px-[15px] border-[1px] border-black bg-black text-white rounded-tr-[100px] rounded-br-[100px] rounded-tl-[30px] rounded-bl-[30px]">
              Найти
            </button>
          </div>
          <div className="flex flex-col gap-[5px] sm:flex-row">
            <FormControl>
              <InputLabel id="demo-simple-select-label">Сортировка</InputLabel>
              <Select
                style={{ borderRadius: '100px', border: '1px', borderColor: '#767676' }}
                labelId="demo-simple-select-label"
                id="default-select"
                label="Сортировка"
                defaultValue={'popularity'}
              >
                <MenuItem value={'popularity'}>По популярности</MenuItem>
                <MenuItem value={'price_asc'}>По возрастанию цены</MenuItem>
                <MenuItem value={'price_desc'}>По убыванию цены</MenuItem>
              </Select>
            </FormControl>

            <div className="relative flex items-center gap-[4px] max-w-[195px] md:ml-[20px] border-[1px] border-[#767676] py-[8px] px-[15px] rounded-full">
              <span className="text-[#646464] text-[16px] font-normal">От</span>
              <input
                onBlur={(e) => {
                  setMinPrice(Number(e.target.value) >= 1 ? Number(e.target.value) : 0)
                }}
                placeholder="2500"
                ref={minPriceInput}
                // value={minPrice}
                type="number" className="border-none font-normal rounded-full max-w-[80px] bg-[#ECECEC] py-[5px] px-[10px]" />

              {minPrice !== 0 && <div onClick={() => {
                setMinPrice(0)
              }} className="absolute flex justify-center items-center w-[20px] h-[20px] top-0 right-0 rounded-full bg-black hover:cursor-pointer">
                <Image src={ex} alt="" className="brightness-200 w-[10px]" />
              </div>}
            </div>

            <div className="relative flex items-center gap-[4px] max-w-[195px] md:ml-[10px] border-[1px] border-[#767676] py-[8px] px-[15px] rounded-full">
              <span className="text-[#646464] text-[16px] font-normal">До</span>
              <input
                onBlur={(e) => {
                  setMaxPrice(Number(e.target.value) >= 1 ? Number(e.target.value) : 0)
                }}
                placeholder="2500"
                ref={maxPriceInput}
                // value={maxPrice}
                type="number" className="border-none font-normal rounded-full max-w-[80px] bg-[#ECECEC] py-[5px] px-[10px]" />

              {maxPrice !== 0 && <div onClick={() => { setMaxPrice(0) }} className="absolute flex justify-center items-center w-[20px] h-[20px] top-0 right-0 rounded-full bg-black hover:cursor-pointer">
                <Image src={ex} alt="" className="brightness-200 w-[10px]" />
              </div>}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {products?.results?.map((item) => (
            <ProductCard data={{...item}} getData={fetchData}/>
          ))}
        </div>

        <div className="mt-[50px] mx-auto">
          <ReactPaginate
            breakLabel="..."
            nextLabel="След. >"
            onPageChange={(e) => {
              setCurrentPage(e.selected + 1)
              console.log(e.selected + 1);
            }}
            pageRangeDisplayed={2}
            pageCount={products?.total_pages ? products?.total_pages : 0}
            previousLabel="< Пред."
            renderOnZeroPageCount={() => <div></div>}
            forcePage={currentPage - 1}
          />

        </div>
      </main>
      <Footer />
    </div>
  );
}
