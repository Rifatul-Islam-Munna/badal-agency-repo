export default function Loading() {
  return (
    <div className="min-h-screen bg-[#f8fafd]">
      {/* Navbar Skeleton */}
      <nav className="w-full h-16 sm:h-20 px-3 sm:px-6 flex items-center justify-between border-b border-gray-100 bg-white animate-pulse">
        {/* Logo */}
        <div className="h-8 sm:h-10 w-24 sm:w-32 bg-soft-green/40 rounded" />
        {/* Desktop Menu (hidden on mobile) */}
        <div className="hidden md:flex gap-6 sm:gap-9">
          {[...Array(4)].map((_, i) => (
            <div
              key={i}
              className="h-5 sm:h-6 w-12 sm:w-16 bg-gray-300/40 rounded-lg"
            />
          ))}
        </div>
        {/* CTA Button */}
        <div className="h-8 sm:h-10 w-20 sm:w-28 bg-soft-green/50 rounded-xl" />
      </nav>

      {/* Hero Skeleton */}
      <section className="flex justify-center items-center py-8 min-h-[250px] sm:min-h-[360px] md:min-h-[500px]">
        <div className="bg-gradient-to-br from-[#07364a]/80 to-[#0a294e]/60 rounded-2xl shadow w-full max-w-3xl sm:max-w-4xl md:max-w-5xl px-4 sm:px-6 md:px-16 py-8 sm:py-10 md:py-20 relative animate-pulse mt-2 sm:mt-8">
          {/* Main Title */}
          <div className="h-7 sm:h-10 w-4/5 sm:w-2/3 bg-white/30 rounded mb-2 sm:mb-3" />
          <div className="h-6 sm:h-10 w-2/3 sm:w-1/3 bg-white/20 rounded mb-6 sm:mb-8" />
          {/* Subtext */}
          <div className="h-4 sm:h-6 w-2/3 sm:w-1/2 bg-white/20 rounded mb-4 sm:mb-6" />
          <div className="h-4 sm:h-6 w-1/3 bg-white/10 rounded mb-10 sm:mb-12" />
          {/* Get Started Button Skeleton - only desktop */}
          <div className="hidden md:block h-10 w-32 bg-white/30 rounded-xl absolute right-10 md:right-12 bottom-14 md:bottom-16" />
          {/* Animated Lines Skeleton */}
          <div className="absolute left-0 bottom-0 w-full h-14 sm:h-20 md:h-32 bg-gradient-to-r from-white/10 to-white/0 rounded-b-2xl" />
          {/* Service buttons skeleton */}
          <div className="flex gap-2 sm:gap-4 absolute left-5 sm:left-8 bottom-4 md:bottom-12">
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className="h-4 sm:h-6 w-16 sm:w-28 bg-white/20 rounded-lg"
              />
            ))}
          </div>
        </div>
      </section>

      {/* Page Content Skeleton (Optional, Responsive) */}
      <div className="max-w-3xl sm:max-w-5xl mx-auto mt-4 sm:mt-8 px-2 sm:px-4 md:px-0 space-y-5 sm:space-y-8">
        {[...Array(2)].map((_, idx) => (
          <div
            key={idx}
            className="h-24 sm:h-36 md:h-48 bg-gray-300/30 rounded-2xl animate-pulse"
          />
        ))}
      </div>
    </div>
  );
}
