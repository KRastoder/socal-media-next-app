import Link from "next/link";
import { handleLogOut } from "@/app/actions/handle-logout";

export default function NavBar() {
  return (
    <nav className="flex items-center justify-center gap-4 pt-2 pb-2 mb-2 bg-gray-500">
      <Link href="/" className="outline outline-red-900 p-2 bg-gray-900 ">
        Home
      </Link>
      <Link href="/signin" className="outline outline-red-900 p-2 bg-gray-900 ">
        Sign in
      </Link>
      <Link href="/signup" className="outline outline-red-900 p-2 bg-gray-900 ">
        Sign Up
      </Link>
      <Link
        href="/my-posts"
        className="outline outline-red-900 p-2 bg-gray-900 "
      >
        My posts
      </Link>
      <Link
        href="/create-post"
        className="outline outline-red-900 p-2 bg-gray-900 "
      >
        Create Post
      </Link>
      <form action={handleLogOut}>
        <button
          type="submit"
          className="hover:cursor-pointer outline outline-red-900 p-2 bg-gray-900 "
        >
          Sign out
        </button>
      </form>
    </nav>
  );
}
