import connectToDb from "@src/configs/db";
import User from "@src/models/User";
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";

export const {
  handlers,
  signIn,
  signOut,
  auth,
} = NextAuth({
  providers: [
    Credentials({
      credentials: {
        phone: {},
      },

      async authorize(credentials) {
        // We'll implement this next.
        await connectToDb();

        const user = await User.findOne(
          {
            phone: credentials.phone,
          },
        );

        if (!user) {
          return null;
        }

        return {
          id: user._id.toString(),
          phone: user.phone,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.phone = user.phone;

        token.role = user.role;
      }

      return token;
    },

    async session({ session, token }) {
      session.user.phone = token.phone;

      session.user.role = token.role;

      return session;
    },
  },
});
