import {
  clearAllFilters,
  selectOrder,
  selectSearchTerm,
  selectSelectedCategory,
  selectSortBy,
  setCategories,
  setProducts,
  setProductsLoading,
} from "@/slices/productSlice";
import { TOrder, TSortBy } from "@/types/types";
import axios from "axios";
import * as React from "react";
import { useDispatch, useSelector } from "react-redux";

interface IuseGetDataProps {}

export function useGetData() {
  const dispatch = useDispatch();
  const searchTerm = useSelector(selectSearchTerm);
  const [limit, setLimit] = React.useState(10);
  const order = useSelector(selectOrder);
  const sortBy = useSelector(selectSortBy);
  const category = useSelector(selectSelectedCategory);
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
  const getProducts = () => {
    const url = `https://dummyjson.com/products${
      category && searchTerm.length == 0 ? `/category/${category}` : ""
    }?limit=${limit}${
      sortBy && searchTerm.length == 0 ? `&sortBy=${sortBy}` : ""
    }${order && searchTerm.length == 0 ? `&order=${order}` : ""}`;

    console.log(url, "url");

    dispatch(setProductsLoading(true));

    axios
      .get(url)
      .then((res) => {
        console.log(res.data);
        dispatch(setProducts(res.data.products));
        dispatch(setProductsLoading(false));
      })
      .catch((err) => {
        console.log(err);
        dispatch(setProductsLoading(false));
      });
  };
  const searchProducts = () => {
    const url = `https://dummyjson.com/products${
      searchTerm.length > 0 ? `/search?q=${searchTerm}` : ""
    }`;

    console.log(url, "url");

    dispatch(setProductsLoading(true));

    axios
      .get(url)
      .then((res) => {
        console.log(res.data);
        dispatch(setProducts(res.data.products));
        dispatch(setProductsLoading(false));
      })
      .catch((err) => {
        console.log(err);
        dispatch(setProductsLoading(false));
      });
  };
  React.useEffect(() => {
    getProducts();
  }, [limit]);

  React.useEffect(() => {
    if (searchTerm.length > 0) {
      dispatch(clearAllFilters());
    }
    searchProducts();
  }, [searchTerm]);
  const viewmore = () => limit < 200 && setLimit(limit + 10);

  return { getAllCategories, getProducts, viewmore };
}
