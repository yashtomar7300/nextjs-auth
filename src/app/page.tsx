// "use client";
import "@/styles/globals.css";
import User from "@/components/User";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";

export default async function Home() {
  const session = await getServerSession(authOptions);
  console.log(session, "server session");
  return (
    <div>
      <h1 className="text-4xl">Home</h1>
      <p>Note: Client session is slow comparing to server session.</p>
      <div>
        <h2>Client Side</h2>
        <User />
      </div>
      <div>
        <h2>Server Side</h2>
        {JSON.stringify(session)}
      </div>
    </div>
  );
}
