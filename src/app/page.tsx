import Link from "next/link";

export default function LandingPage() {
  return (
      <div className="min-h-screen bg-gradient-to-br from-blue-400 to-purple-600 flex flex-col items-center justify-center text-white px-4">
        <h1 className="text-5xl md:text-6xl font-extrabold text-center leading-tight">
          Build Stunning Resumes <br /> with <span className="text-yellow-300">AI</span>
        </h1>
        <p className="mt-6 text-lg md:text-xl text-center max-w-2xl opacity-90">
          Create professional, ATS-friendly resumes in minutes using the power of artificial intelligence.
        </p>
        <div className="mt-8 flex gap-4">
          <a
            href="/auth/register"
            className="bg-yellow-300 text-gray-900 px-6 py-3 rounded-lg font-semibold shadow-lg hover:scale-105 transform transition"
          >
            Get Started
          </a>
          <a
            href="/auth/login"
            className="bg-white/20 backdrop-blur-lg border border-white/30 px-6 py-3 rounded-lg font-semibold hover:bg-white/30 transition"
          >
            Login
          </a>
        </div>
        <div className="mt-16 bg-white/10 backdrop-blur-lg rounded-xl p-6 shadow-xl max-w-4xl w-full">
          <p className="text-center text-lg">Preview Templates</p>
          <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white rounded-lg h-40 shadow-md" />
            <div className="bg-white rounded-lg h-40 shadow-md" />
            <div className="bg-white rounded-lg h-40 shadow-md" />
          </div>
        </div>
    </div>
  );
}
