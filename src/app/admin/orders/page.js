import CustomerInfo from "@src/components/admin/orders/CustomerInformation";
import OrderDetails from "@src/components/admin/orders/OrderDetails";
import OrderHeader from "@src/components/admin/orders/OrderHeader";
import OrdersFilters from "@src/components/admin/orders/OrdersFilter";
import OrderStatusSection from "@src/components/admin/orders/OrderStatusSection";
import OrdersTable from "@src/components/admin/orders/OrderTable";
import ShippingAddress from "@src/components/admin/orders/ShippingAddress";
import ProductsHeader from "@src/components/admin/products/ProductsHeader";

export const selectedOrder = {
  id: "#ORD-1048",

  status: "Processing",

  date: "Jun 20, 2025 • 10:24 AM",

  total: 120.5,

  customer: {
    name: "Sarah Johnson",
    phone: "+1 (555) 123-4567",
    email: "sarah@example.com",
    address:
      "742 Evergreen Terrace, Springfield",
  },
};

const products = [
  {
    id: 1,
    image:
      "/images/products/bunny-romper.jpg",
    title: "Cute Bunny Romper",
    category: "Girls",

    color: {
      name: "Pink",
      hex: "#F9A8D4",
    },

    size: "0-3M",

    quantity: 2,

    price: 35,
  },

  {
    id: 2,
    image:
      "/images/products/bear-set.jpg",
    title: "Bear Cotton Set",
    category: "Newborn",

    color: {
      name: "Beige",
      hex: "#D6C5A4",
    },

    size: "NB",

    quantity: 1,

    price: 50,
  },
];

function AdminOrdersPage() {
  return (
    <main className="h-screen overflow-scroll flex-1 bg-[#f6f9fd] text-zinc-600 p-8">
      <ProductsHeader />
      <OrdersFilters />
      <div className="flex justify-between items-start mt-4">
        <OrdersTable />
        <OrderDetails
          products={selectedOrder}
        />
        <>
          {/* <section className="rounded-md border border-zinc-200 bg-white shadow-sm">
            <OrderHeader />
            <CustomerInfo />
            <ShippingAddress />
            <OrderedProductsTable />
            <OrderStatusSection />
            <div className="mt-5 flex justify-end gap-3">
              ...
            </div>
          </section> */}
        </>
      </div>
    </main>
  );
}

export default AdminOrdersPage;
