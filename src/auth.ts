import NextAuth from "next-auth";
import credentialsProvider from "next-auth/providers/credentials";
import dbConnect from "./config/dbConnect";
import UserModel from "./models/UserModel";

export const { auth, handlers, signIn, signOut } = NextAuth({
  providers: [
    credentialsProvider({
      name: "Credentials",
      credentials: {
        email: {},
        password: {},
      },
      async authorize(credentials: any): Promise<any> {
        await dbConnect();

        try {
          const email = credentials.email;
          const password = credentials.password;

          const user = await UserModel.findOne({ email });

          return user;
        } catch (error: any) {
          throw new Error(error);
        }
      },
    }),
  ],
  pages: {
    signIn: "sign-in",
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXT_AUTH_SECRET,
});
