import OrderedProductRow from "./OrderedProductRow";

export default function OrderedProductsTable({
  products,
}) {
  return (
    <section>
      <h3 className="mb-5 text-lg font-semibold text-zinc-900">
        Ordered Products
      </h3>

      <div className="overflow-hidden rounded-md border border-zinc-200">
        <table className="w-full">
          <thead className="bg-zinc-50">
            <tr className="border-b border-zinc-200 text-left text-sm text-zinc-600">
              <th className="px-5 py-4 font-medium">
                Product
              </th>

              <th className="font-medium">
                Color
              </th>

              <th className="font-medium">
                Size
              </th>

              <th className="font-medium">
                Qty
              </th>

              <th className="font-medium">
                Unit Price
              </th>

              <th className="pr-5 text-right font-medium">
                Total
              </th>
            </tr>
          </thead>

          <tbody>
            {products?.map(
              (product) => (
                <OrderedProductRow
                  key={product.id}
                  product={product}
                />
              ),
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}
