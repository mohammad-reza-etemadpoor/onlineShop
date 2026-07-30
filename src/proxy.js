import { auth } from "@src/lib/auth";
export default auth((req) => {
  const isLoggedIn = !!req.auth;

  const protectedRoutes = ["/profile"];

  const pathname = req.nextUrl.pathname;

  const isProtected =
    protectedRoutes.some((route) =>
      pathname.startsWith(route),
    );

  if (!isLoggedIn && isProtected) {
    return Response.redirect(
      new URL(
        "/auth/login",
        req.nextUrl,
      ),
    );
  }
});

export const config = {
  matcher: ["/profile/:path*"],
};
