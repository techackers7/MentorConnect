import Image from "next/image";
import Link from "next/link";
export default function Home() {
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
            Success Stories
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-8">
            {[
              {
                name: "Khitish Ranjan Sahoo",
                batch: "Batch of 2023",
                story:
                  "The guidance I received for my final year project on Machine Learning was invaluable. My mentor helped me refine my research and land a role at a top tech firm.",
                picSrc: "/success1.jpg",
              },
              {
                name: "Subhadra Nayak",
                batch: "Batch of 2023",
                story:
                  "This platform helped our team find a senior who guided us through the Smart India Hackathon. We wouldn't have reached the finals without their technical advice.",
                picSrc: "/success2.jpg",
              },
              {
                name: "Abhinash Nayak",
                batch: "Batch of 2024",
                story:
                  "I used the Placement Helpdesk to prepare for my interviews. The mock sessions with alumni gave me the confidence to secure a high-package placement.",
                picSrc: "/success3.jpg",
              },
            ].map((item, index) => (
              <div
                key={index}
                className="bg-white p-10 rounded-3xl shadow-sm border border-green-100 flex flex-col items-center text-center relative mt-16 md:mt-0"
              >
                {/* Profile Image / Placeholder */}
                <div className="w-24 h-24 rounded-full bg-gray-200 mb-8 overflow-hidden relative border-4 border-white shadow-md -mt-16">
                  {/* <div className={`w-full h-full bg-gradient-to-br ${item.color}`}></div> */}
                  <img src={item.picSrc} alt="" />
                </div>

                {/* Unique Story Content */}
                <p className="italic text-gray-600 mb-8 leading-loose text-lg">
                  "{item.story}"
                </p>

                <h4 className="font-bold text-xl text-gray-800">{item.name}</h4>
                <span className="text-green-600 font-medium">{item.batch}</span>
              </div>
            ))}
          </div>
        </section>
      </main>
      <footer className="bg-[#cfd9da]">
        <div className="flex justify-center p-4 font-extrabold text-center text-sm">
          <p>©2026 Bridge: Connecting Futures. All rights reserved.</p>
        </div>
      </footer>
    </>
  );
}
