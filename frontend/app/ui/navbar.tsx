import Link from "next/link";
import { cookies } from "next/headers";
import NavbarAccount from "./navbarAccount";

export default async function Navbar() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token");
  const isLoggedIn = !!token;

  return (
    <nav className="w-full h-10 border-b border-neutral-700 flex justify-around items-center">
      <Link href="/">Homepage</Link>
      <NavbarAccount></NavbarAccount>
    </nav>
  );
}
