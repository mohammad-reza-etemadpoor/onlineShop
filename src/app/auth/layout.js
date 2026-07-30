import { auth } from "@src/lib/auth";
import { redirect } from "next/navigation";

async function layout({ children }) {
  const session = await auth();
  if (!!session) {
    redirect("/");
  }
  return <div>{children}</div>;
}

export default layout;
