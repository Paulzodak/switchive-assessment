import {
  setCategories,
  setProducts,
  setProductsLoading,
} from "@/slices/productSlice";
import { TOrder, TSortBy } from "@/types/types";
import axios from "axios";
import * as React from "react";
import { useDispatch } from "react-redux";

interface IuseGetDataProps {}

export function useGetData() {
  const dispatch = useDispatch();
  //   const [categories, setCategories] = React.useState<string[] | undefined>();
  const getAllCategories = () => {
    axios
      .get(`https://dummyjson.com/products/category-list`)
      .then((res) => {
        dispatch(setCategories(res.data));
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const getProducts = (
    sortBy?: TSortBy,
    order?: TOrder,
    category?: string | undefined
  ) => {
    axios
      .get(
        `https://dummyjson.com/products/${
          category ? `category/${category}` : "category/smartphones"
        }${sortBy ? `?sortBy=${sortBy}` : ""}${order ? `&&order=${order}` : ""}`
      )
      .then((res) => {
        console.log(res.data);
        dispatch(setProducts(res.data.products));
        dispatch(setProductsLoading(true));
      })
      .catch((err) => {
        console.log(err);
        dispatch(setProductsLoading(true));
      });
  };

  return { getAllCategories, getProducts };
}
