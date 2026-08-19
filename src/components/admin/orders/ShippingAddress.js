export const order = {
  id: "#ORD-1041",
  customer: "Jessica Brown",
  items: 2,
  total: 98,
  payment: "Pending",
  status: "Confirming",
  date: "Jun 15, 2025",
  address: {
    street: "kashani st",
    city: "hmd",
    country: "ir",
  },
};

function ShippingAddress() {
  return (
    <div>
      <h3 className="mb-2 font-medium">
        Shipping Address
      </h3>

      <div className="rounded-md border border-zinc-200 bg-zinc-50 p-4">
        <p>{order.address.street}</p>

        <p>{order.address.city}</p>

        <p>{order.address.country}</p>
      </div>
    </div>
  );
}

export default ShippingAddress;
