"use client";

import Link from "next/link";
import { useSession, signIn, signOut } from "next-auth/react";

const Navbar = () => {
  const { data: session } = useSession();
  console.log("Session data:", session);

  return (
    <nav className="bg-gray-900 text-white px-6 py-4 flex items-center justify-between shadow">
      <div className="flex items-center space-x-6">
        <Link
          href="/"
          className="text-xl font-bold hover:text-blue-400 transition"
        >
          MusicApp
        </Link>
        <Link href="/explore" className="hover:text-blue-400 transition">
          Explore
        </Link>
        <Link href="/about" className="hover:text-blue-400 transition">
          About
        </Link>
      </div>
      <div>
        {session ? (
          <div className="relative flex items-center space-x-4">
            <div className="group relative">
              <span className="hidden sm:inline cursor-pointer px-3 py-2 rounded hover:bg-gray-800 transition">
                {session.user?.name?.charAt(0) || "User"}
              </span>
              <div className="absolute right-0 mt-2 w-32 bg-white text-gray-900 rounded shadow-lg opacity-0 group-hover:opacity-100 group-hover:pointer-events-auto pointer-events-none transition-opacity duration-200 z-10">
                <button
                  onClick={() => signOut()}
                  className="block w-full text-left px-4 py-2 hover:bg-gray-100 rounded"
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
        ) : (
          <button
            onClick={() => signIn()}
            className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded text-white transition"
          >
            Sign in
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
