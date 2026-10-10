"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { getProducts } from "../actions/adminProductAction";

export const AdminProductContext =
  createContext();

export function AdminProductProvider({
  children,
}) {
  const [loading, setLoading] =
    useState(false);
  const [search, setSearch] =
    useState("");
  const [products, setProducts] =
    useState({
      products: [],
      totalCount: 0,
      page: 1,
      pageSize: 10,
      totalPages: 0,
    });
  const [category, setCategory] =
    useState("all");
  const [status, setStatus] =
    useState("all");
  const [featured, setFeatured] =
    useState("all");
  const [sort, setSort] =
    useState("newest");
  const [
    totalProducts,
    setTotalProducts,
  ] = useState();
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] =
    useState(10);

  useEffect(() => {
    async function fetchProducts() {
      setLoading(true);

      const data = await getProducts({
        search,
        category,
        status,
        sort,
        page,
        pageSize,
      });

      // console.log(
      //   "context is : \n",
      //   data,
      // );

      setProducts(data);

      setLoading(false);
    }
    fetchProducts();
  }, [
    search,

    category,

    status,

    sort,

    page,
  ]);

  return (
    <AdminProductContext.Provider
      value={{
        products,
        setProducts,
        loading,
        setLoading,
        search,
        setSearch,
        category,
        setCategory,
        status,
        setStatus,
        featured,
        setFeatured,
        sort,
        setSort,
        totalProducts,
        setTotalProducts,
        page,
        setPage,
        pageSize,
        setPageSize,
      }}
    >
      {children}
    </AdminProductContext.Provider>
  );
}

export function useAdminProductContext() {
  const context = useContext(
    AdminProductContext,
  );
  if (!context)
    throw new Error(
      "AdminProductContext is used out the context provider!",
    );
  return context;
}
