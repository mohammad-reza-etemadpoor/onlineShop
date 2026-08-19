import InfoField from "@components/InfoField";

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

export default function CustomerInformation({
  order = selectedOrder,
}) {
  return (
    <section>
      <h3 className="mb-5 text-lg font-semibold text-zinc-900">
        Customer Information
      </h3>

      <div className="grid grid-cols-2 gap-5">
        <InfoField
          label="Full Name"
          value={order.customer.name}
        />

        <InfoField
          label="Phone Number"
          value={order.customer.phone}
        />

        <InfoField
          label="Email Address"
          value={order.customer.email}
        />

        <InfoField
          label="Shipping Address"
          value={order.customer.address}
        />
      </div>
    </section>
  );
}
