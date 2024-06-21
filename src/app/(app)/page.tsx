"use client";
import Image from "next/image";
import { IoFilterCircleSharp } from "react-icons/io5";
import { FaShoppingBag } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { setShowFilter } from "@/slices/navSlice";
import { useGetData } from "@/hooks/useGetData";
import * as React from "react";
import {
  clearAllFilters,
  selectCategories,
  selectOrder,
  selectSelectedCategory,
  selectSortBy,
  setOrder,
  setSelectedCategory,
  setSortBy,
} from "@/slices/productSlice";
import { IoIosClose } from "react-icons/io";
import { ProductList } from "@/components/molecules/productList";
import { Filter } from "@/components/molecules/filter";
export default function Home() {
  const dispatch = useDispatch();
  const { getAllCategories, getProducts } = useGetData();
  const order = useSelector(selectOrder);
  const sortBy = useSelector(selectSortBy);
  const category = useSelector(selectSelectedCategory);

  React.useEffect(() => {
    getAllCategories();
  }, []);
  return (
    <div className="font-lato p-4">
      <div className="text-center sm:text-left mt-4">
        <div className="flex gap-2 justify-center sm:justify-start">
          <h1 className="text-xl font-semibold md:text-2xl ">SHOP WITH US</h1>
          <FaShoppingBag
            className="my-auto md:w-[1.5rem] md:h-[1.5rem]"
            size={"1.2rem"}
          />
        </div>
        <p className="text-gray-400  text-xs mt-2">
          Browse From 200+ Latest Items
        </p>
      </div>
      <div className="md:grid-cols-[30%_65%] lg:grid-cols-[20%_75%]  justify-between grid">
        <div className="hidden md:block">
          <Filter />
        </div>
        <div>
          <div className="mt-6 flex justify-between md:hidden">
            <div
              onClick={() => dispatch(setShowFilter(true))}
              className="flex gap-2 cursor-pointer"
            >
              <p>Filters</p>
              <IoFilterCircleSharp size={"1.3rem"} className="my-auto" />
            </div>
            <p
              onClick={() => {
                dispatch(clearAllFilters());
                getProducts();
              }}
              className="text-slate-400 text-[11px] underline my-auto cursor-pointer"
            >
              Clear all
            </p>
          </div>
          <div className="flex gap-2 mt-4 flex-wrap ">
            {sortBy && (
              <div
                onClick={() => {
                  getProducts();
                  dispatch(setSortBy(undefined));
                }}
                className="border py-1 px-2 rounded-full flex gap-2 truncate"
              >
                <p>{sortBy}</p>
                <IoIosClose size={"1.5rem"} />
              </div>
            )}
            {order && (
              <div
                onClick={() => {
                  getProducts();
                  dispatch(setOrder(undefined));
                }}
                className="border py-1 px-2 rounded-full flex gap-2 truncate"
              >
                <p>{order}</p>
                <IoIosClose size={"1.5rem"} />
              </div>
            )}
            {category && (
              <div
                onClick={() => {
                  getProducts();
                  dispatch(setSelectedCategory(undefined));
                }}
                className="border py-1 px-2 rounded-full flex gap-2 truncate"
              >
                <p>{category}</p>
                <IoIosClose size={"1.5rem"} />
              </div>
            )}
          </div>

          <ProductList />
        </div>
      </div>
    </div>
  );
}
