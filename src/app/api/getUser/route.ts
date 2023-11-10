import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { email } = await req.json();
  console.log(email, "- email");
  if (email) {
    const existingUser = await prisma.user.findUnique({
      where: { email: email },
    });

    if (!existingUser) {
      return NextResponse.json(
        { user: null, message: "Invalid credentials" },
        // { status: 401 }
      );
    }
    const { password, ...rest } = existingUser;
    return NextResponse.json(
      { user: rest, message: "user exist" },
      { status: 200 }
    );
  }

  return NextResponse.json(
    { user: null, message: "Email is missing in body" },
    { status: 400 }
  );
}
