import { prismaClient } from "@/app/lib/db";
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET || "default",
  callbacks: {
    async signIn({ account, profile }) {
      try {
        if (account?.provider === "google") {
          const user = await prismaClient.user.findUnique({
            where: {
              email: profile?.email!,
            },
          });

          if (!user) {
            await prismaClient.user.create({
              data: {
                email: profile?.email!,
                name: profile?.name || undefined,
                provider: "Google",
              },
            });
          }
        }
        return true;
      } catch (error) {
        console.log(error);
        //throw error;
        return false;
      }
      return true;
    },
  },
});

export { handler as GET, handler as POST };
