import { auth } from "@/lib/auth";
import Navbar from "./_components/Navbar";
import { headers } from "next/headers";

const PublicLayout = async ({ children }: { children: React.ReactNode }) => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  return (
    <div>
      <Navbar session={session} />

      <main className="container mx-auto px-4 md:px-6 lg:px-8">{children}</main>
    </div>
  );
};

export default PublicLayout;
