import { NextResponse } from "next/server";
import prisma from "@/lib/db";
import { hash } from "bcrypt";
import * as z from "zod";

// Define a schema for input validation
const userSchema = z.object({
  username: z.string().min(1, "Useranme is required").max(100),
  email: z.string().min(1, "Email is required").email("Invalid email"),
  password: z
    .string()
    .min(1, "Password is required")
    .min(8, "Password must have than 8 characters"),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { email, username, password } = userSchema.parse(body);
    console.log(email, "- email");
    console.log(password, "- password");

    // Check if email already exists
    const isExistingEmail = await prisma.user.findUnique({
      where: { email: email },
    });

    if (isExistingEmail) {
      return NextResponse.json(
        { user: null, message: "Email is already registed." },
        { status: 409 }
      );
    }

    // Check id username already exists
    // const isExistingUsername = await prisma.user.findUnique({
    //   where: { username: username },
    // });
    // console.log(isExistingUsername, "- existing username");
    // if (isExistingUsername) {
    //   return NextResponse.json(
    //     { user: null, message: "Username is already registed" },
    //     { status: 409 }
    //   );
    // }

    // Encrypt the password by generating hash using bcrypt
    const hashedPassword = await hash(password, 10);

    console.log(hashedPassword, "- hashedpassword");

    if (hashedPassword) {
      console.log("- in hash fn");

      const newUser = await prisma.user.create({
        data: {
          email,
          username,
          password: hashedPassword,
        },
      });

      console.log(newUser, "- new user");

      // Exctracting rest of the data expect password
      const { password: newUserPassword, ...rest } = newUser;

      // We are only sending rest data in response without password for security reasons
      return NextResponse.json(
        { user: rest, message: "succesfully registered" },
        { status: 201 }
      );
    }

    return NextResponse.json(
      { user: null, message: "error while encrypting password" },
      { status: 400 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "something went wrong", error },
      { status: 500 }
    );
  }
}

// Get all user
export async function GET() {
  const allUsers = await prisma.user.findMany();

  return NextResponse.json({ data: allUsers });
}
