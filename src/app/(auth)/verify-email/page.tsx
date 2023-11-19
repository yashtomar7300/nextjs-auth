"use client";

import "@/styles/globals.css";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const VerifyEmail = () => {
  const { data: session } = useSession();
  const router = useRouter();

  console.log(session, "- session in admin page");

  if (!session?.user) {
    return (
      <div>
        We've sent you an email to verify your email address. please open the
        email and click on sign in button to verify your email and sign in.
      </div>
    );
  } else {
    router.push("/");
  }
  return "";
};

export default VerifyEmail;
