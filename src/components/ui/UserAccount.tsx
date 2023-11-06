"use client";

import { useRouter } from "next/navigation";
import { Button } from "./button";
import { signOut } from "next-auth/react";

const UserAccount = () => {
  const router = useRouter();
  return (
    <Button
      onClick={async () => {
        await signOut({
          redirect: true,
          callbackUrl: `${window.location.origin}/sign-in`,
        });
        // router.refresh();
      }}
      variant={"destructive"}
    >
      Sign out
    </Button>
  );
};

export default UserAccount;
