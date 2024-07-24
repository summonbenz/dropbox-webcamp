import { NextResponse } from "next/server";
import { hash } from "bcrypt";
import { db } from "@/db"

export async function POST(request: Request) {
  try {
    const { email, password, name, jwc, ywc } = await request.json();

    // console.log({ email, password });

    const hashedPassword = await hash(password, 10);
    const generateVer = (jwc: string, ywc: string): string => {
        let str = ""
        if ( jwc != "" ) {
            str += `JWC#${jwc}`
        }
        if ( jwc != "" &&  ywc != "") {
            str += ", "
        }
        if ( ywc != "" ) {
            str += `YWC#${ywc}`
        }
        return str
    }
    const user = await db.user.create({
        data: {
            username: email,
            password: hashedPassword,
            name: name,
            jver: generateVer(jwc, ywc),
            purl: "",
            jwc: jwc,
            ywc: ywc,
        }
    })
    // console.log(user)

  } catch (e) {
    console.log({ e });
  }

  return NextResponse.json({ message: "success" });
}