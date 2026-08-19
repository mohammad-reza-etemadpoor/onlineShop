import { auth } from "@src/lib/auth";
import { redirect } from "next/navigation";
import UserModel from "@src/models/User";
import ProfileHeader from "@src/components/profile/ProfileHeader";
import UserInfoCard from "@src/components/profile/UserInfoCard";
import OrdersCard from "@src/components/profile/OrdersCard";
import CheckoutActions from "@src/components/profile/CheckoutActions";
import connectToDb from "@src/configs/db";
import Order from "@src/models/Order";

export default async function ProfilePage({
  searchParams,
}) {
  let checkoutMode = false;

  const { order: orderId } =
    await searchParams;
  const session = await auth();

  if (!session) {
    redirect("/auth/login");
  }
  await connectToDb();
  const user = JSON.parse(
    JSON.stringify(
      await UserModel.findOne({
        phone: session.user.phone,
      }),
    ),
  );

  // const orderId = searchP.order;

  const order = JSON.parse(
    JSON.stringify(
      await Order.findOne({
        _id: orderId,
      })
        .populate("items.inventory")
        .populate("items.product"),
    ),
  );

  // console.log(orderId, order);
  if (!!order) checkoutMode = true;

  // const orders = [];
  // orders.push(order);

  return (
    <main className="text-zinc-600 mx-auto max-w-6xl space-y-8 px-4 py-10">
      <ProfileHeader />

      <UserInfoCard
        user={{
          ...user,

          birthDate: user?.birthDate
            ? new Date(
                user.birthDate,
              ).toISOString()
            : "",
        }}
      />

      <OrdersCard orders={order} />

      {checkoutMode && (
        <CheckoutActions
          address={user.address}
        />
      )}
    </main>
  );
}
