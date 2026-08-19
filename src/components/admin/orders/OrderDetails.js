import OrderHeader from "./OrderHeader";
import CustomerInformation from "./CustomerInformation";
import OrderedProductsTable from "./OrderedProductsTable";
import OrderStatusSection from "./OrderStatusSection";

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

export default function OrderDetails({
  order,
}) {
  console.log(
    "orderDetails: order: : ",
    order,
  );
  return (
    <section className="rounded-md border border-zinc-200 bg-white shadow-sm">
      <OrderHeader order={order} />
      <div className="space-y-8 p-6">
        <CustomerInformation
          order={order}
        />
      </div>
      <OrderedProductsTable
        order={order}
      />
      <OrderStatusSection
        order={order}
      />
    </section>
  );
}
