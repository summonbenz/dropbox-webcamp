import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import { db } from "@/db";
import { compare } from "bcrypt";
import { User } from "next-auth";

const handler = NextAuth({
    session: {
        strategy: "jwt",
      },
      pages: {
        signIn: "/login",
      },
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
              email: {},
              password: {},
            },
            async authorize(credentials, req) {
                const user = await db.user.findFirst({
                    where: {
                      username: credentials?.email,
                    },
                })
                if (user == undefined) {
                    return null
                }
                const passwordCorrect = await compare(
                    credentials?.password || "",
                    user.password
                );
                if (passwordCorrect) {
                    return <User>{
                        id: user?.id || "",
                        email: user?.username || "",
                        name: user?.name || "",
                        image: ""
                    }
                }
                return null
            }
        })
        ]
});

export { handler as GET, handler as POST };