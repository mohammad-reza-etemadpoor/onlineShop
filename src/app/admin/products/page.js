import { getProducts } from "@/src/actions/adminProductAction";
import AddProductModal from "@/src/components/admin/products/AddProductModal";
import { AddProductProvider } from "@/src/context/AddProductContext";
import { AdminProductProvider } from "@/src/context/AdminProductContext";
import ProductsHeader from "@components/admin/products/ProductsHeader";
import ProductsFilters from "@src/components/admin/products/ProductsFilters";
import ProductsTable from "@src/components/admin/products/ProductTable";

function ProductsPage() {
  return (
    <main className="relative h-screen overflow-scroll flex-1 bg-[#f6f9fd] text-zinc-600 p-8">
      <AddProductProvider>
        <AdminProductProvider>
          <ProductsHeader />
          <ProductsFilters />
          {/* <div className="absolute right-0 top-0">
          </div> */}
          <AddProductModal />
          <ProductsTable />
        </AdminProductProvider>
      </AddProductProvider>
    </main>
  );
}

export default ProductsPage;
