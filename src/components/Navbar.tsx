import Link from "next/link";
import { buttonVariants } from "./ui/button";
import { HandMetal } from "lucide-react";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import UserAccount from "./ui/UserAccount";

const Navbar = async () => {
  const session = await getServerSession(authOptions);

  return (
    <div className=" bg-zinc-100 py-2 border-b border-s-zinc-200 fixed w-full z-10 top-0">
      <div className="container flex items-center justify-between">
        <Link href="/">
          <HandMetal />
        </Link>
        <Link className="ml-auto mr-8 font-bold" href="/editor">
          Editor
        </Link>
        <Link className="ml-auto mr-8 font-bold" href="/creativeEditor">
          CreativeEditor SDK
        </Link>
        <Link className="ml-auto mr-8 font-bold" href="/aiCanvas">
          AI Canvas
        </Link>
        {session?.user ? (
          <UserAccount />
        ) : (
          <Link className={buttonVariants()} href="/sign-in">
            Sign in
          </Link>
        )}
      </div>
    </div>
  );
};

export default Navbar;
