import Navbar from "./components/Navbar";
import { Redirect } from "./components/Redirect";

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-zinc-900 to-black text-white flex flex-col">
      <Navbar />
      {/* <Redirect /> */}
      <section className="flex flex-1 flex-col items-center justify-center px-4">
        <h1 className="text-4xl md:text-6xl font-bold mb-4 text-center">
          Let Your Fans Control the Music
        </h1>
        <p className="text-lg md:text-2xl text-zinc-300 mb-8 text-center max-w-2xl">
          Creators, empower your community! Let your fans choose the music that
          plays on your stream. Interactive, fun, and made for music lovers.
        </p>
        <div className="flex gap-4">
          <button className="bg-primary text-white px-6 py-3 rounded-lg font-semibold shadow hover:bg-primary/90 transition-colors">
            Get Started
          </button>
          <button className="bg-zinc-800 text-zinc-200 px-6 py-3 rounded-lg font-semibold border border-zinc-700 hover:bg-zinc-700 transition-colors">
            Learn More
          </button>
        </div>
      </section>
      <footer className="text-center text-zinc-500 py-6 text-sm">
        &copy; {new Date().getFullYear()} MusicStream. All rights reserved.
      </footer>
    </main>
  );
}
