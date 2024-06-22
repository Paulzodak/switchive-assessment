import { IRootState } from "@/store/store";
import { IProduct, TOrder, TSortBy } from "@/types/types";
import { createSlice } from "@reduxjs/toolkit";

export interface IProductState {
  products: IProduct[];
  categories: string[];
  selectedCategory: string | undefined;
  order: TOrder | undefined;
  sortBy: TSortBy | undefined;
  productsLoading: boolean;
  searchTerm: string;
}

const initialState: IProductState = {
  products: [],
  categories: [],
  selectedCategory: undefined,
  order: undefined,
  sortBy: undefined,
  productsLoading: false,
  searchTerm: "",
};

const productSlice: any = createSlice({
  name: "product",
  initialState,
  reducers: {
    setProducts: (state: IProductState, action) => {
      state.products = action.payload;
    },
    setProductsLoading: (state: IProductState, action) => {
      state.productsLoading = action.payload;
    },
    setCategories: (state: IProductState, action) => {
      state.categories = action.payload;
    },
    setOrder: (state: IProductState, action) => {
      state.order = action.payload;
    },

    setSortBy: (state: IProductState, action) => {
      state.sortBy = action.payload;
    },
    setSearchTerm: (state: IProductState, action) => {
      state.searchTerm = action.payload;
    },
    setSelectedCategory: (state: IProductState, action) => {
      state.selectedCategory = action.payload;
    },
    clearAllFilters: (state: IProductState, action) => {
      state.selectedCategory = undefined;
      state.sortBy = undefined;
      state.order = undefined;
    },
  },
});

export const {
  setProducts,
  setCategories,
  setOrder,
  setSortBy,
  setSelectedCategory,
  clearAllFilters,
  setProductsLoading,
  setSearchTerm,
} = productSlice.actions;
export const selectProducts = (state: IRootState) => state.product.products;
export const selectSearchTerm = (state: IRootState) => state.product.searchTerm;
export const selectCategories = (state: IRootState) => state.product.categories;
export const selectSelectedCategory = (state: IRootState) =>
  state.product.selectedCategory;
export const selectOrder = (state: IRootState) => state.product.order;
export const selectProductLoading = (state: IRootState) =>
  state.product.productsLoading;
export const selectSortBy = (state: IRootState) => state.product.sortBy;

export default productSlice.reducer;
