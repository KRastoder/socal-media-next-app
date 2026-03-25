import Link from "next/link";
import { handleLogOut } from "@/app/actions/handle-logout";

export default function NavBar() {
  return (
    <nav className="flex items-center justify-center gap-4">
      <Link href="/">Home</Link>
      <Link href="/signin">Sign in</Link>
      <Link href="/signup">Sign Up</Link>
      <Link href="/create-post">Create Post</Link>

      <form action={handleLogOut}>
        <button type="submit" className="hover:cursor-pointer">
          Sign out
        </button>
      </form>
    </nav>
  );
}
