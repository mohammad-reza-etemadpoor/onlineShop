import { auth } from "@src/lib/auth";

import { redirect } from "next/navigation";

import UserModel from "@src/models/User";

import ProfileHeader from "@src/components/profile/ProfileHeader";
import UserInfoCard from "@src/components/profile/UserInfoCard";
import OrdersCard from "@src/components/profile/OrdersCard";
import CheckoutActions from "@src/components/profile/CheckoutActions";
import connectToDb from "@src/configs/db";

export default async function ProfilePage() {
  const session = await auth();

  if (!session) {
    redirect("/auth/login");
  }

  await connectToDb();

  // const user = await UserModel.findOne({
  //   phone: session.user.phone,
  // }).lean();

  const user = JSON.parse(
    JSON.stringify(
      await UserModel.findOne({
        phone: session.user.phone,
      }),
    ),
  );

  const orders = [];

  const checkoutMode = true;

  return (
    <main className="text-zinc-600 mx-auto max-w-6xl space-y-8 px-4 py-10">
      <ProfileHeader />

      <UserInfoCard
        user={{
          ...user,

          birthDate: user.birthDate
            ? new Date(
                user.birthDate,
              ).toISOString()
            : "",
        }}
      />

      <OrdersCard orders={orders} />

      {checkoutMode && (
        <CheckoutActions
          address={user.address}
        />
      )}
    </main>
  );
}
