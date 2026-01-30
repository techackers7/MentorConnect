"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
export default function Home() {
  const [expandedIndex, setExpandedIndex] = useState(null);

  return (
    <>
      <main className="bg-[#fbfaf4] min-h-screen pt-24 pb-20">
        <section className="relative h-[80vh] mx-[6vw] rounded-[3rem] overflow-hidden shadow-2xl mb-20">
          <div className="absolute inset-0 w-full h-full">
            <Image
              src="/HomeOuter.png"
              alt="Background"
              fill
              className="object-cover brightness-75"
              priority
            />
            <div className="absolute inset-0 bg-linear-to-r from-black/80 via-black/40 to-transparent"></div>
          </div>

          <div className="relative z-20 h-full flex flex-col md:flex-row">
            <div className="flex flex-col justify-center w-full md:w-3/5 px-8 md:pl-20 md:pr-0 text-white h-full">
              <h1 className="text-5xl md:text-7xl font-extrabold mb-8 leading-tight drop-shadow-lg">
                Bridge:
                <br /> Connecting Futures
              </h1>
              <div className="flex flex-wrap gap-5">
                <Link href="/aluminiFilter">
                  <button className="bg-[#22c55e] hover:bg-green-600 text-white px-10 py-4 rounded-2xl font-bold text-xl transition transform hover:scale-105 shadow-lg">
                    Find a Mentor
                  </button>
                </Link>
                <button className="backdrop-blur-sm bg-white/10 border-2 border-white/70 hover:bg-white hover:text-green-800 text-white px-10 py-4 rounded-2xl font-bold text-xl transition transform hover:scale-105 shadow-lg">
                  <Link href="/registration?role=mentor">Join as a Mentor</Link>
                </button>
              </div>
            </div>

            <div className="hidden md:flex w-2/5 h-full items-end justify-end relative pr-10 pb-10">
              <div className="relative w-[120%] h-[65%] rounded-4xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.5)] border-4 border-white/20 translate-x-10 translate-y-10">
                <Image
                  src="/homeInner.jpg"
                  alt="Mentors and students discussing"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        <section className="mx-[6vw] -mt-28 relative z-30 mb-20">
          <div className="bg-white rounded-4xl p-4 shadow-xl grid grid-cols-1 md:grid-cols-3 gap-4 border border-gray-100">
            <button className="bg-[#2563eb] hover:bg-blue-700 text-white py-6 rounded-2xl font-bold text-xl shadow-sm transition flex items-center justify-center gap-3">
              <Link href="/aluminiFilter">Find a Mentor</Link>
            </button>

            <button className="bg-[#22c55e] hover:bg-green-600 text-white py-6 rounded-2xl font-bold text-xl shadow-sm transition flex items-center justify-center gap-3">
              <Link href="/registration?role=mentor">Join as a Mentor</Link>
            </button>
            <button className="bg-[#2563eb] hover:bg-blue-700 text-white py-6 rounded-2xl font-bold text-xl shadow-sm transition flex items-center justify-center gap-3">
              <Link href="/registration?role=student">Join as a Student</Link>
            </button>
          </div>
        </section>

        <section className="mx-[8vw] grid grid-cols-1 md:grid-cols-3 gap-x-12 gap-y-16 text-center mb-32 px-4">
          <div className="flex flex-col items-center p-8 rounded-3xl bg-white shadow-sm border border-gray-100 hover:shadow-md transition">
            <div className="mb-6 text-[#2563eb] bg-blue-50 p-4 rounded-full">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="40"
                height="40"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="12" r="10" />
                <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
                <line x1="12" y1="17" x2="12.01" y2="17" />
              </svg>
            </div>
            <h3 className="text-3xl font-extrabold mb-4 text-gray-800">
              Doubt Clearing
            </h3>
            <p className="text-gray-600 leading-relaxed text-lg">
              Get instant clarity on any doubts regarding career, roadmap,
              placement from Seniors.
            </p>
          </div>

          <div className="flex flex-col items-center p-8 rounded-3xl bg-white shadow-sm border border-gray-100 hover:shadow-md transition">
            <div className="mb-6 text-[#22c55e] bg-green-50 p-4 rounded-full">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="40"
                height="40"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
              </svg>
            </div>
            <h3 className="text-3xl font-extrabold mb-4 text-gray-800">
              Hackathon Support
            </h3>
            <p className="text-gray-600 leading-relaxed text-lg">
              Build winning teams and get mentorship for national-level
              hackathons and projects.
            </p>
          </div>

          <div className="flex flex-col items-center p-8 rounded-3xl bg-white shadow-sm border border-gray-100 hover:shadow-md transition">
            <div className="mb-6 text-[#2563eb] bg-blue-50 p-4 rounded-full">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="40"
                height="40"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                <polyline points="14 2 14 8 20 8" />
                <line x1="16" y1="13" x2="8" y2="13" />
                <line x1="16" y1="17" x2="8" y2="17" />
                <polyline points="10 9 9 9 8 9" />
              </svg>
            </div>
            <h3 className="text-3xl font-extrabold mb-4 text-gray-800">
              Research Guidance
            </h3>
            <p className="text-gray-600 leading-relaxed text-lg">
              Connect with alumni in academia for help with technical paper
              writing and publishing.
            </p>
          </div>
        </section>

        <section className="mx-[6vw] py-16 bg-[#f0fdf4] rounded-[3rem]">
          <h2 className="text-4xl font-bold text-center mb-16 text-gray-800">
            Voices From the Student Journey
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-8">
            {[
              {
                name: "Khitish Ranjan Sahoo",
                batch: "Batch of 2023",
                story:
                  "The guidance I received for my final year project on Machine Learning was invaluable. My mentor helped me refine my research and land a role at a top tech firm.",
                picSrc:
                  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS5aUa_g5YKPqQY4_AAORJxP3eauweL3acIlA&s",
              },
              {
                name: "Subhadra Nayak",
                batch: "Batch of 2023",
                story:
                  "Participating in hackathons was exciting but challenging. Our team often faced confusion in problem statements, implementation choices, and presentation strategies. Support and insights from seniors who had prior experience made a significant difference in how we approached competitions.",
                picSrc:
                  "data:image/jpeg;base64,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",
              },
              {
                name: "Abhinash Nayak",
                batch: "Batch of 2024",
                story:
                  "Preparing for placements was overwhelming—understanding interview expectations, improving communication, and building confidence were real challenges. Interaction with alumni and seniors helped clarify industry expectations and made the transition from student life to professional life smoother.",
                picSrc:
                  "data:image/jpeg;base64,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",
              },
            ].map((item, index) => (
              <div
                key={index}
                className="bg-white p-6 md:p-10 rounded-3xl shadow-sm border border-green-100 flex flex-col items-center text-center"
              >
                <div className="w-20 h-20 md:w-24 md:h-24 rounded-full overflow-hidden mb-4 bg-gray-100">
                  <img
                    src={item.picSrc}
                    alt={item.name}
                    className="w-full h-full object-contain"
                  />
                </div>

                <p className="text-gray-600 text-sm md:text-base leading-relaxed">
                  <span className="hidden md:block">{item.story}</span>
                  <span className="block md:hidden">
                    {expandedIndex === index
                      ? item.story
                      : item.story.slice(0, 120) + "..."}
                  </span>
                </p>

                <button
                  onClick={() =>
                    setExpandedIndex(expandedIndex === index ? null : index)
                  }
                  className="mt-3 text-blue-600 font-semibold text-sm md:hidden"
                >
                  {expandedIndex === index ? "Read less" : "Read more"}
                </button>

                <h4 className="mt-4 font-bold text-gray-800">{item.name}</h4>
                <span className="text-green-600 text-sm">{item.batch}</span>
              </div>
            ))}
          </div>
        </section>
        <section className="relative mx-[6vw] rounded-3xl overflow-hidden shadow-2xl mb-10 p-6 md:p-10">
          <h2 className="text-2xl md:text-3xl font-extrabold text-center text-black mb-8">
            Frequently Asked Questions
          </h2>

          <div className="max-w-4xl mx-auto space-y-4">
            {[
              {
                q: "Who is this platform meant for?",
                a: "This platform is built for college students seeking guidance in academics, projects, hackathons, placements, and career planning, as well as alumni who want to mentor juniors.",
              },
              {
                q: "How do students get guidance here?",
                a: "Students can connect with seniors and alumni through networking, alumni discovery, and placement guidance features available on the platform.",
              },
              {
                q: "Can alumni also register?",
                a: "Yes. Alumni and mentors can join the platform to guide students and share real-world experiences.",
              },
              {
                q: "Is this platform fully launched?",
                a: "The platform is in its early stage. We are currently in the data collection phase to validate demand and refine matching logic before full deployment. ",
              },
              {
                q: "How is my data handled?",
                a: "Your data is stored securely and is only used for platform-related functionality.",
              },
              {
                q: "Can a 3rd year or 4th year student register as a mentor to help juniors?",
                a: " Yes! Any seniors can register as a mentor if they want to help students.",
              },
            ].map((item, index) => (
              <details
                key={index}
                className="group border border-gray-200 rounded-xl p-4 md:p-5 transition"
              >
                <summary className="flex justify-between items-center cursor-pointer font-semibold text-gray-800 text-base md:text-lg">
                  {item.q}
                  <span className="text-blue-600 group-open:rotate-180 transition-transform">
                    ▼
                  </span>
                </summary>
                <p className="mt-3 text-gray-600 text-sm md:text-base leading-relaxed">
                  {item.a}
                </p>
              </details>
            ))}
          </div>
        </section>
      </main>
      <footer className="bg-blue-900 text-blue-100">
        <div className="flex justify-center p-4 font-extrabold text-center text-sm md:text-lg">
          <p>©2026 Bridge: Connecting Futures. All rights reserved.</p>
        </div>
      </footer>
    </>
  );
}
