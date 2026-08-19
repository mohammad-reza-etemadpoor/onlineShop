"use client";

import SearchInput from "./SearchInput";
import FilterSelect from "./FilterSelect";
import { useAdminProductContext } from "@/src/context/AdminProductContext";

export default function ProductsFilters() {
  const {
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
    setPage,
  } = useAdminProductContext();

  return (
    <section className="mt-8 rounded-md border border-zinc-200 bg-white text-zinc-600 p-6 shadow-sm">
      <div className="flex justify-between items-start gap-4">
        <SearchInput
          placeholder="Search by product name"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(1);
          }}
        />

        <FilterSelect
          label="Category"
          value={category}
          onChange={(e) => {
            setCategory(e.target.value);
            setPage(1);
          }}
          options={[
            {
              label: "All Categories",
              value: "all",
            },
            {
              label: "Girls",
              value: "Girls",
            },
            {
              label: "Boys",
              value: "Boys",
            },
            {
              label: "Newborn",
              value: "Newborn",
            },
            {
              label: "Maternity",
              value: "Maternity",
            },
          ]}
        />

        <FilterSelect
          label="Status"
          value={status}
          onChange={(e) => {
            setStatus(e.target.value);
            setPage(1);
          }}
          options={[
            {
              label: "All Status",
              value: "all",
            },
            {
              label: "Active",
              value: "active",
            },
            {
              label: "Inactive",
              value: "inactive",
            },
          ]}
        />

        {/* <FilterSelect
          label="Featured"
          value={featured}
          onChange={(e) =>
            setFeatured(e.target.value)
          }
          options={[
            {
              label: "All",
              value: "all",
            },
            {
              label: "Featured",
              value: "featured",
            },
            {
              label: "Not Featured",
              value: "not-featured",
            },
          ]}
        /> */}

        <FilterSelect
          label="Sort by"
          value={sort}
          onChange={(e) => {
            setSort(e.target.value);
            setPage(1);
          }}
          options={[
            {
              label: "Newest First",
              value: "newest",
            },
            {
              label: "Oldest First",
              value: "oldest",
            },
            {
              label:
                "Price: Low to High",
              value: "low",
            },
            {
              label:
                "Price: High to Low",
              value: "high",
            },
          ]}
        />
      </div>
    </section>
  );
}
