import { FC, ReactNode } from "react";
import { Button } from "./ui/button";
import { signIn } from "next-auth/react";

interface GoogleSignInButtonProps {
  children: ReactNode;
}
const GoogleSignInButton: FC<GoogleSignInButtonProps> = ({ children }) => {
  const loginWithGoogle = async () => {
    console.log("login with google");
    const result = await signIn("github");
    console.log(result, "- google signin result");
  };

  return (
    <Button onClick={loginWithGoogle} className="w-full">
      {children}
    </Button>
  );
};

export default GoogleSignInButton;
