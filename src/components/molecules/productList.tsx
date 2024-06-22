import { useCapitalizeFirstLetter } from "@/hooks/useCapitalizeFirstLetter";
import {
  selectOrder,
  selectProductLoading,
  selectProducts,
  selectSearchTerm,
  selectSelectedCategory,
  selectSortBy,
  setOrder,
  setSearchTerm,
  setSelectedCategory,
  setSortBy,
} from "@/slices/productSlice";
import { IProduct } from "@/types/types";
import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Product } from "../atoms/product";
import { AnimatePresence, animate, motion } from "framer-motion";
import { Input } from "../shadcn/input";
import { CiSearch } from "react-icons/ci";
import { LuSearch } from "react-icons/lu";
import { IoIosClose, IoMdPricetags } from "react-icons/io";
import { useGetData } from "@/hooks/useGetData";
import { FaSortAlphaUp } from "react-icons/fa";
import { BiSolidCategory } from "react-icons/bi";
import { Skeleton } from "../shadcn/skeleton";
import { Button } from "../shadcn/button";

export interface IProductListProps {}

export function ProductList(props: IProductListProps) {
  const products = useSelector(selectProducts);
  const loading = useSelector(selectProductLoading);

  const selectedCategory = useSelector(selectSelectedCategory);
  const categoryName = useCapitalizeFirstLetter(
    selectedCategory ? selectedCategory : ""
  );
  const dispatch = useDispatch();
  // const [searchTerm, setSearchTerm] = React.useState("");
  const searchTerm = useSelector(selectSearchTerm);
  const { getAllCategories, getProducts, viewmore } = useGetData();
  const order = useSelector(selectOrder);
  const sortBy = useSelector(selectSortBy);
  const category = useSelector(selectSelectedCategory);

  React.useEffect(() => {
    getAllCategories();
  }, []);
  return (
    <div className="mt-6">
      <div className="sm:flex justify-between !my-6 items-center ">
        {selectedCategory && (
          <h1 className="text-xl font-semibold">
            {categoryName} ({products?.length})
          </h1>
        )}
        {!selectedCategory && (
          <h1 className="text-xl font-semibold ">All Products (100+)</h1>
        )}
        <div className="relative my-4  ">
          <Input
            value={searchTerm}
            onChange={(e) => dispatch(setSearchTerm(e.target.value))}
            placeholder="Search for a product"
            className="!border-gray-300 h-10  w-full sm:w-80  "
          />
          <LuSearch
            size={"1.2rem"}
            className="absolute top-[10px] right-4 text-gray-400"
          />
        </div>
      </div>
      <div className="flex gap-2 mt-4 flex-wrap ">
        {sortBy && (
          <div
            onClick={() => {
              getProducts();
              dispatch(setSortBy(undefined));
            }}
            className="border py-1 px-2 rounded-full flex gap-2 truncate items-center cursor-pointer"
          >
            <IoMdPricetags />
            <p>{sortBy.charAt(0).toUpperCase() + sortBy.slice(1)}</p>
            <IoIosClose size={"1.5rem"} />
          </div>
        )}
        {order && (
          <div
            onClick={() => {
              getProducts();
              dispatch(setOrder(undefined));
            }}
            className="border py-1 px-2 rounded-full flex gap-2 truncate items-center cursor-pointer"
          >
            <FaSortAlphaUp />
            <p>{order.charAt(0).toUpperCase() + order.slice(1)}</p>
            <IoIosClose size={"1.5rem"} />
          </div>
        )}
        {category && (
          <div
            onClick={() => {
              getProducts();
              dispatch(setSelectedCategory(undefined));
            }}
            className="border py-1 px-2 rounded-full flex gap-2 truncate items-center cursor-pointer"
          >
            <BiSolidCategory />
            <p>{category.charAt(0).toUpperCase() + category.slice(1)}</p>
            <IoIosClose size={"1.5rem"} />
          </div>
        )}
      </div>
      {products.length == 0 && !loading && (
        <div className="h-40 flex items-center justify-center ">
          <p className="text-gray-500 ">No Product found</p>
        </div>
      )}
      {/* <AnimatePresence> */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{
          opacity: 1,
          transition: { staggerChildren: 0.5, ease: "easeInOut", delay: 0.7 },
        }}
        exit={{ opacity: 0 }}
        // variants={containerVariants2}
        // initial="hidden"
        // animate="visible"
        // exit="hidden"
        className="mt-4 grid grid-cols-2 xs:grid-cols-3 sm:grid-cols-4 lg:grid-cols-5  gap-x-4 gap-y-6"
      >
        {products.length > 0 &&
          products.map((product: IProduct, i: number) => {
            return <Product key={product.title} product={product} />;
          })}
        {loading &&
          [0, 0, 0, 0, 0, 0].map((item: number, i: number) => {
            return (
              <div className="grid gap-2" key={i}>
                <Skeleton className="w-full aspect-[9/16] rounded-none" />
                <Skeleton className="w-full h-8 rounded-none" />
                <Skeleton className="w-full h-4 rounded-none" />
              </div>
            );
          })}
      </motion.div>
      {!loading && products.length > 0 && (
        <div className="flex justify-center my-8">
          <Button
            onClick={() => viewmore()}
            className="mx-auto border my-4 !text-gray-500 hover:scale-[1.05] transition-all"
          >
            View more
          </Button>
        </div>
      )}
      {/* </AnimatePresence> */}
    </div>
  );
}
