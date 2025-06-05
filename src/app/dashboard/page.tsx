"use client";

import { useSession } from "next-auth/react";
import { useEffect } from "react";
import Navbar from "../components/Navbar";
// import axios from "axios";

const DashBoard = () => {
  const session = useSession();
  console.log("Session data:", session);

  useEffect(() => {
    const refreshStreams = async () => {
      console.log("Refreshing streams...");
      try {
        const response = await fetch("/api/streams/my", {
          credentials: "include",
        });
        const streams = response;
        console.log("Streams refreshed:", streams);
      } catch (error) {
        console.error("Error refreshing streams:", error);
      }
    };

    refreshStreams();
  }, []);

  return (
    <div>
      <header>
        <Navbar />
      </header>
      This is DashBoard
    </div>
  );
};

export default DashBoard;
