import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

import User from "../../../../models/user";
import { ConnectDB } from "../../../../utils/database";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    // Handles session creation and adds user ID to session object
    async session({ session }) {
      const sessionUser = await User.findOne({
        email: session.user.email,
      });

      if (sessionUser) {
        session.user.id = sessionUser._id.toString();
      }

      return session;
    },
    // Handles user sign-in and creates user if not found in the database
    async signIn({ profile }) {
      try {
        await ConnectDB();

        const userExists = await User.findOne({
          email: profile.email,
        });

        if (!userExists) {
          await User.create({
            email: profile.email,
            username: profile.name.replace(" ", "").toLowerCase(),
            image: profile.picture,
          });
        }

        return true;
      } catch (error) {
        console.error("Error in signIn callback:", error);
        return false;
      }
    },
  },
});

export { handler as GET, handler as POST };
