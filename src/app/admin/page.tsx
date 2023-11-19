import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import "@/styles/globals.css";

const AdminPage = async () => {
  const session = await getServerSession(authOptions);
  console.log(session, "- session in admin page");

  if (session?.user) {
    return <div>welcome {session?.user.email} to Admin Page</div>;
  }
  return <div>PLease login to see admin page</div>;
};

export default AdminPage;
