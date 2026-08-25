export default function About() {
  return (
    <section id="about" className="py-24 bg-zinc-900 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:items-center">
          {/* Text column */}
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-zinc-100 sm:text-4xl">
              About Me
            </h2>
            <div className="mt-6 space-y-6 text-zinc-400">
              <p>
                Hello! I&apos;m Alex, a software engineer who loves crafting interactive, 
                high-performance digital solutions. My journey in web development began over 5 years ago, 
                and since then, I have worked with startups and established companies to turn ideas into robust applications.
              </p>
              <p>
                I thrive at the intersection of design and engineering—writing clean, maintainable code 
                while keeping a keen eye on user experience, performance, and accessibility (a11y).
              </p>
              <p>
                When I&apos;m not coding, you can find me exploring open-source projects, playing chess, 
                or writing technical articles about modern web ecosystems.
              </p>
            </div>
          </div>

          {/* SVG Illustration Column */}
          <div className="flex justify-center lg:justify-end">
            <div className="relative h-72 w-72 md:h-80 md:w-80">
              {/* Decorative borders/gradients */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-teal-500 to-indigo-500 opacity-20 blur-lg"></div>
              
              {/* Graphic element */}
              <div className="relative flex h-full w-full items-center justify-center rounded-2xl border border-zinc-800 bg-zinc-950 p-6 shadow-2xl">
                <svg
                  className="h-full w-full text-teal-500/20"
                  viewBox="0 0 100 100"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle cx="50" cy="50" r="40" stroke="currentColor" strokeWidth="2" strokeDasharray="4 4" />
                  <path
                    d="M30 45 L50 65 L80 35"
                    stroke="#2dd4bf"
                    strokeWidth="4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <circle cx="50" cy="50" r="10" fill="#2dd4bf" className="animate-pulse" />
                  {/* Floating elements */}
                  <rect x="20" y="20" width="10" height="10" rx="2" fill="currentColor" opacity="0.3" />
                  <rect x="75" y="70" width="12" height="12" rx="3" fill="currentColor" opacity="0.3" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
