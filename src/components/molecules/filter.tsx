import {
  selectCategories,
  selectOrder,
  selectProducts,
  selectSelectedCategory,
  selectSortBy,
  setOrder,
  setSelectedCategory,
  setSortBy,
} from "@/slices/productSlice";
import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Checkbox } from "../shadcn/checkbox";
import { CiSearch } from "react-icons/ci";
import { Input } from "../shadcn/input";
import { IoIosClose } from "react-icons/io";
import { useGetData } from "@/hooks/useGetData";
import { Button } from "../shadcn/button";
import { setShowFilter } from "@/slices/navSlice";
interface IFilterProps {}

export function Filter(props: IFilterProps) {
  const dispatch = useDispatch();
  const { getAllCategories, getProducts } = useGetData();
  const selectedCategory = useSelector(selectSelectedCategory);
  const order = useSelector(selectOrder);
  const sortBy = useSelector(selectSortBy);
  const categories = useSelector(selectCategories);
  const products = useSelector(selectProducts);
  console.log(categories);
  const [categoryViewLength, setCategoryViewLength] = React.useState(10);
  const [showSearch, setShowSearch] = React.useState(false);
  const [searchTerm, setSearchTerm] = React.useState<string>("");

  const filteredCategories = showSearch
    ? categories.filter((category: string) => category.includes(searchTerm))
    : categories;

  React.useEffect(() => {
    getProducts(sortBy, order, selectedCategory);
  }, [sortBy, order, selectedCategory]);
  const submit = () => {
    getProducts(sortBy, order, selectedCategory);
    dispatch(setShowFilter(false))
  };
  return (
    <div className="p-4 font-lato">
      <div className="mt-8">
        <div className="flex items-center justify-between">
          <h1 className="font-semibold">CATEGORY</h1>
          <CiSearch
            onClick={() => setShowSearch(!showSearch)}
            size={"1.2rem"}
          />
        </div>
        <hr className="mb-4 mt-2 " />

        {showSearch && (
          <div className="relative  my-4">
            <Input
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search categories..."
              className="!border-gray-300 h-10  "
            />
            <div
              onClick={() => setShowSearch(false)}
              className="absolute top-[5px] right-2 bg-blue-950/20 rounded-lg p-[3px] cursor-pointer"
            >
              <IoIosClose size={"1.5rem"} />
            </div>
          </div>
        )}
        <div className="mt-2 flex flex-wrap gap-2">
          {filteredCategories.map((category: string, i: number) => {
            if (category == selectedCategory)
              return (
                <div
                  onClick={() => dispatch(setSelectedCategory(category))}
                  key={i}
                  className={`flex gap-2 text-[14px] items-center border rounded-full py-1 px-2 cursor-pointer ${
                    category == selectedCategory
                      ? "border-blue-950 "
                      : " text-gray-500"
                  }`}
                >
                  <Checkbox
                    checkColor="black"
                    checked={category == selectedCategory ? true : false}
                    className={`${
                      category == selectedCategory && "!border-black"
                    } `}
                  />
                  <p className="truncate">{category}</p>
                </div>
              );
            if (i < categoryViewLength && filteredCategories.length > 0)
              return (
                <div
                  onClick={() => dispatch(setSelectedCategory(category))}
                  key={i}
                  className={`flex gap-2 text-[14px] items-center border rounded-full py-1 px-2 cursor-pointer ${
                    category == selectedCategory
                      ? "border-blue-950 "
                      : " text-gray-500"
                  }`}
                >
                  <Checkbox
                    checkColor="black"
                    checked={category == selectedCategory ? true : false}
                    className={`${
                      category == selectedCategory && "!border-black"
                    } `}
                  />
                  <p className="truncate">{category}</p>
                </div>
              );
          })}
        </div>
        {filteredCategories.length == 0 && (
          <p className="text-[14px] mt-4 text-gray-400 text-center">
            No item matches your search term. Try a different word
          </p>
        )}
        {categoryViewLength != categories.length && (
          <p
            onClick={() => setCategoryViewLength(categories.length)}
            className="text-gray-400 text-xs mt-4 cursor-pointer"
          >
            See all
          </p>
        )}
        {categoryViewLength == categories.length && (
          <p
            onClick={() => setCategoryViewLength(10)}
            className="text-gray-400 text-xs mt-4 cursor-pointer"
          >
            See less
          </p>
        )}
      </div>
      <div className="mt-8">
        <h1 className="font-semibold">SORT BY</h1>
        <hr className="mb-4 mt-2 " />
        <div className="flex gap-2 mt-2 flex-wrap">
          <div
            onClick={() => dispatch(setSortBy("title"))}
            className={`flex gap-2 text-[14px] items-center border rounded-full py-1 px-2 cursor-pointer ${
              sortBy == "title" ? "border-blue-950 " : " text-gray-500"
            }`}
          >
            <Checkbox
              checkColor="black"
              checked={sortBy == "title" ? true : false}
              className={`${sortBy == "title" && "!border-black"} `}
            />
            <p className="truncate">Title</p>
          </div>
          <div
            onClick={() => dispatch(setSortBy("price"))}
            className={`flex gap-2 text-[14px] items-center border rounded-full py-1 px-2 cursor-pointer ${
              sortBy == "price" ? "border-blue-950 " : " text-gray-500"
            }`}
          >
            <Checkbox
              checkColor="black"
              checked={sortBy == "price" ? true : false}
              className={`${sortBy == "price" && "!border-black"} `}
            />
            <p className="truncate">Price</p>
          </div>
          <div
            onClick={() => dispatch(setSortBy("rating"))}
            className={`flex gap-2 text-[14px] items-center border rounded-full py-1 px-2 cursor-pointer ${
              sortBy == "rating" ? "border-blue-950 " : " text-gray-500"
            }`}
          >
            <Checkbox
              checkColor="black"
              checked={sortBy == "rating" ? true : false}
              className={`${sortBy == "rating" && "!border-black"} `}
            />
            <p className="truncate">Rating</p>
          </div>
        </div>
      </div>
      <div className="mt-8">
        <h1 className="font-semibold">ORDER</h1>
        <hr className="mb-4 mt-2 " />
        <div className="grid grid-cols-2 gap-2 mt-2 ">
          <div
            onClick={() => dispatch(setOrder("asc"))}
            className={`flex gap-2 text-[14px] items-center border rounded-full py-1 px-2 cursor-pointer ${
              order == "asc" ? "border-blue-950" : "text-gray-500"
            }`}
          >
            <Checkbox
              checkColor="black"
              checked={order == "asc" ? true : false}
              className={`${order == "asc" && "!border-black"} `}
            />
            <p className="truncate">Ascending Order</p>
          </div>
          <div
            onClick={() => dispatch(setOrder("desc"))}
            className={`flex gap-2 text-[14px] items-center border rounded-full py-1 px-2 cursor-pointer ${
              order == "desc" ? "border-blue-950" : "text-gray-500"
            }`}
          >
            <Checkbox
              checkColor="black"
              checked={order == "desc" ? true : false}
              className={`${order == "desc" && "!border-black"} `}
            />
            <p className="truncate">Descending Order</p>
          </div>
        </div>
      </div>
      <Button
        className="mt-8 !py-5 bg-transparent w-full !text-blue-950 !border-blue-950 border rounded-[40px] text-wdhite hover:scale:[1.05] transition-all"
        onClick={submit}
      >
        Show {products.length} {products.length > 1 ? "Results" : "Result"}
      </Button>
    </div>
  );
}
