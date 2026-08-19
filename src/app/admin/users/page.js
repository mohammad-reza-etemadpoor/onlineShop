import ProductsFilters from "@src/components/admin/products/ProductsFilters";
import ProductsHeader from "@components/admin/products/ProductsHeader";
import {
  LuBox,
  LuDollarSign,
  LuShoppingCart,
  LuUndo2,
  LuUsers,
} from "react-icons/lu";

const statistics = [
  {
    title: "Revenue",
    value: "$24,520",
    change: "+12.4%",
    positive: true,
    icon: LuDollarSign,
  },
  {
    title: "Orders",
    value: "1,248",
    change: "+8.2%",
    positive: true,
    icon: LuShoppingCart,
  },
  {
    title: "Customers",
    value: "845",
    change: "+3.1%",
    positive: true,
    icon: LuUsers,
  },
  {
    title: "Products",
    value: "182",
    change: "+5",
    positive: true,
    icon: LuBox,
  },
  {
    title: "Returns",
    value: "12",
    change: "-1.3%",
    positive: false,
    icon: LuUndo2,
  },
];

function page() {
  return (
    <main className="h-screen overflow-scroll flex-1 bg-[#f6f9fd] text-zinc-600 p-8">
      <ProductsHeader />
      <div className="mr-2 grid grid-cols-5 gap-4">
        {statistics.map((item) => (
          <StatCard
            key={item.title}
            {...item}
          />
        ))}
      </div>
      <ProductsFilters />
      //Todo UsersTable
    </main>
  );
}

export default page;
export function StatCard({
  title,
  value,
  change,
  icon: Icon,
  positive = true,
}) {
  return (
    <div className="rounded-md bg-white p-6 shadow-sm border border-gray-100">
      <div className="flex justify-between items-center">
        <div
          className="mb-0 flex h-12 w-12 items-center justify-center rounded-full
         bg-indigo-50 text-2xl text-indigo-600"
        >
          <Icon />
        </div>
        <div>
          <p className="text-sm text-gray-500">
            {title}
          </p>

          <h2 className="mt-1 text-xl font-bold text-gray-900">
            {value}
          </h2>
        </div>
      </div>

      <p
        className={`mt-3  text-sm ${
          positive
            ? "text-emerald-600"
            : "text-red-500"
        }`}
      >
        {change}
      </p>
    </div>
  );
}
