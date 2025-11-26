"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

// Dynamically import Threads client component
const Threads = dynamic(() => import("@/components/Threads"), {
  ssr: false,
  loading: () => null,
});

const ThreadWrapper = () => {
  const [showThreads, setShowThreads] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    // Simple width check to consider desktop devices (adjust breakpoint as needed)
    const checkIsDesktop = () => setIsDesktop(window.innerWidth >= 768);
    checkIsDesktop();

    // Optionally listen to window resize to update isDesktop dynamically
    window.addEventListener("resize", checkIsDesktop);
    return () => window.removeEventListener("resize", checkIsDesktop);
  }, []);

  useEffect(() => {
    if (!isDesktop) return;

    const handler = () => setShowThreads(true);
    window.addEventListener("mousemove", handler, { once: true });
    window.addEventListener("scroll", handler, { once: true });

    return () => {
      window.removeEventListener("mousemove", handler);
      window.removeEventListener("scroll", handler);
    };
  }, [isDesktop]);

  if (!isDesktop) {
    // Render nothing on mobile devices
    return null;
  }

  return (
    <div className="absolute top-0 left-0 w-full h-full z-0 pointer-events-none">
      {showThreads && (
        <Threads
          amplitude={2.3}
          distance={0.8}
          enableMouseInteraction={false}
          color={[255, 255, 255]}
        />
      )}
    </div>
  );
};

export default ThreadWrapper;
