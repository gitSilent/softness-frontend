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
import { ICart, IProduct, IProductsResponse } from "@/api/models";
import { getCart, getProducts } from "@/api/requests";

export default function ProductsPageComponent() {
  const [products, setProducts] = useState<IProductsResponse>()
  const [maxPrice, setMaxPrice] = useState<number>(0)
  const [minPrice, setMinPrice] = useState<number>(0)
  const [sortingValue, setSortingValue] = useState<string>("")
  const [searchInput, setSearchInput] = useState<string>("")
  const [currentPage, setCurrentPage] = useState<number>(1)

  const [cart, setCart] = useState<ICart>()

  const maxPriceInput = useRef<any>(null)
  const minPriceInput = useRef<any>(null)

  const fetchData = (value?: string) => {
    getProducts({ page: currentPage, min_price: minPrice, max_price: maxPrice, product_name: value !== undefined ? value : searchInput.trim(), sorting_value: sortingValue.trim() })
      .then((res) => {
        setProducts(res.data)
      })
  }

  const fetchCartData = () => {
    getCart()
      .then((res) => {
        setCart(res.data)
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
    // fetchCartData()
  }, [currentPage, minPrice, maxPrice, sortingValue])

  return (
    <div className="relative min-h-full">
      <Header cartData={cart} />
      <main className="flex flex-col m-auto pb-[280px] pt-[90px] px-[20px] max-w-[1400px]">
        <h2 className="m-auto w-fit text-[25px] uppercase font-semibold mb-[50px] sl:text-[35px]">
          Каталог
        </h2>

        <div className="mb-[30px] flex flex-col md:flex-row gap-[10px] w-full justify-between">
          <form onSubmit={(e) => {
            e.preventDefault()
            fetchData()
          }} className="flex gap-[5px] w-full">
            <div className="relative w-full h-full">
              <input
                type="text"
                placeholder="Поиск по товарам"
                className="border-[#565656] max-w-[830px] w-full h-full py-[12px] px-[15px] pr-[40px] border-[1px] rounded-tl-[100px] rounded-bl-[100px] rounded-tr-[30px] rounded-br-[30px]"
                value={searchInput}
                onChange={(e) => { setSearchInput(e.target.value) }}
              />
              {searchInput.length !== 0 &&
                <div onClick={() => {
                  setSearchInput("")
                  fetchData("")
                }} className="absolute w-[12px] right-[15px] top-[16px] md:top-[21px] hover:cursor-pointer">
                  <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M21 21L11 11M11 11L1 1M11 11L21 1M11 11L1 21" stroke="#464646" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                  </svg>

                </div>}
            </div>
            <button type="submit" className="py-[12px] px-[15px] border-[1px] border-black bg-black text-white rounded-tr-[100px] rounded-br-[100px] rounded-tl-[30px] rounded-bl-[30px]">
              Найти
            </button>
          </form>
          <div className="flex flex-col gap-[5px] sm:flex-row">
            <FormControl>
              {sortingValue && <div onClick={() => { setSortingValue("") }} className="z-[5] absolute flex justify-center items-center w-[20px] h-[20px] top-0 right-0 rounded-full bg-black hover:cursor-pointer">
                <Image src={ex} alt="" className="brightness-200 w-[10px]" />
              </div>}
              <InputLabel id="demo-simple-select-label">Сортировать по</InputLabel>
              <Select
                style={{ borderRadius: '100px', border: '1px', borderColor: '#767676', minWidth: '170px' }}
                labelId="demo-simple-select-label"
                id="default-select"
                label="Сортировать по"
                value={sortingValue}
                onChange={(e) => {
                  console.log(e.target.value);
                  setSortingValue(e.target.value)
                }}
              >
                <MenuItem value={'asc'}>По возрастанию цены</MenuItem>
                <MenuItem value={'desc'}>По убыванию цены</MenuItem>
              </Select>
            </FormControl>

            <div className="relative flex items-center gap-[4px] max-w-[195px] md:ml-[20px] border-[1px] border-[#767676] py-[8px] px-[15px] rounded-full">
              <span className="text-[#646464] text-[16px] font-normal">От</span>
              <input
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    const target = e.target as HTMLInputElement;
                    target.blur();
                  }
                }}
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
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    const target = e.target as HTMLInputElement;
                    target.blur();
                  }
                }}
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

        <div className="flex flex-col items-center sm:grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {products?.results?.map((item) => (
            <ProductCard key={item.id} data={{ ...item }} getData={fetchData} getCartData={fetchCartData} />
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
