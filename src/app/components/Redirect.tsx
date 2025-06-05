"use client"

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

export const Redirect = () => {
  const router = useRouter();
  const { data: session, status } = useSession();

  useEffect(() => {
    if (status === "loading") return; // Wait for session to load

    if (session) {
      // User is authenticated, redirect to home
      router.push("/dashboard");
    } else {
      // User is not authenticated, redirect to sign-in
      router.push("/auth/signin");
    }
  }, [session, status, router]);

  return null; // No UI needed during redirect
};